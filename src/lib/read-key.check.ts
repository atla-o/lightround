import assert from "node:assert/strict"
import { test } from "node:test"
import { createReadKey, readKeysMatch } from "./read-key.ts"

test("read keys match only the issued value", () => {
  const key = createReadKey()
  assert.equal(key.length > 20, true)
  assert.equal(readKeysMatch(key, key), true)
  assert.equal(readKeysMatch(key, `${key}x`), false)
  assert.equal(readKeysMatch(key, ""), false)
  assert.equal(readKeysMatch("", key), false)
  assert.equal(readKeysMatch(key, createReadKey()), false)
})
