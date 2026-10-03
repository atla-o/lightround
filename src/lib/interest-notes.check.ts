import assert from "node:assert/strict"
import { test } from "node:test"
import { parseInterestDraft } from "./interest-notes.ts"

test("empty LP notes fail closed", () => {
  const parsed = parseInterestDraft({})
  assert.equal(parsed.ok, false)
  if (parsed.ok) return
  assert.match(parsed.errors.name ?? "", /required/i)
  assert.match(parsed.errors.email ?? "", /required/i)
  assert.match(parsed.errors.note ?? "", /required/i)
  assert.match(parsed.errors.role ?? "", /role/i)
})

test("a complete note parses without taking a client read key", () => {
  const parsed = parseInterestDraft({
    name: "Ada Alloc",
    email: "ada@example.com",
    organization: "",
    role: "lp",
    note: "Mandate fit for durable infrastructure.",
    readKey: "client-supplied",
    website: "https://spam.example",
  })
  assert.equal(parsed.ok, true)
  if (!parsed.ok) return
  assert.equal(parsed.draft.name, "Ada Alloc")
  assert.equal("readKey" in parsed.draft, false)
  assert.equal("website" in parsed.draft, false)
})
