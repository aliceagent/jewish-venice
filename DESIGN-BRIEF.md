# Design brief — Jewish Venice

**For:** Claude Design
**Live:** https://jewish-venice.vercel.app
**Repo:** `aliceagent/jewish-venice` — plain HTML/CSS/JS, no build step, no framework, no packages

---

## What this is

A traveller's guide to Venice written for Jewish visitors. Seven tabs: a one-day
itinerary with expandable history at every stop, the history of the Ghetto, a
self-guided synagogue walk, kosher listings, a Shabbat guide, an Italian
phrasebook, and practical logistics.

It is read in two very different situations, and the design has to serve both:

1. **At a desk, before the trip** — long-form reading, planning, deciding where
   to stay. Wide screen, unhurried, lots of prose.
2. **In the street, in Venice** — one hand, bright sun, patchy signal, standing
   on a bridge deciding where to go next. This is the situation the current
   design serves least well.

It installs as an app and works fully offline.

---

## The one thing that must not be designed away

**This guide's entire value is that it is honestly labelled.** A visually tidier
version that smooths over the hedging would be a worse product, not a better one.
Specifically:

- Every practical claim carries a `verified` / `partly verified` / `unverified`
  tag (`.vf` class). These are load-bearing. They can be restyled — they are
  currently plain and easy to miss — but not removed, and not made so decorative
  that "unverified" reads as reassuring.
- There are **26 callout boxes** (`.note`, with `.gold` / `.warn` / `.stop` / `.ok`
  variants). Several contain the most important content on the page — that three
  popular guides list non-kosher restaurants as kosher, that the eruv is void
  during acqua alta, that a phone number circulating online is wrong. They are
  not decoration and must not be visually demoted to asides.
- Contested facts are presented as contested on purpose. Hedged language stays.
- Several stops say plainly "there is no Jewish connection here." That honesty is
  a feature; don't let a template imply otherwise.

If a design change would make the guide look more authoritative than its evidence
warrants, it is the wrong change.

---

## Current design system

Everything lives in `assets/style.css` (373 lines, hand-written, no preprocessor).
Tokens are at the top:

```
Paper      --paper #faf7f1   --paper-2 #f3ede3   --card #fff
Ink        --ink #191713     --ink-2 #4d4740     --ink-3 #857d72
Lines      --line #e4dbcc    --line-2 #efe8dc
Primary    --lagoon #0e6b73  --lagoon-d #0a4f55  --lagoon-l #e3f1f2
Accent     --brick #9a3412   --brick-l #fbeee7
Also       --gold #a07a1f    --plum #6b2d5b      --green #166534
Semantic   --ok / --warn / --stop  (+ matching -bg)
Type       --serif "Iowan Old Style"/Palatino/Georgia · --sans system stack
Shape      --r 12px · --sh-1, --sh-2 · --wrap 1120px
```

The palette is warm paper + lagoon teal + brick — chosen to feel like Venice
rather than like a SaaS dashboard. **Keep that intent.** Serif for headings and
for the Italian phrases; system sans for UI and body.

Components: `.note` (4 variants), `.card`, `.factbox`, `.grid2`, `.cards`,
`.timeline` / `.tl`, `.chip`, `.vf`, `.btn`, `.mapbox`, `.tablecard`,
`table.itin`, `.history` expanders, `.ph` phrase rows, `.vword`.

---

## What was just fixed — please don't regress it

- **Tap targets.** Every interactive control is now ≥46px tall on mobile with
  real separation. The itinerary rows previously stacked two links 6px apart and
  people hit the wrong one.
- **The tab bar wraps rather than scrolls.** With seven tabs, the old hidden
  horizontal scroll strip silently swallowed the last two. All seven must stay
  visible without horizontal scrolling at 320px and up. Short labels swap in
  below 640px via `.lbl` / `.lbl-s`.
- **Itinerary rows become stacked blocks below 640px**, because as a real table
  the prose column was squeezed to ~150px between the time and travel columns.
- **Maps must never call `fitBounds` directly** — see `fitTo()` in `app.js`.
  Leaflet cannot measure a hidden container and silently fits to world zoom.

---

## Where the design is genuinely weak

This is the honest list, roughly in priority order.

1. **It looks like a document, not something you use while walking.** The mobile
   experience is a desktop article that reflows. There is no sense of "I am here,
   this is next." The itinerary is the core of the guide and on a phone it is a
   long scroll of near-identical blocks.

2. **No visual hierarchy between "read this now" and "read this before you go."**
   A reader standing in the Ghetto needs the opening hours and the passport rule;
   they do not need the 1516 Senate vote. Both currently have equal weight.

3. **26 callouts is too many to stay legible.** Four semantic variants exist but
   they are used at similar visual volume, so the truly critical ones (the eruv
   is void; these guides are wrong) don't outrank the merely useful. This needs a
   real severity ladder — without weakening the important ones.

4. **The verification tags are almost invisible.** They are the guide's central
   idea and currently render as small grey text. They deserve a treatment that is
   honest at a glance — including making "unverified" legible as a caution rather
   than as a neutral label.

5. **Long prose blocks have no rhythm.** The History and Shabbat tabs are dense
   walls. There are no pull quotes, no marginalia, no visual anchors, and the
   `figure` images only appear inside expanded histories.

6. **The seven-tab bar takes ~97px of a phone screen** in two wrapped rows before
   any content. It works and everything is reachable, but it is a lot of
   furniture. A bottom tab bar, or a compact sticky header on scroll, may serve
   the walking-around case far better.

7. **The three maps are inert grey boxes until they load** and sit at a fixed
   height, with the legend below as plain text.

8. **Tables** (`table.plain`, the walking-distance and zmanim tables) are
   unstyled-ish and cramped on mobile.

9. **No dark mode.** Plausibly valuable for a guide used at night, and the palette
   would need real thought rather than an inversion.

10. **Print styles are minimal.** Some travellers genuinely print a Shabbat page
    because they won't carry a phone. Worth doing properly.

---

## Constraints that are not negotiable

- **No build step, no framework, no npm.** Plain CSS in one file. This is
  deliberate so the site can be hosted anywhere and edited years from now.
- **Leaflet is vendored locally** in `assets/vendor/` — do not swap it for a CDN
  link. The site must have zero third-party runtime dependencies.
- **It must keep working offline.** New assets need adding to the `CORE` list in
  `sw.js`. Avoid designs that depend on fetching a webfont — the current stacks
  are deliberately system/local.
- **Content lives in two places**: structured data in `assets/data.js`
  (itinerary, kosher listings, Ghetto sites, timeline, phrases) rendered by
  `assets/app.js`; long-form prose written directly in `index.html`. A redesign
  touching card or row layout means touching the template strings in `app.js`.
- Read `CLAUDE.md` before changing anything — it carries the editorial rules and
  the testing checklist, including expected element counts.

---

## How to check the work

```bash
python3 -m http.server 8000
```

Zero JS errors in the console. All seven tabs render. No link containing
`undefined` or `NaN`. Expected counts: 36 itinerary rows, 9 history panels,
9 Ghetto cards, 29 timeline entries, 29 map markers, 6 phrase groups, 64 phrase
lines, 18 Venetian words, 46 Google Maps links.

Then check at **390px**: every tappable control ≥44px, all seven tabs visible
without horizontal scrolling, and the three maps fitted to Venice rather than to
the whole world.

---

## The brief, in one line

**Make it feel like something you hold in your hand in Venice, without making it
look more certain than it is.**
