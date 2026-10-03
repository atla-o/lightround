"use client"

import { useState, type FormEvent } from "react"
import { InterestReceipt } from "@/components/interest-receipt"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { READ_KEY_HEADER, type InterestNote } from "@/lib/interest-notes"

type LookupErrors = {
  id?: string
  readKey?: string
}

export function ReceiptLookup() {
  const [id, setId] = useState("")
  const [readKey, setReadKey] = useState("")
  const [errors, setErrors] = useState<LookupErrors>({})
  const [note, setNote] = useState<InterestNote | null>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "missing" | "error">("idle")
  const [message, setMessage] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextId = id.trim()
    const nextKey = readKey.trim()
    const nextErrors: LookupErrors = {}
    if (!nextId) nextErrors.id = "Receipt id is required."
    if (!nextKey) nextErrors.readKey = "Read key is required."
    setErrors(nextErrors)
    setNote(null)
    if (nextErrors.id || nextErrors.readKey) {
      setStatus("idle")
      setMessage(null)
      return
    }

    setStatus("loading")
    setMessage(null)
    try {
      const response = await fetch(`/api/interest/${encodeURIComponent(nextId)}`, {
        headers: { [READ_KEY_HEADER]: nextKey },
        signal: AbortSignal.timeout(12000),
      })
      const payload = (await response.json().catch(() => null)) as
        | { ok: true; note: InterestNote }
        | { ok: false; error?: string }
        | null

      if (response.status === 404 || (payload && "ok" in payload && !payload.ok && response.status === 404)) {
        setStatus("missing")
        setMessage(
          payload && "error" in payload && payload.error
            ? payload.error
            : "No note matches that receipt and read key."
        )
        return
      }

      if (!response.ok || !payload || !payload.ok) {
        setStatus("error")
        setMessage(
          payload && "error" in payload && payload.error
            ? payload.error
            : "The desk could not be reached. Try again."
        )
        return
      }

      setNote(payload.note)
      setStatus("idle")
    } catch {
      setStatus("error")
      setMessage("The desk could not be reached. Try again.")
    }
  }

  return (
    <section className="border-t border-border pt-10 text-black">
      <h2 className="text-2xl">Recover a receipt</h2>
      <p className="mt-3 max-w-xl text-sm leading-6">
        Load one stored note with the receipt id and the read key from the desk.
      </p>
      <form
        onSubmit={onSubmit}
        method="post"
        action="/contact"
        className="mt-6 space-y-5"
        noValidate
      >
        <div className="space-y-2">
          <Label htmlFor="receipt-id" className="text-[0.72rem] tracking-[0.12em] uppercase">
            Receipt id
          </Label>
          <Input
            id="receipt-id"
            name="receipt-id"
            value={id}
            autoComplete="off"
            aria-invalid={Boolean(errors.id)}
            className="h-10 rounded-sm bg-white text-base text-black md:text-sm"
            onChange={(event) => {
              setId(event.target.value)
              setErrors((current) => ({ ...current, id: undefined }))
            }}
          />
          {errors.id ? (
            <p className="border border-black bg-white px-3 py-2 text-sm text-black" role="alert">
              {errors.id}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="read-key" className="text-[0.72rem] tracking-[0.12em] uppercase">
            Read key
          </Label>
          <Input
            id="read-key"
            name="read-key"
            value={readKey}
            autoComplete="off"
            aria-invalid={Boolean(errors.readKey)}
            className="h-10 rounded-sm bg-white font-mono text-base text-black md:text-sm"
            onChange={(event) => {
              setReadKey(event.target.value)
              setErrors((current) => ({ ...current, readKey: undefined }))
            }}
          />
          {errors.readKey ? (
            <p className="border border-black bg-white px-3 py-2 text-sm text-black" role="alert">
              {errors.readKey}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-10 items-center rounded-sm bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {status === "loading" ? "Checking the desk…" : "Load this receipt"}
        </button>
      </form>

      {note ? (
        <div className="mt-6">
          <InterestReceipt note={note} />
        </div>
      ) : null}
      {status === "missing" || status === "error" ? (
        <p
          role="alert"
          className="mt-6 border border-black bg-white px-4 py-3 text-sm leading-6 text-black"
        >
          {message}
        </p>
      ) : null}
      {status === "loading" ? (
        <p className="mt-6 border border-border bg-white px-4 py-6 text-sm leading-6 text-black">
          Checking the desk…
        </p>
      ) : null}
      {!note && status === "idle" && !errors.id && !errors.readKey ? (
        <p className="mt-6 border border-border bg-white px-4 py-6 text-sm leading-6 text-black">
          No receipt is loaded. Enter the receipt id and the read key the desk issued.
        </p>
      ) : null}
    </section>
  )
}
