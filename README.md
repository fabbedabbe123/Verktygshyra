# Verktygshyra — Frontend MVP

En vanilla HTML/CSS/JS-prototyp för en peer-to-peer verktygsuthyrningsmarknadsplats.
Byggd för att vara enkel att koppla till en riktig backend senare — inga ramverk,
inga byggverktyg, ingen bundling. Öppna `index.html` i valfri webbläsare eller
kör en enkel lokal server (t.ex. `npx serve .`) för att testa modulerna (ES-moduler
kräver http/https, inte `file://`).

## Filstruktur

```
verktygshyra/
├── index.html              # Startsida
├── css/
│   ├── tokens.css          # Färger, typografi, spacing, radius — enda stället att ändra tema
│   ├── base.css            # Reset + grundtypografi
│   ├── components.css      # Knappar, nav, kort, formulär, footer
│   └── layout.css          # Hero, sidspecifik layout, responsivitet
├── js/
│   ├── data.js             # MOCK-DATALAGER — byt ut mot fetch()-anrop till er API
│   ├── icons.js            # Centralt SVG-ikonbibliotek
│   ├── ui.js                # Delad UI-logik: nav-scroll, scroll-reveal, toast
│   ├── main.js              # Startsidans logik
│   ├── search.js            # Sök/filtrera-sidans logik
│   ├── product.js           # Produktsidans logik + bokningswidget
│   ├── auth.js              # Login/registrera-formulär
│   └── dashboard.js         # Delad sidebar-logik för profil/mina verktyg/bokningar
└── pages/
    ├── search.html
    ├── product.html
    ├── login.html
    ├── register.html
    ├── profile.html
    ├── my-tools.html
    └── my-bookings.html
```

## Väntelista / leadinsamling

Startsidan har en väntelista-sektion (`#waitlistCard`) som skickar in till ett
**Google Formulär** i bakgrunden — gratis, ingen gräns på antal inskick, och
svaren landar i ett Google Sheet.

Innan formuläret fungerar behöver du koppla in det, se instruktionerna
högst upp i `js/waitlist.js`. Kortversion:

1. Skapa ett formulär på [forms.google.com](https://forms.google.com) med
   fälten Namn, E-post, Stad, "Jag vill helst".
2. Hämta en förifylld länk via ⋮ → "Get pre-filled link" för att se
   `entry.NNNNNN`-ID:na för varje fält.
3. Klistra in ID:na och formulär-URL:en i `js/waitlist.js`.

Tills dess visar formuläret ett tydligt felmeddelande vid inskick istället
för att låtsas fungera.

## Så kopplar ni på en backend

Allt gissningsarbete är samlat i **`js/data.js`**. Varje exporterad funktion
returnerar redan ett Promise, så ni byter bara ut kroppen mot ett riktigt
API-anrop utan att röra något annat i appen:

```js
// Idag:
export async function searchTools(filters) {
  await delay();
  return TOOLS.filter(...);
}

// Efter backend finns:
export async function searchTools(filters) {
  const res = await fetch(`/api/tools?${new URLSearchParams(filters)}`);
  return res.json();
}
```

Nästa steg i prioritetsordning (enligt vår produktdiskussion):
1. **Autentisering** — `auth.js` har redan formulärvalidering; koppla till er
   auth-endpoint (t.ex. Supabase Auth, Auth0, eller egen JWT-lösning).
2. **Riktiga verktygsannonser + bilder** — ersätt SVG-platshållarna i
   `tool-card-media` med riktiga bilduppladdningar.
3. **Betalning** — `booking-card` i `product.js` har redan datum → pris-logik;
   lägg till ett betalflöde (Stripe Connect passar bra för denna typ av
   marketplace eftersom pengar behöver delas mellan hyrare och uthyrare).
4. **Kartor/avstånd** — `city`-filtret i `search.js` är en enkel platshållare;
   ersätt med riktig geolokalisering när ni har koordinater per verktyg.

## Designsystem

Alla färger, typsnitt och mellanrum styrs från `css/tokens.css`. Primär grön
accent: `#1b7a4d`. Typsnitt: Plus Jakarta Sans (rubriker) + Inter (brödtext).
