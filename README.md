# Lightround

Lightround is a **counterdecadence fund** under the Devo holding company. It allocates capital and attention toward work that restores civilizational capacity — including Devo’s own organizations and external efforts that refuse extractive and decadent patterns.

The name inverts financialized institutional gravity: *light* against black, *round* against rock. This repository is the first product surface for that allocator: thesis, screens, an illustrative book, and an LP desk that posts notes to Cloud Run and stores them in Firestore in GCP project `devo-holding`. It is not a live fund administration system and it does not publish assets under management.

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
  --no-invoker-iam-check \
  --update-env-vars=GOOGLE_CLOUD_PROJECT=devo-holding,GCP_PROJECT_ID=devo-holding
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
| `/contact` | LP / operator interest form — POST `/api/interest` → Firestore |
| `/api/interest` | Cloud Run write + read-back of one LP note |
| `/api/interest/[id]` | Recover one stored note by receipt id |

## LP desk (Firestore)

Notes are written with `@google-cloud/firestore` (GCP client, not the Firebase JS SDK).

| Item | Value |
| --- | --- |
| Project | `devo-holding` |
| Database | `(default)` |
| Collection | `lightround_lp_notes` |
| Service | Cloud Run `lightround-web` (`us-west1`) |

Create the native Firestore database once if it does not exist (`us-west1` to match the service). Grant the Cloud Run runtime SA `roles/datastore.user` on `devo-holding`. Recover a receipt:

```bash
GOOGLE_CLOUD_PROJECT=devo-holding node scripts/recover-lp-note.mjs <receipt-id>
```

Or `GET /api/interest/<receipt-id>` on the live host. There is no public list of notes.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui primitives. App data lives on **GCP** project `devo-holding`. The LP desk uses Firestore via `@google-cloud/firestore`, not Firebase Auth or the Firebase JS SDK.

## What this build will not do

- Invent AUM, performance, or regulatory filings
- Target named private individuals
- Treat screens as a brief for harassment or illegal interference
- Mail or CRM-notify from the contact form (persistence is the desk)

## Publisher and process

Publisher: **Devo / atla-o**. Working home is Origin; this GitHub repo is the public open-source home. Cloud agents handle web, GCP, GitHub, and docs. Use a local Mac only when the work requires it. See `AGENTS.md`.
