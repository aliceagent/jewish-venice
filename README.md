# Jewish Venice — a traveller's guide

A static, dependency-free guide to Venice for Jewish travellers.

**Live:** https://aliceagent.github.io/jewish-venice/

## What's in it

| Tab | Contents |
|---|---|
| **The Day** | A one-day itinerary (Cannaregio → Rialto → San Marco → Dorsoduro → back) with an interactive route map, a Google Maps link on every stop, walking/transit directions on every leg, and an **expandable history panel** for each major stop — each with an honest "Jewish connection" note, including where there isn't one. |
| **Jewish Venice** | The 1516 decree, the etymology of *ghetto*, the regime of gates and guards, the compulsory pawn-banks, the people (Modena, Sara Copia Sullam, Bomberg, Luzzatto), and a 29-entry timeline from 1386 to 2026. |
| **Ghetto & Synagogues** | Self-guided walk: the campo, the Holocaust memorials, all five scole, the Ghetto Vecchio, and the Lido cemetery — with a map and visiting logistics. |
| **Kosher Food** | Every supervised establishment in the city, with address, phone, menus, supervision authority and hours — plus what's closed, what's a stale listing, and which popular guides are wrong. |
| **Shabbat** | Minyanim, the (wire-less) Venice eruv and when it's void, mikveh status, zmanim links that actually resolve to Venice *Italy*, measured walking distances, and hotel key/door guidance. |
| **Practical** | Airport and train arrival, vaporetti, acqua alta, etiquette at religious sites, Italian kashrut certification, and an explicit list of what this guide could not verify. |

## Editorial approach

Every factual claim was researched against live sources in July 2026 and is labelled:

- `verified` — read from a live primary or corroborating source
- `partly verified` — sources conflict, and the conflict is shown rather than hidden
- `unverified` — found in one weak source; flagged, not laundered

**Nothing was invented.** Where a phone number or address could not be confirmed, it is deliberately omitted and that omission is stated. Contested historical points (the *geto* etymology, peak Ghetto population, deportation counts, the Longhena attributions) are presented as contested.

## Tech

Plain HTML, CSS and JavaScript. No build step, no framework, no package install.

```
index.html          shell + all long-form content
assets/style.css    design system
assets/data.js      itinerary, kosher listings, Ghetto sites, timeline
assets/app.js       tabs, maps, expanders
assets/vendor/      Leaflet 1.9.4, vendored so the site has no CDN dependency
```

Maps are [Leaflet](https://leafletjs.com/) with CARTO Voyager tiles over OpenStreetMap data. Images are hot-linked from Wikimedia Commons under CC BY-SA and public-domain licences, credited in each caption, and hidden gracefully if they fail to load.

## Running locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

**GitHub Pages** — enabled from the `main` branch root. `.nojekyll` is present so `assets/` is served as-is.

**Vercel** — live at [jewish-venice.vercel.app](https://jewish-venice.vercel.app). The Vercel project is linked to this repo via Git integration: every push to `main` redeploys production, other branches get preview URLs. Static serve from the repo root, `vercel.json` included. See `SETUP.md` for details.

## Licence

Site code and prose: MIT. Images remain under their respective Wikimedia Commons licences as credited.

Not affiliated with the Comunità Ebraica di Venezia, Chabad of Venice, or any establishment listed. **Confirm anything you rely on.**
