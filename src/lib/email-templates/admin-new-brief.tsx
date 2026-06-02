import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  briefId?: string
  name?: string
  email?: string
  phone?: string
  company_name?: string
  is_starting?: boolean
  has_brand?: boolean
  business_one_liner?: string
  has_existing_site?: boolean
  existing_site_url?: string
  existing_site_issues?: string
  goals?: string[]
  self_edit?: boolean
  preferred_colors?: string
  preferred_typography?: string
  has_own_photos?: boolean
  has_own_texts?: boolean
  reference_sites?: string
  main_features?: string
  sells_products?: boolean
  payment_gateway_current?: string
  payment_gateway_switch_stripe?: boolean
  needs_crm_integration?: boolean
  crm_details?: string
  email_provider_current?: string
  email_switch_resend?: boolean
  needs_invoicing?: boolean
  invoicing_system?: string
  invoicing_switch_recommended?: boolean
  needs_analytics?: boolean
  analytics_tools?: string
  multilingual?: boolean
  languages?: string
  contact_form?: boolean
  newsletter_form?: boolean
  special_features?: string
  has_internal_crm?: boolean
  internal_crm_details?: string
  other_integrations?: string
  wants_ai_assistant?: boolean
  ai_assistant_purpose?: string
  wants_custom_app?: boolean
  custom_app_details?: string
  wants_booking_system?: boolean
  wants_member_area?: boolean
  wants_blog?: boolean
  data_storage_preference?: string
  hosting_preference?: string
  target_audience?: string
  unique_selling_point?: string
  maintenance_package?: boolean
  budget_range?: string
  deadline?: string
  notes?: string
}

const yn = (v?: boolean | null) => (v === true ? 'Áno' : v === false ? 'Nie' : '—')
const val = (v?: string | null) => (v && v.trim().length > 0 ? v : '—')

const Row = ({ label, value }: { label: string; value?: string }) =>
  value && value !== '—' ? (
    <Section style={row}>
      <Text style={rowLabel}>{label}</Text>
      <Text style={rowValue}>{value}</Text>
    </Section>
  ) : null

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <>
    <Hr style={hr} />
    <Text style={sectionTitle}>{children}</Text>
  </>
)

