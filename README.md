# BoardUpDispatch — pSEO site

Programmatic SEO site for **emergency board-up and property securing** (board-up,
window & door boarding, commercial glass repair, graffiti removal) across Canada.

Built on Next.js (App Router) + Tailwind CSS v4 with a custom "dispatch console"
design system — dark navy, volt-lime accents and IBM Plex Mono telemetry details.

## Pages

- 5 national emergency / time-based board-up pages
- 16 national service pillar pages (core board-up, cause-specific, commercial/retail, adjacent glass & graffiti)
- 3 near-me pages
- 30 city × service pages (5 services × 25 cities)
- Homepage, services index, sitemap, robots.txt

All 54 landing pages are generated from `pSEO - boardupdispatch.com.xlsx` into
`lib/boardupdispatch-pages.json` (see `/tmp/gen_bud_pages.py` as the reference generator).

## Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run start     # serve the production build
```

## Docker

```bash
docker compose up --build
```

Serves on port 3000. Set `NEXT_PUBLIC_SITE_URL` for the canonical domain.
