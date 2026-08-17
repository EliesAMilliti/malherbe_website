# Au Malherbe — guest guide

A lightweight multilingual guest guide for a single Airbnb apartment in Aix-en-Provence.

## Pages
- `index.html` — home
- `arrival.html` — check-in, transport, parking, visual arrival path
- `apartment.html` — Wi-Fi, apartment tips, rules, waste
- `recommendations.html` — restaurants, cafés, shops, day trips
- `departure.html` — check-out checklist
- `contact.html` — host buttons and French emergency numbers

## Most important files to edit
- `data/site-config.js` — host phone, WhatsApp, Wi-Fi name, basic apartment details
- `data/recommendations.js` — recommendation cards and translations
- `js/translations.js` — all interface translations (EN/FR/ES)
- `assets/images/` — replace photo placeholders with your own files

## Photos to add first
Use exactly these filenames, or change the filenames in the HTML:
1. `hero-residence.jpg` — best exterior/residence photo, horizontal
2. `living-room.jpg` — best interior hero photo
3. `building-entrance.jpg` — entrance travellers should recognise
4. `arrival-street.jpg` — view from the street / approach
5. `elevator.jpg` — lift location
6. `apartment-door.jpg` — final door travellers should look for
7. `parking-mignet.jpg` — parking entrance or tariff sign
8. `cutlery-drawer.jpg` — the hidden cutlery drawer
9. `waste-room.jpg` — bin-room door/location
10. `recycling-bins.jpg` — recycling point outside
11. `bedroom.jpg` — strongest bedroom photo
12. `view-or-balcony.jpg` — view, façade detail or another attractive shot

The layout keeps working if some images are missing; it shows labelled placeholders instead.

## QR code
The home page generates a QR code dynamically from the live URL. Once deployed on GitHub Pages, the QR automatically points to the correct public site. No manual QR regeneration is needed.

## Security — important
GitHub Pages is public. Anything stored in HTML/JS can be read by anyone, even if you only send the URL to confirmed guests.

For that reason, this template intentionally does **not** store:
- permanent building/lift access codes
- the Wi-Fi password

The Wi-Fi copy button is implemented, but stays disabled until a value is added to `wifiPassword` in `data/site-config.js`. Only add it if you knowingly accept that it will be public.

## Run locally
From this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages
1. Create a new GitHub repository, e.g. `au-malherbe`.
2. Upload/push the contents of this folder.
3. In GitHub: **Settings → Pages**.
4. Set **Deploy from a branch**, branch `main`, folder `/ (root)`.
5. GitHub will give you a URL similar to `https://USERNAME.github.io/au-malherbe/`.

## Updating recommendations later
Edit only `data/recommendations.js`. Each card has:
- category
- title
- address
- Google Maps search query
- EN / FR / ES tag
- EN / FR / ES description

## Current factual checks used in this draft (17 Aug 2026)
- Parking Mignet: 24/7, night period €9, 24h capped at €25.
- Marseille Airport ↔ Aix centre shuttle: normally every 30 min, ~30 min.
- France emergency numbers: 112, 15, 17, 18 and emergency SMS 114.
- Calanques: summer access can close for wildfire danger; Sugiton has reservation dates in 2026.

Because opening hours and access rules change, the public-facing text tells guests to check live information instead of hard-coding fragile schedules.
