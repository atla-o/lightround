import { NextResponse } from "next/server"
import { READ_KEY_HEADER } from "@/lib/interest-notes"
import { deskUnavailableMessage, readInterestNote } from "@/lib/interest-store"
import { readKeysMatch } from "@/lib/read-key"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  if (!id || id.length > 128 || /[^\w-]/.test(id)) {
    return NextResponse.json(
      { ok: false, error: "Unknown receipt." },
      { status: 400 }
    )
  }

  const readKey = request.headers.get(READ_KEY_HEADER)?.trim() ?? ""
  if (!readKey || readKey.length > 128) {
    return NextResponse.json(
      { ok: false, error: "A read key is required." },
      { status: 401 }
    )
  }

  try {
    const note = await readInterestNote(id)
    if (!note || !readKeysMatch(note.readKey, readKey)) {
      return NextResponse.json(
        { ok: false, error: "No note matches that receipt and read key." },
        { status: 404 }
      )
    }
    return NextResponse.json({ ok: true, note })
  } catch {
    return NextResponse.json(
      { ok: false, error: deskUnavailableMessage() },
      { status: 503 }
    )
  }
}
