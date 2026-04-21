import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2, Check, X } from 'lucide-react'

export const Route = createFileRoute('/unsubscribe')({
  head: () => ({
    meta: [
      { title: 'Odhlásenie z odberu' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: UnsubscribePage,
})

function UnsubscribePage() {
  const [state, setState] = useState<'loading' | 'valid' | 'already' | 'invalid' | 'submitting' | 'done' | 'error'>('loading')
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const t = params.get('token')
    if (!t) {
      setState('invalid')
      return
    }
    setToken(t)
    fetch(`/email/unsubscribe?token=${encodeURIComponent(t)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) setState('valid')
        else if (data.reason === 'already_unsubscribed') setState('already')
        else setState('invalid')
      })
      .catch(() => setState('error'))
  }, [])

  const confirm = async () => {
    if (!token) return
    setState('submitting')
    try {
      const res = await fetch('/email/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const data = await res.json()
      if (data.success) setState('done')
      else if (data.reason === 'already_unsubscribed') setState('already')
      else setState('error')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <Card className="w-full max-w-md p-8 text-center">
          {state === 'loading' && (
            <>
              <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Overujem odkaz…</p>
            </>
          )}
          {state === 'valid' && (
            <>
              <h1 className="text-2xl font-bold mb-2">Odhlásiť z odberu</h1>
              <p className="text-muted-foreground mb-6">
                Kliknutím potvrdíte, že už nechcete dostávať e-maily.
              </p>
              <Button onClick={confirm} className="w-full">Potvrdiť odhlásenie</Button>
            </>
          )}
          {state === 'submitting' && (
            <>
              <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Spracúvam…</p>
            </>
          )}
          {state === 'done' && (
            <>
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Hotovo</h1>
              <p className="text-muted-foreground mb-6">Boli ste úspešne odhlásení z odberu.</p>
              <Link to="/"><Button variant="outline">Späť na hlavnú stránku</Button></Link>
            </>
          )}
          {state === 'already' && (
            <>
              <h1 className="text-2xl font-bold mb-2">Už ste odhlásení</h1>
              <p className="text-muted-foreground mb-6">Tento e-mail už nedostáva žiadne správy.</p>
              <Link to="/"><Button variant="outline">Späť na hlavnú stránku</Button></Link>
            </>
          )}
          {state === 'invalid' && (
            <>
              <div className="w-12 h-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <X className="w-6 h-6 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Neplatný odkaz</h1>
              <p className="text-muted-foreground mb-6">Odkaz na odhlásenie je neplatný alebo expiroval.</p>
              <Link to="/"><Button variant="outline">Späť na hlavnú stránku</Button></Link>
            </>
          )}
          {state === 'error' && (
            <>
              <h1 className="text-2xl font-bold mb-2">Chyba</h1>
              <p className="text-muted-foreground mb-6">Niečo sa pokazilo. Skúste to znova.</p>
              <Link to="/"><Button variant="outline">Späť na hlavnú stránku</Button></Link>
            </>
          )}
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
