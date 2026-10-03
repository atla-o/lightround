import { randomBytes, timingSafeEqual } from "node:crypto"

export function createReadKey() {
  return randomBytes(32).toString("base64url")
}

export function readKeysMatch(stored: string, provided: string) {
  if (!stored || !provided) return false
  const left = Buffer.from(stored)
  const right = Buffer.from(provided)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}
