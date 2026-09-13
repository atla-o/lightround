import { NextResponse } from "next/server"
import { parseInterestDraft } from "@/lib/interest-notes"
import { deskUnavailableMessage, writeInterestNote } from "@/lib/interest-store"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: "Send a JSON note." },
      { status: 400 }
    )
  }

  const parsed = parseInterestDraft(body)
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, error: "Check the required fields.", errors: parsed.errors },
      { status: 400 }
    )
  }

  try {
    const note = await writeInterestNote(parsed.draft)
    return NextResponse.json({ ok: true, note })
  } catch (error) {
    const message =
      error instanceof Error && error.message.startsWith("The desk wrote")
        ? error.message
        : deskUnavailableMessage()
    return NextResponse.json({ ok: false, error: message }, { status: 503 })
  }
}
