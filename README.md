# 9A Edinburgh St — Guest Digital Companion

A single-page guest guide for the waterfront Airbnb at **9A Edinburgh Street, Victoria Point QLD 4165**.

Pure HTML + CSS. No build step. The only external dependency is the **Fraunces** web font (loaded via Google Fonts `<link>`); the page falls back to system fonts and still looks fine offline.

## Files
- `index.html` — the guide (single page with sticky anchor navigation)
- `styles.css` — all styling (boutique waterfront theme)
- `manuals/` — official appliance/device PDF manuals (see `manuals/README.md` for the exact filenames to save)
- `README.md` — this file

## Appliance manuals
Each device in the guide has a small "Manual" link pointing to a PDF in `manuals/`.
The files aren't included yet — `manuals/README.md` lists the exact filename and model
for each one so you can download the official PDFs and drop them in. The links resolve
automatically once the files are present.

## Sections
**In the home:** Getting In (Yale lock), Wi-Fi, TVs, Music (Cambridge Audio), Kitchen, Laundry, BBQ & Outdoor, House Info.
**The area:** Local Area, Victoria Point Sharks, Island Ferries (Coochie & Straddie), Buses, Tides & Weather, History, Local Shops & Coffee.
**Leaving:** Check-out checklist.

## Adding photos later
The design has ready-made image slots — dashed placeholder boxes marked `figure.img-slot`. To add a photo, replace the `<figcaption>…</figcaption>` inside a slot with:
```html
<img src="images/your-photo.jpg" alt="description" />
```
Slots currently sit in: **Sharks**, **History**, and **Shops**. Add more anywhere with:
```html
<figure class="img-slot"><img src="images/x.jpg" alt="…" /></figure>
```
For a **hero background photo**, add a `url('images/hero.jpg')` to the `.hero` background stack in `styles.css` (there's a comment marking the spot) — the dark gradient overlay keeps the title legible.

## Before going live — placeholders to fill in
Left blank until we lock the site down. Search the HTML for `— — —`, `(to be added)`, or `(placeholder`:

| Where | What to add |
|-------|-------------|
| Getting In | Yale door lock entry code |
| Wi-Fi | Network name (confirm) + password |
| House Info | Bin collection day + host contact number |

## Local info is point-in-time
Ferry times, shop hours, bus frequency and Sharks fixtures were accurate when written (Aug 2026) but **change over time**. Each of those sections links out to the authoritative live source (BOM, TransLink, SeaLink, Amity Trader, the Sharks club) — tides, weather and live bus/ferry times can't be shown on a static page, so they link out by design.

## Equipment referenced (for maintenance)
- **Door lock:** Yale smart keypad deadbolt
- **Wi-Fi router:** Netgear Nighthawk WiFi 7 (RS200)
- **TVs:** Samsung 75" NeoQLED QN85F · Samsung Frame 55" & 65" (LS03H)
- **Audio:** Cambridge Audio EVO ONE
- **Appliances:** Samsung 655L fridge · Fisher & Paykel 10kg washer · Bosch 9kg heat-pump dryer · Panasonic 34L microwave · Smeg toaster · Beefeater 1600S BBQ · Dyson V8

## Publishing
Intended for GitHub (e.g. GitHub Pages). Once ready:
```
git init && git add . && git commit -m "Initial guest guide"
```
> ⚠️ Do **not** commit real door codes / Wi-Fi passwords to a public repo. Keep the repo private, or deliver those to guests separately.
