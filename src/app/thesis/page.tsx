import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { conduct, mandateLead, screens } from "@/lib/screens"

export const metadata: Metadata = {
  title: "Screens",
}

const forScreens = screens.filter((screen) => screen.side === "for")
const againstScreens = screens.filter((screen) => screen.side === "against")

export default function ThesisPage() {
  return (
    <PageShell kicker="Mandate" title="Investment screens" lede={mandateLead}>
      <div className="grid gap-14 lg:grid-cols-2">
        <ScreenColumn
          heading="For"
          intro="What the book is trying to make more common."
          items={forScreens}
        />
        <ScreenColumn
          heading="Against"
          intro="What we decline when a cleaner alternative exists or the pattern is the product."
          items={againstScreens}
        />
      </div>

      <section className="mt-16 border-t border-border pt-10">
        <h2 className="text-2xl">Conduct</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Lightround is a fund product. Screens describe capital and attention.
          They do not authorize harassment, extra-legal action, or targeting of
          private persons.
        </p>
        <ul className="mt-6 max-w-2xl space-y-3 text-sm leading-7">
          {conduct.map((item) => (
            <li key={item} className="border-l-2 border-[var(--rule)] pl-4">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  )
}

function ScreenColumn({
  heading,
  intro,
  items,
}: {
  heading: string
  intro: string
  items: typeof screens
}) {
  return (
    <section>
      <p className="text-[0.68rem] font-medium tracking-[0.18em] text-[var(--rule)] uppercase">
        {heading}
      </p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{intro}</p>
      <ol className="mt-8 space-y-8">
        {items.map((item, index) => (
          <li key={item.id}>
            <p className="text-[0.68rem] tabular-nums text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-1 text-2xl leading-tight">{item.title}</h2>
            <p className="mt-2 text-sm leading-7 text-foreground/90">
              {item.criterion}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
