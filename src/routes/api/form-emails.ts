import * as React from 'react'
import { render } from '@react-email/components'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { TEMPLATES, type TemplateEntry } from '@/lib/email-templates/registry'

// Public endpoint for form-triggered emails.
// Allow-listed templates only — used by unauthenticated visitors.
const ALLOWED_TEMPLATES = new Set(['client-confirmation', 'admin-new-lead'])

const SITE_NAME = 'Patrik Patoraj'
const SENDER_DOMAIN = 'notify.patrikpatoraj.sk'
const FROM_DOMAIN = 'patrikpatoraj.sk'

function redactEmail(email: string | null | undefined): string {
  if (!email) return '***'
  const [localPart, domain] = email.split('@')
  if (!localPart || !domain) return '***'
  return `${localPart[0]}***@${domain}`
}

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function enqueueOne(
  supabase: any,
  templateName: string,
  template: TemplateEntry,
  recipient: string,
  templateData: Record<string, any>,
  idempotencyKey: string,
) {
  const messageId = crypto.randomUUID()
  const normalizedEmail = recipient.toLowerCase()

  // Suppression check
  const { data: suppressed } = await supabase
    .from('suppressed_emails')
    .select('id')
    .eq('email', normalizedEmail)
    .maybeSingle()

  if (suppressed) {
    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: recipient,
      status: 'suppressed',
    })
    return { ok: false, reason: 'suppressed' }
  }

  // Get-or-create unsubscribe token
  let unsubscribeToken: string
  const { data: existing } = await supabase
    .from('email_unsubscribe_tokens')
    .select('token, used_at')
    .eq('email', normalizedEmail)
    .maybeSingle()

  if (existing && !existing.used_at) {
    unsubscribeToken = existing.token
  } else if (!existing) {
    unsubscribeToken = generateToken()
    await supabase
      .from('email_unsubscribe_tokens')
      .upsert(
        { token: unsubscribeToken, email: normalizedEmail },
        { onConflict: 'email', ignoreDuplicates: true },
      )
    const { data: stored } = await supabase
      .from('email_unsubscribe_tokens')
      .select('token')
      .eq('email', normalizedEmail)
      .maybeSingle()
    unsubscribeToken = stored?.token ?? unsubscribeToken
  } else {
    return { ok: false, reason: 'token_used' }
  }

  // Render template
  const element = React.createElement(template.component, templateData)
  const html = await render(element)
  const plainText = await render(element, { plainText: true })

  const subject =
    typeof template.subject === 'function'
      ? template.subject(templateData)
      : template.subject

  await supabase.from('email_send_log').insert({
    message_id: messageId,
    template_name: templateName,
    recipient_email: recipient,
    status: 'pending',
  })

  const { error: enqueueError } = await supabase.rpc('enqueue_email', {
    queue_name: 'transactional_emails',
    payload: {
      message_id: messageId,
      to: recipient,
      from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject,
      html,
      text: plainText,
      purpose: 'transactional',
      label: templateName,
      idempotency_key: idempotencyKey,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  })

  if (enqueueError) {
    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: recipient,
      status: 'failed',
      error_message: 'Failed to enqueue email',
    })
    return { ok: false, reason: 'enqueue_failed' }
  }

  return { ok: true, messageId }
}

export const Route = createFileRoute('/api/form-emails')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
          console.error('Missing required environment variables')
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        let body: any
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const submissionId: string | undefined = body.submissionId
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        if (!submissionId || !uuidRegex.test(submissionId)) {
          return Response.json({ error: 'Invalid submissionId' }, { status: 400 })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // Atomically claim the submission (verifies existence + prevents replay)
        const { data: claimed, error: claimError } = await supabase
          .from('form_submissions')
          .update({ email_status: 'sent' })
          .eq('id', submissionId)
          .eq('email_status', 'pending')
          .select('*')
          .maybeSingle()

        if (claimError || !claimed) {
          return Response.json({ error: 'Submission not found or already processed' }, { status: 404 })
        }

        // Use email/name from DB row — never trust client-supplied recipient
        const data: any = claimed
        const recipientEmail = claimed.email
        const name = claimed.name

        if (!recipientEmail || !name) {
          return Response.json({ error: 'Submission missing required fields' }, { status: 400 })
        }

        const results: Record<string, any> = {}

        for (const templateName of ['client-confirmation', 'admin-new-lead']) {
          if (!ALLOWED_TEMPLATES.has(templateName)) continue
          const template = TEMPLATES[templateName]
          if (!template) {
            results[templateName] = { ok: false, reason: 'template_missing' }
            continue
          }
          const recipient = template.to || recipientEmail
          const idem = `${submissionId ?? 'nosid'}-${templateName}`
          try {
            results[templateName] = await enqueueOne(
              supabase,
              templateName,
              template,
              recipient,
              { ...data, submissionId },
              idem,
            )
          } catch (err) {
            console.error('enqueueOne failed', {
              templateName,
              recipient_redacted: redactEmail(recipient),
              error: err instanceof Error ? err.message : String(err),
            })
            results[templateName] = { ok: false, reason: 'exception' }
          }
        }

        return Response.json({ success: true, results })
      },
    },
  },
})
