import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { allocations, bookDisclaimer } from "@/lib/allocations"

export const metadata: Metadata = {
  title: "Allocations",
}

export default function PortfolioPage() {
  const siblings = allocations.filter((item) => item.kind === "devo-sibling")
  const examples = allocations.filter((item) => item.kind === "example-external")

  return (
    <PageShell
      kicker="Book"
      title="Illustrative allocations"
      lede={bookDisclaimer}
    >
      <BookSection
        heading="Devo-adjacent"
        intro="Sibling organizations under the holding. Labeled as related work, not as marked-to-market positions."
        items={siblings}
      />
      <BookSection
        heading="External example theses"
        intro="Placeholder theses that fit the screens. Not companies Lightround has backed. Not invitations to contact the people who work in these fields."
        items={examples}
      />
    </PageShell>
  )
}

function BookSection({
  heading,
  intro,
  items,
}: {
  heading: string
  intro: string
  items: typeof allocations
}) {
  return (
    <section className="mb-14 last:mb-0">
      <p className="text-[0.68rem] font-medium tracking-[0.18em] text-[var(--rule)] uppercase">
        {heading}
      </p>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
        {intro}
      </p>
      <ul className="mt-8 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <li
            key={item.id}
            className="grid gap-3 py-6 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-8"
          >
            <div>
              <h2 className="text-xl leading-tight">{item.name}</h2>
              <p className="mt-2 text-[0.72rem] tracking-[0.08em] text-muted-foreground uppercase">
                {item.house} · {item.posture}
              </p>
            </div>
            <div>
              <p className="text-sm leading-7">{item.summary}</p>
              <p className="mt-3 text-xs tracking-wide text-muted-foreground">
                Screens: {item.screens.join(" · ")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
