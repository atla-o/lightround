"use client"

import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  formatReceivedAt,
  latestInterestNote,
  persistInterestNote,
  roleLabels,
  type InterestNote,
  type InterestRole,
} from "@/lib/interest-notes"

type Fields = {
  name: string
  email: string
  organization: string
  role: InterestRole
  note: string
}

const empty: Fields = {
  name: "",
  email: "",
  organization: "",
  role: "lp",
  note: "",
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function InterestForm() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [received, setReceived] = useState<InterestNote | null>(null)
  const [lastStored, setLastStored] = useState<InterestNote | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setLastStored(latestInterestNote())
    setReady(true)
  }, [])

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    setSubmitError(null)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next: Partial<Record<keyof Fields, string>> = {}
    if (!fields.name.trim()) next.name = "Name is required."
    if (!fields.email.trim()) next.email = "Email is required."
    else if (!isEmail(fields.email.trim())) next.email = "Enter a valid email."
    if (!fields.note.trim()) next.note = "A short note is required."
    if (Object.keys(next).length > 0) {
      setErrors(next)
      setSubmitError(null)
      return
    }

    try {
      const note = persistInterestNote(fields)
      setReceived(note)
      setLastStored(note)
      setSubmitError(null)
      setErrors({})
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "This browser could not store the note. Copy your text if you need a record."
      )
    }
  }

  if (received) {
    return (
      <ReceivedCard
        note={received}
        onWriteAnother={() => {
          setFields(empty)
          setReceived(null)
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      {ready && lastStored ? (
        <p className="border border-border bg-card px-4 py-3 text-sm leading-6 text-muted-foreground">
          Last received in this browser{" "}
          <span className="text-foreground">
            {formatReceivedAt(lastStored.receivedAt)}
          </span>
          , from {lastStored.name}. Write another note below if the mandate fit
          has changed.
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-5" noValidate>
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
        <Field id="organization" label="Organization">
          <Input
            id="organization"
            name="organization"
            autoComplete="organization"
            value={fields.organization}
            className="h-10 rounded-sm bg-card text-base md:text-sm"
            onChange={(event) => update("organization", event.target.value)}
          />
        </Field>
        <Field id="role" label="Role">
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
          <Button type="submit" className="h-10 rounded-sm px-4">
            Receive this note
          </Button>
          <p className="text-xs leading-5 text-muted-foreground">
            Received in this browser only. No CRM, filing, or outbound mail.
          </p>
        </div>
      </form>
    </div>
  )
}

function ReceivedCard({
  note,
  onWriteAnother,
}: {
  note: InterestNote
  onWriteAnother: () => void
}) {
  return (
    <div
      role="status"
      className="border border-border bg-card px-5 py-6 sm:px-6"
    >
      <p className="text-[0.68rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
        Received
      </p>
      <p className="mt-3 text-base leading-7">
        This desk held your note in this browser at{" "}
        {formatReceivedAt(note.receivedAt)}. There is no CRM behind the form.
        Keep your own copy if you intend to follow up with Devo.
      </p>
      <dl className="mt-5 space-y-3 text-sm leading-6">
        <ReceiptRow label="Name" value={note.name} />
        <ReceiptRow label="Email" value={note.email} />
        {note.organization ? (
          <ReceiptRow label="Organization" value={note.organization} />
        ) : null}
        <ReceiptRow label="Role" value={roleLabels[note.role]} />
        <ReceiptRow label="Note" value={note.note} />
      </dl>
      <Button
        type="button"
        variant="outline"
        className="mt-6 rounded-sm"
        onClick={onWriteAnother}
      >
        Write another note
      </Button>
    </div>
  )
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.68rem] tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-1 whitespace-pre-wrap">{value}</dd>
    </div>
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
