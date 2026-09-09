"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Role = "lp" | "operator" | "other"

type Fields = {
  name: string
  email: string
  organization: string
  role: Role
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
  const [held, setHeld] = useState(false)

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next: Partial<Record<keyof Fields, string>> = {}
    if (!fields.name.trim()) next.name = "Name is required."
    if (!fields.email.trim()) next.email = "Email is required."
    else if (!isEmail(fields.email.trim())) next.email = "Enter a valid email."
    if (Object.keys(next).length > 0) {
      setErrors(next)
      setHeld(false)
      return
    }
    setHeld(true)
  }

  if (held) {
    return (
      <div
        role="status"
        className="border border-border bg-card px-5 py-6 sm:px-6"
      >
        <p className="text-[0.68rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Held locally
        </p>
        <p className="mt-3 text-base leading-7">
          This desk does not transmit. Your note stayed in this browser session
          only — there is no CRM behind the form. Keep your own copy if you
          intend to follow up with Devo.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-5 rounded-sm"
          onClick={() => {
            setFields(empty)
            setHeld(false)
          }}
        >
          Write another note
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <Field
        id="name"
        label="Name"
        error={errors.name}
      >
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
          onChange={(event) => update("role", event.target.value as Role)}
          className="h-10 w-full rounded-sm border border-input bg-card px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="lp">Limited partner / allocator</option>
          <option value="operator">Operator with a mandate-fit thesis</option>
          <option value="other">Other</option>
        </select>
      </Field>
      <Field id="note" label="Note">
        <Textarea
          id="note"
          name="note"
          rows={5}
          value={fields.note}
          placeholder="Mandate fit, not a pitch deck dump."
          className="rounded-sm bg-card text-base md:text-sm"
          onChange={(event) => update("note", event.target.value)}
        />
      </Field>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" className="h-10 rounded-sm px-4">
          Hold this note
        </Button>
        <p className="text-xs leading-5 text-muted-foreground">
          UI only. Nothing is sent, stored, or forwarded from this page.
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
