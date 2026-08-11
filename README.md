# Cowabunga Experience Finder

A concept prototype for **Cowabunga Camp** — a fluffy-cow farm network — that helps
visitors find a farm near them and plan a visit. Built as a full-stack site on
[vinext](https://github.com/cloudflare/vinext) (Vite + Cloudflare Workers + React 19
server components) and styled with Tailwind CSS v4.

> Concept prototype. Copy, pricing, and media placements are stand-ins ready for
> production assets.

## Highlights

- **Interactive US map.** An accurately projected map of the continental United
  States (Albers-USA) plots every farm at its true location. Selecting a pin
  updates the location detail panel, the experience comparison, and the booking
  summary.
- **Distance from a major city, front and center.** Each farm is drawn alongside
  its nearest major city with a connector line, and the drive distance is
  surfaced both on the map (e.g. _"Charlotte · 45 min"_) and as a prominent badge
  in the detail card.
- **Plan-your-visit builder.** Compare experiences (one-hour visits, private
  cabanas, evenings, overnight glamping), pick a group size, toggle add-ons, and
  see a live total.

## Tech stack

| Area        | Choice                                                   |
| ----------- | -------------------------------------------------------- |
| Framework   | [vinext](https://github.com/cloudflare/vinext) (Vite + Cloudflare + Next-style RSC) |
| UI          | React 19, Tailwind CSS v4                                |
| Data (opt.) | Cloudflare D1 + [Drizzle ORM](https://orm.drizzle.team/) |
| Map data    | `d3-geo` + `us-atlas` + `topojson-*` (build-time only)   |

## Getting started

Prerequisites: **Node.js `>=22.13.0`**.

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to http://localhost:5173) and scroll to
the **Find your farm** section.

> Note: `npm run install:ci` and `npm run build` are Linux-only helper scripts used
> by the hosting platform (they rely on `flock`/GNU `timeout`). On macOS use the
> plain `npm install` / `npm run dev` shown above.

## The map

The map is not hand-placed — it is generated so the state outlines and the farm
pins share one projection and always line up.

- [`scripts/generate-map-data.mjs`](scripts/generate-map-data.mjs) projects the
  continental US state geometry and every farm / nearest-city coordinate through a
  single `geoAlbersUsa` projection, simplifies the polygons for a small, smooth
  bundle, and writes [`app/map-data.ts`](app/map-data.ts).
- [`app/page.tsx`](app/page.tsx) renders that data as an inline SVG with
  interactive pins; [`app/globals.css`](app/globals.css) styles the land, borders,
  connectors, legend, and distance badge.

To change which farms appear or where they sit, edit the `geo` map (farm and
nearest-city latitude/longitude) in the generator and the `locations` array in
`app/page.tsx`, then regenerate:

```bash
node scripts/generate-map-data.mjs
```

## Project structure

```
app/            site source (page, layout, styles, generated map data)
scripts/        build helpers + the map-data generator
db/             optional Cloudflare D1 access + Drizzle schema
examples/d1/    optional D1 example surface
worker/         Cloudflare Worker entry
public/         static assets
```

## Diagnostic commands

- `npm run dev` — start the Vite/vinext dev server
- `npm run build` — build and validate the deployable artifact (Linux hosting)
- `npm run start` — start the built application
- `npm test` — build, validate, and verify rendered preview metadata
- `npm run db:generate` — generate Drizzle migrations after a schema change

## Hosting & auth notes

This project targets the OpenAI Sites hosting platform and supports optional
ChatGPT sign-in and Cloudflare D1/R2 bindings. See
[`app/chatgpt-auth.ts`](app/chatgpt-auth.ts) and
[`.openai/hosting.json`](.openai/hosting.json), and the
[vinext documentation](https://github.com/cloudflare/vinext) for the underlying
lifecycle details.
