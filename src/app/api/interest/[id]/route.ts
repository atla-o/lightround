import { NextResponse } from "next/server"
import { deskUnavailableMessage, readInterestNote } from "@/lib/interest-store"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  if (!id || id.length > 128 || /[^\w-]/.test(id)) {
    return NextResponse.json(
      { ok: false, error: "Unknown receipt." },
      { status: 400 }
    )
  }

  try {
    const note = await readInterestNote(id)
    if (!note) {
      return NextResponse.json(
        { ok: false, error: "No note at that receipt." },
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
