import type { Metadata } from "next"
import { HouseMap } from "@/components/house-map"
import { PageShell } from "@/components/page-shell"
import { allocations, bookDisclaimer } from "@/lib/allocations"

export const metadata: Metadata = {
  title: "Allocations",
}

export default function PortfolioPage() {
  return (
    <PageShell
      kicker="Book"
      title="Illustrative allocations"
      lede={bookDisclaimer}
    >
      <HouseMap />
      <section className="mt-14">
        <p className="text-[0.68rem] font-medium tracking-[0.18em] text-[var(--rule)] uppercase">
          External example theses
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-black">
          Placeholder theses that fit the screens. Each one is labeled example
          thesis. They are illustrations of the mandate.
        </p>
        {allocations.length === 0 ? (
          <p className="mt-8 border border-border bg-white px-4 py-6 text-sm leading-6 text-black">
            No example theses are listed in this build.
          </p>
        ) : (
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {allocations.map((item) => (
              <li
                key={item.id}
                className="grid gap-3 bg-white py-6 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-8"
              >
                <div>
                  <h2 className="text-xl leading-tight text-black">{item.name}</h2>
                  <p className="mt-2 text-[0.72rem] tracking-[0.08em] text-black/70 uppercase">
                    {item.house} · {item.posture}
                  </p>
                </div>
                <div>
                  <p className="text-sm leading-7 text-black">{item.summary}</p>
                  <p className="mt-3 text-xs tracking-wide text-black/70">
                    Screens: {item.screens.join(" · ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageShell>
  )
}
