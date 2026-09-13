import { Firestore, Timestamp } from "@google-cloud/firestore"
import { gcp } from "@/lib/gcp"
import type { InterestNote, InterestNoteDraft } from "@/lib/interest-notes"
import { isInterestRole } from "@/lib/interest-notes"

let client: Firestore | null = null

function firestore() {
  if (!client) {
    client = new Firestore({
      projectId: gcp.projectId,
      databaseId: gcp.firestoreDatabase,
    })
  }
  return client
}

function toIso(value: unknown): string {
  if (value instanceof Timestamp) return value.toDate().toISOString()
  if (value instanceof Date) return value.toISOString()
  if (typeof value === "string") return value
  return new Date().toISOString()
}

function asNote(id: string, data: Record<string, unknown>): InterestNote | null {
  if (
    typeof data.name !== "string" ||
    typeof data.email !== "string" ||
    typeof data.organization !== "string" ||
    !isInterestRole(data.role) ||
    typeof data.note !== "string"
  ) {
    return null
  }

  return {
    id,
    name: data.name,
    email: data.email,
    organization: data.organization,
    role: data.role,
    note: data.note,
    receivedAt: toIso(data.receivedAt),
  }
}

export async function writeInterestNote(draft: InterestNoteDraft): Promise<InterestNote> {
  const receivedAt = Timestamp.now()
  const ref = firestore().collection(gcp.collections.lpNotes).doc()

  await ref.set({
    name: draft.name,
    email: draft.email,
    organization: draft.organization,
    role: draft.role,
    note: draft.note,
    receivedAt,
    source: "lightround-web",
    projectId: gcp.projectId,
  })

  const stored = await readInterestNote(ref.id)
  if (!stored) {
    throw new Error("The desk wrote the note but could not read it back.")
  }
  return stored
}

export async function readInterestNote(id: string): Promise<InterestNote | null> {
  const snap = await firestore().collection(gcp.collections.lpNotes).doc(id).get()
  if (!snap.exists) return null
  return asNote(snap.id, (snap.data() ?? {}) as Record<string, unknown>)
}

export function deskUnavailableMessage() {
  return `The desk could not store this note in GCP project ${gcp.projectId}.`
}
