# Rozšírenie objednávky o 2-krokový formulár s fakturačnými údajmi

Teraz má objednávka len 1 vstupné pole (e-mail) pred Stripe checkoutom. Rozdelíme to na 2 logické kroky a údaje uložíme do databázy + odošleme do Stripe.

## Plánované zmeny

### 1. `src/routes/objednavka.tsx` — prepracovanie formulára na 2 kroky

**Krok 1 — Osobné údaje:**
- Meno *
- Priezvisko *
- E-mail *
- Tlačidlo „Pokračovať na fakturačné údaje"

**Krok 2 — Fakturačné údaje:**
- Telefón *
- Ulica a číslo *
- Mesto *
- PSČ *
- Krajina (default: Slovensko)
- Checkbox „Nakupujem na firmu / IČO"
  - Ak zaškrtnuté → zobrazia sa polia:
    - Názov spoločnosti *
    - Sídlo spoločnosti (nepovinné — ak iné než fakturačná adresa)
    - IČO *
    - DIČ *
    - IČ DPH (nepovinné — nie každá firma je platca DPH)
- Tlačidlo „Pokračovať na platbu" → spustí Stripe Embedded Checkout (krok 3)

**UX detaily:**
- Indikátor pokroku „Krok 1 z 3 / 2 z 3 / 3 z 3"
- Tlačidlo „Späť" v kroku 2
- Validácia cez `zod` — meno/priezvisko trim+nonEmpty+max(100), e-mail email()+max(255), telefón regex pre SK/medzinárodný formát, PSČ regex, IČO 8 číslic, DIČ 10 číslic, IČ DPH `SK\\d{10}`
- Inline chybové hlásenia pod každým poľom

### 2. Uloženie objednávky pred platbou (nová tabuľka)

Migrácia pre tabuľku `order_submissions`:

```sql
CREATE TABLE public.order_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,

  street text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL DEFAULT 'SK',

  is_company boolean NOT NULL DEFAULT false,
  company_name text,
  company_address text,
  ico text,
  dic text,
  ic_dph text,

  stripe_session_id text,
  payment_status text NOT NULL DEFAULT 'pending',

  gdpr_consent boolean NOT NULL DEFAULT false
);

ALTER TABLE public.order_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an order" ON public.order_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (gdpr_consent = true);

CREATE POLICY "Admins can view orders" ON public.order_submissions
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can update orders" ON public.order_submissions
  FOR UPDATE TO public
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.order_submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
```

### 3. `supabase/functions/create-checkout/index.ts` — rozšírenie

- Prijme všetky údaje z formulára (zod validácia)
- Pred vytvorením Stripe session vloží záznam do `order_submissions` (cez service-role klienta) a získa `order_id`
- Stripe session vytvorí s:
  - `customer_email`
  - `metadata: { order_id, is_company, ico, dic, ic_dph }`
  - `subscription_data.metadata` (rovnaké hodnoty, aby sa preniesli na vytvorenú subscription)
  - Pri firme doplní `customer_creation: "always"` a `tax_id_data` (DIČ alebo IČ DPH)
- Po vytvorení session aktualizuje záznam o `stripe_session_id`

### 4. `src/lib/stripe.ts` — typovanie

Rozšírim `createCheckoutClientSecret` o nové polia (firstName, lastName, phone, billing address, isCompany, companyName, companyAddress, ico, dic, icDph, gdprConsent).

### 5. `supabase/functions/payments-webhook/index.ts` — aktualizácia

Po `checkout.session.completed` aktualizovať `order_submissions.payment_status = 'paid'` podľa `metadata.order_id`. Skontrolujem existujúci webhook a doplním logiku ak chýba.

## Bezpečnosť
- Validácia na klientovi (zod) **aj** v edge function (znova zod) — nikdy nedôverovať klientovi
- Regex pre IČO/DIČ/IČ DPH validuje SK formát
- RLS policies — len admin môže čítať objednávky, service role aktualizuje status

## Po implementácii
- Skontrolujem build (`bun run build`)
- Otestujem flow v sandbox móde (krok 1 → krok 2 → checkout → potvrdenie)
- V prípade času pridám zoznam objednávok do admin CRM
