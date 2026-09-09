# Lightround

Lightround is a **counterdecadence fund** under the Devo holding company. It allocates capital and attention toward work that restores civilizational capacity — including Devo’s own organizations and external efforts that refuse extractive and decadent patterns.

The name inverts financialized institutional gravity: *light* against black, *round* against rock. This repository is the first product surface for that allocator: thesis, screens, an illustrative book, and an LP-interest stub. It is not a live fund administration system and it does not publish assets under management.

## Homes

| Role | Place |
| --- | --- |
| Public product host | [lightround.devoutshaman.com](https://lightround.devoutshaman.com) — Cloud Run on **GCP**. DNS only on **Cloudflare** (no Cloudflare Pages / Workers host). |
| Public git | [github.com/atla-o/lightround](https://github.com/atla-o/lightround) |
| Working git | Origin (Devo / atla-o). Cloud agents commit here first. |
| Family domain | [devoutshaman.com](https://devoutshaman.com) |

Do not deploy from an agent session unless explicitly asked. Pointing DNS at Cloud Run is a separate ops step from this app repo.

## Run locally

```bash
npm install
npm run dev
```

The app listens on [http://127.0.0.1:43180](http://127.0.0.1:43180).

```bash
npm run build
npm start
```

```bash
npm run lint
```

## Surfaces

| Path | Purpose |
| --- | --- |
| `/` | Mandate: one-paragraph thesis, what we fund, what we screen out |
| `/thesis` | Investment screens and conduct |
| `/portfolio` | Illustrative allocations (Devo siblings + labeled example theses) |
| `/contact` | LP / operator interest form — UI only, nothing is transmitted |

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui primitives. No auth, no database, no CRM. App data, when it exists, belongs on **GCP** — not Firebase.

## What this build will not do

- Invent AUM, performance, or regulatory filings
- Target named private individuals
- Treat screens as a brief for harassment or illegal interference
- Open a real LP pipeline from the contact form

## Publisher and process

Publisher: **Devo / atla-o**. Working home is Origin; this GitHub repo is the public open-source home. Cloud agents handle web, GCP, GitHub, and docs. Use a local Mac only when the work requires it. See `AGENTS.md`.
