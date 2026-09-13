#!/usr/bin/env node
/**
 * Recover one LP desk note from Firestore in GCP project devo-holding.
 * Uses Application Default Credentials. Does not deploy.
 *
 *   GOOGLE_CLOUD_PROJECT=devo-holding node scripts/recover-lp-note.mjs <receipt-id>
 */
import { Firestore } from "@google-cloud/firestore"

const id = process.argv[2]
if (!id) {
  process.stderr.write("Usage: node scripts/recover-lp-note.mjs <receipt-id>\n")
  process.exit(1)
}

const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT_ID || "devo-holding"
const db = new Firestore({
  projectId,
  databaseId: process.env.FIRESTORE_DATABASE || "(default)",
})

const snap = await db.collection("lightround_lp_notes").doc(id).get()
if (!snap.exists) {
  process.stderr.write(`No note at ${id} in ${projectId}.\n`)
  process.exit(2)
}

process.stdout.write(`${JSON.stringify({ id: snap.id, ...snap.data() }, null, 2)}\n`)
