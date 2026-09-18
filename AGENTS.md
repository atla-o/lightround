<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Standing objective (Devo UI-first)

Cursor cloud work for this product: **one promptable environment / one cloud workspace**, kept current.

Priority order for every task unless Devo says otherwise:
1. **Complete functional UI** — usable end-to-end (persist data, real submit paths, loading/empty/error/success). No blocking coming-soon for core flows.
2. Black text on **white** backgrounds always — never follow system dark mode / white-on-black.
3. Ship via merge to `main` (Cloud Run Actions). Do not deploy from the agent unless Devo explicitly says push/ship/merge and deploy.

## Live UI preview

Whenever UI is in flux and **not yet on production `main`** (local/dev server, feature branch, or an unmerged PR), this agent must paste a **full, clickable preview URL** Devo can open inside Cursor — the Cloud Agent preview, tunnel, or forwarded-port URL for the running app (typically `npm run dev` on port **43180**). Screenshots and recordings are extra, not a substitute. Production `https://lightround.devoutshaman.com` is not that preview. Skip the preview URL only when the change is docs/CI/non-UI.

Parent: Devo (lateral health). Publisher: atla-o. GCP app data: project `devo-holding`. Public hosts on `*.devoutshaman.com` (Cloudflare DNS-only → Cloud Run).

Siblings: Phenomatch, Antiporn, Lessfret, Lightround, Acashi. Holding lander: atla-o/devo → devoutshaman.com.

# Lightround — agent notes

## This product

Counterdecadence fund LP desk.

Lightround is a counterdecadence fund under **Devo**. Thesis: allocate capital and attention toward anything that helps restore civilization, including Devo orgs and external efforts that push against extractive / decadent patterns.

Voice: sharp, institutional, serious. Not meme-y. Not a conspiracy blog. Not activism malware. Not a doxxing tool. Screens are **investment criteria** — what we fund *for* and what we refuse — never calls to violence or illegal interference.

Parent: Devo. Siblings: Phenomatch, Antiporn, Lessfret (wellness), Acashi. Public domain family: devoutshaman.com. Public product host: **https://lightround.devoutshaman.com** (Cloud Run / GCP; DNS-only on Cloudflare). Do not deploy unless the user explicitly asks.

Publisher: **Devo / atla-o**.

## Hybrid Cursor process (Devo)

| Work | Where |
| --- | --- |
| Web app, copy, docs, GitHub, GCP app data | **Cloud agent** |
| Hardware, keychain, native signing, local-only secrets | **Local Mac**, only when needed |
| Working git home | **Origin** |
| Public open-source home | [github.com/atla-o/lightround](https://github.com/atla-o/lightround) |
| Public product host | [lightround.devoutshaman.com](https://lightround.devoutshaman.com) — Cloud Run `lightround-web` (`devo-holding`, `us-west1`); Cloudflare is DNS only |
| App data / CRM / LP pipeline | **GCP** project `devo-holding`. Firestore collection `lightround_lp_notes` via `@google-cloud/firestore`. Not the Firebase JS SDK. |

The LP desk POSTs to `/api/interest` on Cloud Run `lightround-web`. Success is a Firestore write that can be read back (`GET /api/interest/[id]`). Do not fall back to localStorage as the success path.

Do not deploy this site (Vercel, Pages, Cloud Run, or `lightround.devoutshaman.com`) from an agent session unless the user explicitly orders a deploy. Cloudflare stays DNS-only — do not park the product on Pages or Workers.

## Product constraints

- No fake AUM, returns, or forged filings.
- No targeting of real private individuals for harassment.
- Portfolio entries that are not Devo siblings must be labeled **example thesis**.
- Mandate language stays constructive: resilience, durable infrastructure, human flourishing, fertility/health-adjacent where it fits Devo, clean materials/energy alternatives, medicine that heals, anti-frailty, pro-human culture.
- Against-screens (petrochemical lock-in, poison-as-medicine capture, frail infrastructure, antihuman programs, industrial-ag/GMO capture the thesis rejects) are **screens**, not a target list.

## Stack

- Next.js App Router, TypeScript, Tailwind v4, shadcn/ui (`src/components/ui`)
- Copy and book data live in `src/lib/` (`site.ts`, `screens.ts`, `allocations.ts`)
- Dev server: `npm run dev` → port **43180**

Read Next.js notes in `node_modules/next/dist/docs/` before inventing APIs from older training data.

## Production (Cloud Run)

- Service **`lightround-web`**, project `devo-holding`, region `us-west1`. Host `https://lightround.devoutshaman.com`. No separate beta host.
- `Dockerfile`: Next.js `output: 'standalone'`, listen on `0.0.0.0:$PORT` (default 8080). Image builds use `npm ci` — keep `package-lock.json` committed.
- Push to `main` auto-deploys via GitHub Actions (`gcloud run deploy lightround-web --source .`). Optional `cloudbuild.yaml` for a later Cloud Build trigger.
- Public access is `invoker_iam_disabled` (`--no-invoker-iam-check`). **Never** `--allow-unauthenticated` — org policy blocks `allUsers`.
- Cloudflare DNS-only. No Workers, no Pages. `fund.devoutshaman.com` may later redirect here.
- Do not deploy to GCP from an agent session unless the user explicitly orders a deploy.

## Taste

Spare, typography-led, paper and ink. Institutional — not a crypto casino, not a rant blog. Prefer editing mandate copy over adding chrome.
