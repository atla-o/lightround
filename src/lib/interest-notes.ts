export const INTEREST_NOTES_KEY = "lightround.interest-notes.v1"
const MAX_NOTES = 20
const MAX_NOTE_CHARS = 8000

export type InterestRole = "lp" | "operator" | "other"

export type InterestNote = {
  id: string
  receivedAt: string
  name: string
  email: string
  organization: string
  role: InterestRole
  note: string
}

export type InterestNoteDraft = Omit<InterestNote, "id" | "receivedAt">

export const roleLabels: Record<InterestRole, string> = {
  lp: "Limited partner / allocator",
  operator: "Operator with a mandate-fit thesis",
  other: "Other",
}

function isRole(value: unknown): value is InterestRole {
  return value === "lp" || value === "operator" || value === "other"
}

function isNote(value: unknown): value is InterestNote {
  if (!value || typeof value !== "object") return false
  const note = value as Record<string, unknown>
  return (
    typeof note.id === "string" &&
    typeof note.receivedAt === "string" &&
    typeof note.name === "string" &&
    typeof note.email === "string" &&
    typeof note.organization === "string" &&
    isRole(note.role) &&
    typeof note.note === "string"
  )
}

function readStore(): Storage {
  if (typeof window === "undefined" || !window.localStorage) {
    throw new Error("This browser has no local storage.")
  }
  return window.localStorage
}

export function loadInterestNotes(): InterestNote[] {
  try {
    const raw = readStore().getItem(INTEREST_NOTES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isNote)
  } catch {
    return []
  }
}

export function latestInterestNote(): InterestNote | null {
  return loadInterestNotes()[0] ?? null
}

export function persistInterestNote(draft: InterestNoteDraft): InterestNote {
  const note: InterestNote = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    name: draft.name.trim(),
    email: draft.email.trim(),
    organization: draft.organization.trim(),
    role: draft.role,
    note: draft.note.trim().slice(0, MAX_NOTE_CHARS),
  }

  const next = [note, ...loadInterestNotes()].slice(0, MAX_NOTES)

  try {
    readStore().setItem(INTEREST_NOTES_KEY, JSON.stringify(next))
  } catch {
    throw new Error(
      "This browser could not store the note. Copy your text if you need a record."
    )
  }

  const stored = loadInterestNotes()
  if (!stored.some((item) => item.id === note.id)) {
    throw new Error(
      "This browser could not store the note. Copy your text if you need a record."
    )
  }

  return note
}

export function formatReceivedAt(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}
