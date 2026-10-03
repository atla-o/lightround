"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import { InterestReceipt } from "@/components/interest-receipt"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  parseInterestDraft,
  READ_KEY_HEADER,
  roleLabels,
  type InterestFieldErrors,
  type InterestNote,
  type InterestNoteDraft,
  type InterestRole,
} from "@/lib/interest-notes"

const empty: InterestNoteDraft = {
  name: "",
  email: "",
  organization: "",
  role: "lp",
  note: "",
}

export function InterestForm() {
  const [fields, setFields] = useState<InterestNoteDraft>(empty)
  const [errors, setErrors] = useState<InterestFieldErrors>({})
  const [received, setReceived] = useState<InterestNote | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [website, setWebsite] = useState("")

  function update<K extends keyof InterestNoteDraft>(
    key: K,
    value: InterestNoteDraft[K]
  ) {
    setFields((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    setSubmitError(null)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const parsed = parseInterestDraft(fields)
    if (!parsed.ok) {
      setErrors(parsed.errors)
      setSubmitError(null)
      const firstInvalid = (
        ["name", "email", "organization", "role", "note"] as const
      ).find((key) => parsed.errors[key])
      if (firstInvalid) {
        document.getElementById(firstInvalid)?.focus()
      }
      return
    }

    setSubmitting(true)
    setSubmitError(null)
    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...parsed.draft, website }),
      })
      const payload = (await response.json().catch(() => null)) as
        | { ok: true; note: InterestNote }
        | { ok: false; error?: string; errors?: InterestFieldErrors }
        | null

      if (!response.ok || !payload || !payload.ok) {
        if (payload && "errors" in payload && payload.errors) {
          setErrors(payload.errors)
        }
        setSubmitError(
          payload && "error" in payload && payload.error
            ? payload.error
            : "The desk could not store this note. Try again."
        )
        return
      }

      const recovered = await fetch(`/api/interest/${payload.note.id}`, {
        headers: { [READ_KEY_HEADER]: payload.note.readKey },
      })
      const recoveredPayload = (await recovered.json().catch(() => null)) as
        | { ok: true; note: InterestNote }
        | { ok: false; error?: string }
        | null

      if (recovered.ok && recoveredPayload?.ok) {
        setReceived(recoveredPayload.note)
        setFields(empty)
        setWebsite("")
        return
      }

      setSubmitError(
        `The desk stored receipt ${payload.note.id} but could not read it back. Keep read key ${payload.note.readKey} and use Recover a receipt.`
      )
    } catch {
      setSubmitError("The desk could not be reached. Try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (received) {
    return (
      <InterestReceipt
        note={received}
        onWriteAnother={() => {
          setReceived(null)
          setErrors({})
          setSubmitError(null)
        }}
      />
    )
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5 text-black" noValidate>
      <div
        className="pointer-events-none absolute top-0 left-0 h-px w-px overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      {submitError ? (
        <p
          role="alert"
          className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm leading-6 text-destructive"
        >
          {submitError}
        </p>
      ) : null}
      <Field id="name" label="Name" error={errors.name}>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          value={fields.name}
          aria-invalid={Boolean(errors.name)}
          className="h-10 rounded-sm bg-card text-base md:text-sm"
          onChange={(event) => update("name", event.target.value)}
        />
      </Field>
      <Field id="email" label="Email" error={errors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={fields.email}
          aria-invalid={Boolean(errors.email)}
          className="h-10 rounded-sm bg-card text-base md:text-sm"
          onChange={(event) => update("email", event.target.value)}
        />
      </Field>
      <Field id="organization" label="Organization" error={errors.organization}>
        <Input
          id="organization"
          name="organization"
          autoComplete="organization"
          value={fields.organization}
          aria-invalid={Boolean(errors.organization)}
          className="h-10 rounded-sm bg-card text-base md:text-sm"
          onChange={(event) => update("organization", event.target.value)}
        />
      </Field>
      <Field id="role" label="Role" error={errors.role}>
        <select
          id="role"
          name="role"
          value={fields.role}
          onChange={(event) => update("role", event.target.value as InterestRole)}
          className="h-10 w-full rounded-sm border border-input bg-card px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="lp">{roleLabels.lp}</option>
          <option value="operator">{roleLabels.operator}</option>
          <option value="other">{roleLabels.other}</option>
        </select>
      </Field>
      <Field id="note" label="Note" error={errors.note}>
        <Textarea
          id="note"
          name="note"
          rows={5}
          value={fields.note}
          aria-invalid={Boolean(errors.note)}
          placeholder="Mandate fit, not a pitch deck dump."
          className="rounded-sm bg-card text-base md:text-sm"
          onChange={(event) => update("note", event.target.value)}
        />
      </Field>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          disabled={submitting}
          className="h-10 rounded-sm px-4"
        >
          {submitting ? "Filing…" : "Submit this note"}
        </Button>
        <p className="text-xs leading-5 text-black">
          Posted to Cloud Run, stored in Firestore project{" "}
          <span className="font-mono">devo-holding</span>. No filing, no mail
          blast.
        </p>
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-[0.72rem] tracking-[0.12em] uppercase">
        {label}
      </Label>
      {children}
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
