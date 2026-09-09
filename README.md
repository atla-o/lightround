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

Do not deploy from an agent session unless explicitly asked. Pointing DNS at Cloud Run is a separate ops step from this app repo. Push to `main` is the production deploy path (see below). There is no separate beta host — this host is the beta surface.

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

Production image builds use `npm ci`, which requires the committed `package-lock.json`. Do not delete the lockfile.

## Production (Cloud Run)

Public host: [lightround.devoutshaman.com](https://lightround.devoutshaman.com). Service **`lightround-web`**, project **`devo-holding`**, region **`us-west1`**. Cloudflare is DNS-only (grey cloud) — no Workers, no Pages.

The image is Next.js `output: 'standalone'`. It listens on `0.0.0.0:$PORT` (Cloud Run default `8080`).

Push to `main` deploys via `.github/workflows/deploy-lightround-web.yml`:

```bash
gcloud run deploy lightround-web \
  --source . \
  --project=devo-holding \
  --region=us-west1 \
  --no-invoker-iam-check
```

`--no-invoker-iam-check` sets `invoker_iam_disabled` (annotation `run.googleapis.com/invoker-iam-disabled`). That is how this service is public. **Never** `--allow-unauthenticated`: org policy (domain-restricted sharing) blocks `allUsers`.

Until the first deploy of `lightround-web` and a domain remap, the hostname may still serve the Devo holding stub (`devo-web`). After that remap, Cloudflare stays a DNS-only CNAME to `ghs.googlehosted.com`. `fund.devoutshaman.com` can later redirect here; today it still aliases the holding stub.

Optional later path: `cloudbuild.yaml` builds the image and deploys `--image` (same invoker flag; still no `allUsers`).

### GitHub Actions (one-time)

Repo variables (Settings → Secrets and variables → Actions → Variables):

| Variable | Example |
| --- | --- |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github/providers/github-actions` |
| `GCP_SERVICE_ACCOUNT` | `github-actions@devo-holding.iam.gserviceaccount.com` |

The service account needs Cloud Run Admin, Service Account User (runtime SA), and Cloud Build / Artifact Registry rights for `--source` deploys. Workload Identity Federation only — no JSON keys.

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
