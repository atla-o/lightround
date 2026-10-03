import { Button } from "@/components/ui/button"
import {
  formatReceivedAt,
  roleLabels,
  type InterestNote,
} from "@/lib/interest-notes"

export function InterestReceipt({
  note,
  onWriteAnother,
}: {
  note: InterestNote
  onWriteAnother?: () => void
}) {
  return (
    <div
      role="status"
      className="border border-border bg-white px-5 py-6 text-black sm:px-6"
    >
      <p className="text-[0.68rem] font-medium tracking-[0.18em] uppercase">
        Received
      </p>
      <p className="mt-3 text-base leading-7">
        The desk stored this note in GCP project{" "}
        <span className="font-mono text-sm">devo-holding</span> at{" "}
        {formatReceivedAt(note.receivedAt)}. Receipt{" "}
        <span className="font-mono text-sm">{note.id}</span>.
      </p>
      <p className="mt-3 text-sm leading-6">
        Keep the read key. Recovery uses the receipt id together with this key.
      </p>
      <dl className="mt-5 space-y-3 text-sm leading-6">
        <ReceiptRow label="Read key" value={note.readKey} mono />
        <ReceiptRow label="Name" value={note.name} />
        <ReceiptRow label="Email" value={note.email} />
        {note.organization ? (
          <ReceiptRow label="Organization" value={note.organization} />
        ) : null}
        <ReceiptRow label="Role" value={roleLabels[note.role]} />
        <ReceiptRow label="Note" value={note.note} />
      </dl>
      {onWriteAnother ? (
        <Button
          type="button"
          variant="outline"
          className="mt-6 rounded-sm bg-white text-black"
          onClick={onWriteAnother}
        >
          Write another note
        </Button>
      ) : null}
    </div>
  )
}

function ReceiptRow({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div>
      <dt className="text-[0.68rem] tracking-[0.12em] uppercase">{label}</dt>
      <dd className={mono ? "mt-1 font-mono text-xs break-all" : "mt-1 whitespace-pre-wrap"}>
        {value}
      </dd>
    </div>
  )
}
