export type InterestRole = "lp" | "operator" | "other"

export type InterestNoteDraft = {
  name: string
  email: string
  organization: string
  role: InterestRole
  note: string
}

export type InterestNote = InterestNoteDraft & {
  id: string
  receivedAt: string
}

export const roleLabels: Record<InterestRole, string> = {
  lp: "Limited partner / allocator",
  operator: "Operator with a mandate-fit thesis",
  other: "Other",
}

export const MAX_NOTE_CHARS = 8000
const MAX_NAME = 200
const MAX_EMAIL = 254
const MAX_ORG = 200

export function isInterestRole(value: unknown): value is InterestRole {
  return value === "lp" || value === "operator" || value === "other"
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export type InterestFieldErrors = Partial<Record<keyof InterestNoteDraft, string>>

export function parseInterestDraft(input: unknown):
  | { ok: true; draft: InterestNoteDraft }
  | { ok: false; errors: InterestFieldErrors } {
  const body = input && typeof input === "object" ? (input as Record<string, unknown>) : {}
  const name = typeof body.name === "string" ? body.name.trim() : ""
  const email = typeof body.email === "string" ? body.email.trim() : ""
  const organization = typeof body.organization === "string" ? body.organization.trim() : ""
  const role = body.role
  const note = typeof body.note === "string" ? body.note.trim() : ""

  const errors: InterestFieldErrors = {}
  if (!name) errors.name = "Name is required."
  else if (name.length > MAX_NAME) errors.name = "Name is too long."
  if (!email) errors.email = "Email is required."
  else if (!isEmail(email) || email.length > MAX_EMAIL) errors.email = "Enter a valid email."
  if (organization.length > MAX_ORG) errors.organization = "Organization is too long."
  if (!isInterestRole(role)) errors.role = "Choose a role."
  if (!note) errors.note = "A short note is required."
  else if (note.length > MAX_NOTE_CHARS) errors.note = "Note is too long."

  if (Object.keys(errors).length > 0 || !isInterestRole(role)) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    draft: {
      name,
      email,
      organization,
      role,
      note,
    },
  }
}

export function formatReceivedAt(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}
