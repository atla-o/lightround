import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { peerLine, roadmap, roadmapLede } from "@/lib/house"

export const metadata: Metadata = {
  title: "Roadmap",
}

export default function RoadmapPage() {
  return (
    <PageShell kicker="Sequence" title="Investor roadmap" lede={roadmapLede}>
      <p className="max-w-2xl text-sm leading-7 text-black">
        Peer tops: {peerLine}.{" "}
        <Link href="/succession" className="underline underline-offset-4">
          Open the succession map
        </Link>
        .
      </p>
      {roadmap.length === 0 ? (
        <p className="mt-10 border border-border bg-white px-4 py-6 text-sm leading-6 text-black">
          The roadmap is empty in this build.
        </p>
      ) : (
        <ol className="mt-10 max-w-2xl space-y-8">
          {roadmap.map((stage, index) => (
            <li key={stage.id}>
              <p className="text-[0.68rem] tabular-nums text-black/70">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-1 text-2xl leading-tight text-black">{stage.title}</h2>
              <p className="mt-2 text-sm leading-7 text-black">{stage.body}</p>
            </li>
          ))}
        </ol>
      )}
    </PageShell>
  )
}
