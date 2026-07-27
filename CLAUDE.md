# Jewish Venice — project instructions

A static travel guide to Venice for Jewish travellers. Plain HTML/CSS/JS, no build step, no framework, no package install.

## Structure

```
index.html          shell + all long-form prose, six tab panels
assets/style.css    design tokens and components
assets/data.js      STOPS, ROWS, BOAT_PATHS, FOOD, SERVICES, JEWISH_SITES, TIMELINE
assets/app.js       tab routing, Leaflet maps, expanders, link builders
assets/vendor/      Leaflet 1.9.4, vendored — do not replace with a CDN link
```

Content lives in two places: **structured data** (itinerary stops, kosher listings, Ghetto sites, timeline) in `data.js`, and **long-form essays** directly in `index.html`. Add a stop by appending to `STOPS` and inserting a row into `ROWS`; the table, map and history panel all generate from that.

## Editorial standards — non-negotiable

This guide's entire value is that it is honestly labelled. A tidy-up pass that smooths over the hedging would make it worse, not better.

1. **Keep the verification tags.** Every practical claim is `verified` / `partly verified` / `unverified` (the `vf` CSS class, third element of each `rows` tuple in `data.js`). Never upgrade a tag without actually re-checking the source.
2. **Never invent contact details.** Chabad of Venice's phone number is deliberately absent — three conflicting addresses, one uncorroborated number. A number that reaches nobody is worse than no number. Same rule for any future gap.
3. **Contested facts stay contested.** The *geto* etymology, peak Ghetto population (~3,000–5,000), deportation counts (205–289; 246 is the community's own figure), the Longhena attributions for the Levantina and Spagnola. Hedges are deliberate, not sloppy.
4. **"There is no Jewish connection" is a valid, valuable answer.** Several stops say so plainly rather than manufacturing a link. Preserve that. The Bovolo, the Squero and Ponte dei Pugni panels each explain *why* the obvious-sounding connection is false.
5. **Google Maps links search by place name, not coordinates.** Map pins are approximate (geocoding was unavailable); name queries resolve correctly regardless. Do not convert links to lat/lng.
6. **Corrections to popular sources are load-bearing.** The guide names three widely-read guides that list non-kosher restaurants as kosher, and flags that Ghimel Garden is permanently closed. Don't soften these.

## Facts that go stale — recheck before claiming currency

- Restaurant hours, prices and supervision (Gam Gam is **Chabad** hashgacha; the community certifies Ba'Ghetto, Panificio Volpe and Rimon Place — two different authorities)
- Museo Ebraico restoration status — **never publish a reopening date**, the museum does not give one
- Mikveh suspension (the community's notice is undated)
- Eruv agreement (renewed April 2026, added Sant'Elena) — and it is **void during acqua alta**
- Ba'Ghetto menu PDFs are dated 2023

## Testing

```bash
python3 -m http.server 8000     # then open localhost:8000
```

Before shipping a change, check in the browser console that there are **zero JS errors**, all six tabs render, and no link contains `undefined` or `NaN`. Expected counts: 36 itinerary rows, 9 history panels, 9 Ghetto cards, 29 timeline entries, 29 map markers.

Watch for shadowing globals in `app.js` — an earlier `const top = ...` collided with `window.top` and silently killed all rendering.

## Deploying

`git push` to `main` triggers `.github/workflows/deploy.yml`, which deploys to Vercel from GitHub's runners. Requires a `VERCEL_TOKEN` secret (set org-wide so every repo inherits it). The token intentionally never exists in the agent environment.

Do not add a build step. This site is deliberately dependency-free so it can be hosted anywhere, including plain GitHub Pages.
