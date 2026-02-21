# Shady Meadows B&B Automation Project

##A PLAYWRIGHT MAPPÁBAN LÉVŐ TESZT A VÉGEREDMÉNY, CYPRESSBEN MÁR NEM VOLT IDŐ MEGCSINÁLNUNK

Ez a projekt a Shady Meadows B&B weboldal kritikus üzleti folyamatainak (foglalás, kapcsolatfelvétel) és felhasználói felületének automatizált tesztelését valósítja meg Playwright keretrendszerben, Page Object Model (POM) tervezési minta használatával.

## Választott funkciók és prioritások
- **Booking Flow (P1):** A legfontosabb üzleti folyamat.
- **Contact Form (P2):** Kommunikációs csatorna integritása.
- **Navigation & UI (P3):** Felhasználói élmény és statikus tartalom ellenőrzése.

## Technológia
- Keretrendszer: Playwright (TypeScript)
- Design Pattern: Page Object Model (POM)
- Párhuzamosítás: Kikapcsolva (1 worker) a környezeti stabilitás érdekében.

## Futtatási Útmutató (How to run)
Kövesd az alábbi lépéseket a tesztek futtatásához:

1. **Függőségek telepítése:**
   ```bash
   npm install
   npx playwright install chromium
   npx playwright test

### 📄 TEST_EXECUTION_GUIDE.md (Rövid "READMET")

Ez a fájl kifejezetten a bírálóknak/futtatóknak szól, hogy 10 másodperc alatt képbe kerüljenek.

```markdown
# GYORS FUTTATÁSI ÚTMUTATÓ (QUICK START)

### Kötelező beállítások ellenőrzése
A versenykiírásnak megfelelően a tesztek párhuzamos futtatása TILTOTT. 
Ellenőrizhető a `playwright.config.ts` fájlban:
- `workers: 1`
- `fullyParallel: false`

### Futtatási parancsok sorrendben:
1. `npm install`
2. `npx playwright test`

### Teszt riport megnyitása (opcionális):
A futtatás végén generált riportot az alábbi paranccsal nézheti meg:
`npx playwright show-report`

### Tesztlefedettség:
- **TC_BOOKING_01-03:** Pozitív és negatív foglalási esetek.
- **TC_CONTACT_01:** Kapcsolati űrlap validáció.
- **TC_NAV_01:** Navigációs linkek és anchor pontok.
- **TC_UI_01-06:** UI elemek és szekciók tartalmi ellenőrzése.
