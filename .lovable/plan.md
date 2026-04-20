
## Úprava sekcie Časté otázky

Nájdem v `src/routes/index.tsx` FAQ otázku "Ako rýchle sú úpravy obsahu po odovzdaní?" a jej odpoveď nahradím novým, presnejším textom.

### Zmena textu

**Otázka:** Ako rýchle sú úpravy obsahu po odovzdaní?

**Nová odpoveď:**
> Pri všetkých balíkoch si obsah viete meniť sami. Ak máte zakúpenú aj mesačnú správu, jednoduché zmeny aplikujem do 24 hodín. Komplexnejšie zmeny do 48 hodín.

### Technické detaily

- **Súbor:** `src/routes/index.tsx`
- **Komponent:** `FAQ()` — konkrétne `<FAQItem q="..." a="..." />` s otázkou o rýchlosti úprav obsahu
- Nahradím iba prop `a` (odpoveď), otázka zostáva nezmenená
- Žiadne iné FAQ položky sa nemenia