const AdminNewBrief = (p: Props) => (
  <Html lang="sk" dir="ltr">
    <Head />
    <Preview>Nový brief od {p.name ?? 'klienta'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>📋 Nový brief k webu</Heading>
        <Text style={text}>
          Cez pomôcku k webu na patrikpatoraj.sk prišiel nový brief.
        </Text>

        <SectionTitle>Kontakt</SectionTitle>
        <Row label="Meno" value={val(p.name)} />
        <Row label="E-mail" value={val(p.email)} />
        <Row label="Telefón" value={val(p.phone)} />
        <Row label="Firma / projekt" value={val(p.company_name)} />

        <SectionTitle>O firme</SectionTitle>
        <Row label="Začínajúca firma" value={yn(p.is_starting)} />
        <Row label="Má logo a brand" value={yn(p.has_brand)} />
        <Row label="Opis firmy" value={val(p.business_one_liner)} />
        <Row label="Existujúci web" value={yn(p.has_existing_site)} />
        {p.has_existing_site ? (
          <>
            <Row label="URL existujúceho webu" value={val(p.existing_site_url)} />
            <Row label="Hlavné nedostatky" value={val(p.existing_site_issues)} />
          </>
        ) : null}

        <SectionTitle>Ciele webu</SectionTitle>
        <Row label="Vybrané ciele" value={p.goals && p.goals.length ? p.goals.join(', ') : '—'} />
        <Row label="Drobné zmeny svojpomocne" value={yn(p.self_edit)} />

        <SectionTitle>Dizajn</SectionTitle>
        <Row label="Preferované farby" value={val(p.preferred_colors)} />
        <Row label="Typografia" value={val(p.preferred_typography)} />
        <Row label="Vlastné fotky" value={yn(p.has_own_photos)} />
        <Row label="Vlastné texty" value={yn(p.has_own_texts)} />
        <Row label="Referenčné weby" value={val(p.reference_sites)} />

        <SectionTitle>Funkcie webu</SectionTitle>
        <Row label="Hlavné funkcie" value={val(p.main_features)} />
        <Row label="Predaj produktov / služieb" value={yn(p.sells_products)} />
        {p.sells_products ? (
          <>
            <Row label="Aktuálna platobná brána" value={val(p.payment_gateway_current)} />
            <Row label="Ochota prejsť na Stripe" value={yn(p.payment_gateway_switch_stripe)} />
          </>
        ) : null}
        <Row label="CRM / e-mailing integrácia" value={yn(p.needs_crm_integration)} />
        {p.needs_crm_integration ? (
          <>
            <Row label="E-mail / CRM nástroj" value={val(p.email_provider_current)} />
            <Row label="Detail CRM" value={val(p.crm_details)} />
            <Row label="Ochota použiť Resend" value={yn(p.email_switch_resend)} />
          </>
        ) : null}
        <Row label="Fakturačný systém" value={yn(p.needs_invoicing)} />
        {p.needs_invoicing ? (
          <>
            <Row label="Aktuálny fakturačný systém" value={val(p.invoicing_system)} />
            <Row label="Akceptuje odporúčanie" value={yn(p.invoicing_switch_recommended)} />
          </>
        ) : null}
        <Row label="Analytika" value={yn(p.needs_analytics)} />
        {p.needs_analytics ? <Row label="Analytické nástroje" value={val(p.analytics_tools)} /> : null}
        <Row label="Viacjazyčnosť" value={yn(p.multilingual)} />
        {p.multilingual ? <Row label="Jazyky" value={val(p.languages)} /> : null}
        <Row label="Kontaktný formulár" value={yn(p.contact_form)} />
        <Row label="Newsletter formulár" value={yn(p.newsletter_form)} />
        <Row label="Špeciálne funkcie" value={val(p.special_features)} />

        <SectionTitle>Integrácie a rozšírenia</SectionTitle>
        <Row label="Interný CRM systém" value={yn(p.has_internal_crm)} />
        {p.has_internal_crm ? <Row label="Detail interného CRM" value={val(p.internal_crm_details)} /> : null}
        <Row label="Iné integrácie" value={val(p.other_integrations)} />
        <Row label="AI asistent na stránke" value={yn(p.wants_ai_assistant)} />
        {p.wants_ai_assistant ? <Row label="Účel AI asistenta" value={val(p.ai_assistant_purpose)} /> : null}
        <Row label="Vlastná aplikácia" value={yn(p.wants_custom_app)} />
        {p.wants_custom_app ? <Row label="Detail aplikácie" value={val(p.custom_app_details)} /> : null}
        <Row label="Rezervačný systém" value={yn(p.wants_booking_system)} />
        <Row label="Členská zóna" value={yn(p.wants_member_area)} />
        <Row label="Blog / magazín" value={yn(p.wants_blog)} />
        <Row label="Preferované úložisko dát" value={val(p.data_storage_preference)} />
        <Row label="Preferencia hostingu" value={val(p.hosting_preference)} />

        <SectionTitle>Záver</SectionTitle>
        <Row label="Cieľová skupina" value={val(p.target_audience)} />
        <Row label="Konkurenčná výhoda" value={val(p.unique_selling_point)} />
        <Row label="Údržbový balík" value={yn(p.maintenance_package)} />
        <Row label="Rozpočet" value={val(p.budget_range)} />
        <Row label="Termín" value={val(p.deadline)} />
        <Row label="Poznámky" value={val(p.notes)} />

        {p.briefId ? <Text style={meta}>ID briefu: {p.briefId}</Text> : null}
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AdminNewBrief,
  subject: (data: Record<string, any>) =>
    `📋 Nový brief: ${data?.name ?? 'klient'}${data?.company_name ? ' (' + data.company_name + ')' : ''}`,
  displayName: 'Notifikácia adminovi — nový brief',
  to: 'info@patrikpatoraj.sk',
  previewData: {
    name: 'Jana Nováková',
    email: 'jana@example.com',
    phone: '+421 900 000 000',
    company_name: 'Beauty s.r.o.',
    business_one_liner: 'Salón krásy v Bratislave',
    goals: ['Získať viac klientov', 'Online rezervácia'],
    budget_range: '1500 – 3000 €',
    briefId: 'demo-456',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '600px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 12px' }
const text = { fontSize: '14px', color: '#334155', lineHeight: '1.5', margin: '0 0 12px' }
const hr = { border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0 12px' }
const sectionTitle = { fontSize: '13px', fontWeight: 'bold' as const, color: '#3b82f6', textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 10px' }
const row = { margin: '0 0 10px' }
const rowLabel = { fontSize: '12px', color: '#64748b', margin: '0 0 2px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }
const rowValue = { fontSize: '14px', color: '#0f172a', margin: '0', fontWeight: 500 }
const meta = { fontSize: '11px', color: '#94a3b8', margin: '20px 0 0' }
