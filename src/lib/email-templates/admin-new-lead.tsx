import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  phone?: string
  business_area?: string
  company_name?: string
  business_description?: string
  preferred_colors?: string
  existing_website?: string
  submissionId?: string
}

const Row = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <Section style={row}>
      <Text style={rowLabel}>{label}</Text>
      <Text style={rowValue}>{value}</Text>
    </Section>
  ) : null

const AdminNewLead = (p: Props) => (
  <Html lang="sk" dir="ltr">
    <Head />
    <Preview>Nový dopyt od {p.name ?? 'klienta'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🎉 Nový dopyt z webu</Heading>
        <Text style={text}>
          Cez formulár na patrikpatoraj.sk prišiel nový dopyt.
        </Text>
        <Hr style={hr} />
        <Row label="Meno" value={p.name} />
        <Row label="E-mail" value={p.email} />
        <Row label="Telefón" value={p.phone} />
        <Row label="Oblasť podnikania" value={p.business_area} />
        <Row label="Firma" value={p.company_name} />
        <Row label="Popis" value={p.business_description} />
        <Row label="Preferované farby" value={p.preferred_colors} />
        <Row label="Existujúci web" value={p.existing_website} />
        {p.submissionId ? (
          <Text style={meta}>ID dopytu: {p.submissionId}</Text>
        ) : null}
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AdminNewLead,
  subject: (data: Record<string, any>) =>
    `🎉 Nový dopyt: ${data?.name ?? 'klient'}${data?.business_area ? ' (' + data.business_area + ')' : ''}`,
  displayName: 'Notifikácia adminovi — nový dopyt',
  to: 'info@patrikpatoraj.sk',
  previewData: {
    name: 'Jana Nováková',
    email: 'jana@example.com',
    phone: '+421 900 000 000',
    business_area: 'Kaderníctvo',
    company_name: 'Beauty s.r.o.',
    submissionId: 'demo-123',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '600px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 12px' }
const text = { fontSize: '14px', color: '#334155', lineHeight: '1.5', margin: '0 0 12px' }
const hr = { border: 'none', borderTop: '1px solid #e2e8f0', margin: '16px 0' }
const row = { margin: '0 0 10px' }
const rowLabel = { fontSize: '12px', color: '#64748b', margin: '0 0 2px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }
const rowValue = { fontSize: '14px', color: '#0f172a', margin: '0', fontWeight: 500 }
const meta = { fontSize: '11px', color: '#94a3b8', margin: '20px 0 0' }
