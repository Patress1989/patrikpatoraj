import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'Patrik Patoraj'

interface Props {
  name?: string
}

const ClientConfirmation = ({ name }: Props) => (
  <Html lang="sk" dir="ltr">
    <Head />
    <Preview>Ďakujeme za váš dopyt — ozveme sa do 24 hodín</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Ďakujem, ${name}!` : 'Ďakujem za váš dopyt!'}
        </Heading>
        <Text style={text}>
          Práve som dostal váš dopyt cez formulár na patrikpatoraj.sk a som rád, že ste si vybrali práve mňa.
        </Text>
        <Text style={text}>
          <strong>Ozvem sa vám do 24 hodín</strong> s ukážkou konceptu a cenovou ponukou na mieru.
        </Text>
        <Section style={infoBox}>
          <Text style={infoTitle}>Čo bude nasledovať:</Text>
          <Text style={infoItem}>1. Pripravím vám ukážku konceptu zdarma</Text>
          <Text style={infoItem}>2. Pošlem cenovú ponuku na mieru</Text>
          <Text style={infoItem}>3. Po vašom súhlase začnem stavať</Text>
        </Section>
        <Text style={text}>
          Ak medzitým máte otázky, kľudne odpíšte priamo na tento e-mail alebo zavolajte na +421 915 070 771.
        </Text>
        <Text style={footer}>
          S pozdravom,<br />Patrik Patoraj<br />{SITE_NAME} · Risali s.r.o.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ClientConfirmation,
  subject: 'Ďakujem za váš dopyt — ozveme sa do 24 hodín',
  displayName: 'Potvrdenie pre klienta',
  previewData: { name: 'Jana' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '600px' }
const h1 = { fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#334155', lineHeight: '1.6', margin: '0 0 16px' }
const infoBox = { background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '16px', margin: '20px 0' }
const infoTitle = { fontSize: '14px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 8px' }
const infoItem = { fontSize: '14px', color: '#334155', lineHeight: '1.7', margin: '0' }
const footer = { fontSize: '13px', color: '#64748b', margin: '24px 0 0', lineHeight: '1.5' }
