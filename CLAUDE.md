# Jewish Venice — project instructions

A static travel guide to Venice for Jewish travellers. Plain HTML/CSS/JS, no build step, no framework, no package install.

## Structure

```
index.html          shell + all long-form prose, seven tab panels
assets/style.css    design tokens and components
assets/data.js      STOPS, ROWS, BOAT_PATHS, FOOD, SERVICES, JEWISH_SITES, TIMELINE, PHRASES, VENETIAN
assets/social/      favicon, app icons, OG share image (generated — see below)
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

Before shipping a change, check in the browser console that there are **zero JS errors**, all seven tabs render, and no link contains `undefined` or `NaN`. Expected counts: 36 itinerary rows, 9 history panels, 9 Ghetto cards, 29 timeline entries, 29 map markers, 6 phrase groups, 64 phrase lines, 18 Venetian words, 46 Google Maps links.

Check at a phone width too (390px). Two things regress easily there: **every tappable control must be at least 44px tall** — the itinerary rows previously stacked two links 6px apart — and **all seven tabs must be visible without horizontal scrolling**, since a hidden scroll strip silently swallows the last ones.

Watch for shadowing globals in `app.js` — an earlier `const top = ...` collided with `window.top` and silently killed all rendering.

**Never call `fitBounds` directly.** Leaflet cannot measure a `display:none` container, so a map built inside an inactive tab panel fits to world zoom and stays there — `invalidateSize()` on tab switch resizes it but does not re-fit. Use `fitTo(map, latlngs, maxZoom)`, which defers the fit until the panel is actually visible and applies it once only, so a reader's own pan is never overridden.

The icons and OG image in `assets/social/` are rendered from HTML templates with headless Chromium rather than committed by hand; regenerate them the same way if the branding changes. `og:image` must stay an **absolute** URL or link previews break.

## Deploying

`git push` to `main` deploys to production via Vercel's Git integration — the Vercel project `jewish-venice` (team "Alice Parrot's projects") is linked to this repo, production branch `main`. Pushes to other branches create preview deploys. Live at https://jewish-venice.vercel.app. No Vercel tokens or secrets exist anywhere, deliberately; see SETUP.md for how the pieces fit (including the project's no-op-on-checkout build command — leave it alone).

**Ship to `main` after every change.** The owner's standing instruction is that work goes live, not onto a review branch — develop wherever you like, but fast-forward `main` and push when the change is tested, then confirm production actually serves it. Do not leave finished work sitting on a branch waiting to be merged.

Do not add a build step. This site is deliberately dependency-free so it can be hosted anywhere, including plain GitHub Pages.
