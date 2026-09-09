import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-14 text-center sm:px-8 sm:py-20">
      <p className="text-[0.68rem] font-medium tracking-[0.22em] text-muted-foreground uppercase">
        Allocator
      </p>
      <h1 className="mx-auto mt-4 max-w-3xl text-4xl leading-[1.12] sm:text-6xl">
        Capital toward restoration, not extraction.
      </h1>
      <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-foreground/90 sm:text-lg">
        Lightround is a counterdecadence fund under Devo. We allocate capital and
        attention toward work that restores civilizational capacity: durable
        infrastructure, human flourishing, and institutions that outlast
        extractive fashion — including Devo’s own organizations and external
        efforts that refuse decadent patterns. The name inverts financialized
        gravity: light against black, round against rock. We are an allocator,
        not a commentary desk.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button nativeButton={false} render={<Link href="/thesis" />} className="h-10 rounded-sm px-4">
          Read the screens
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/portfolio" />}
          variant="outline"
          className="h-10 rounded-sm px-4"
        >
          See the illustrative book
        </Button>
      </div>

      <Separator className="my-14" />

      <div className="grid gap-10 text-left md:grid-cols-2">
        <section>
          <p className="text-[0.68rem] font-medium tracking-[0.18em] text-[var(--rule)] uppercase">
            What we fund
          </p>
          <ul className="mt-4 space-y-4 text-sm leading-7">
            <li>
              <strong className="font-medium">Resilience and anti-frailty.</strong>{" "}
              Systems that keep households, plants, and attention intact under
              stress.
            </li>
            <li>
              <strong className="font-medium">Durable infrastructure.</strong>{" "}
              Repairable civic and industrial plant; software that does not
              expire into lock-in.
            </li>
            <li>
              <strong className="font-medium">Human flourishing.</strong>{" "}
              Fertility- and health-adjacent work that fits Devo, plus
              institutions that make capable adults more likely.
            </li>
            <li>
              <strong className="font-medium">Materials and medicine.</strong>{" "}
              Alternatives that reduce petrochemical dependency, and clinical
              models aimed at healing rather than capture.
            </li>
          </ul>
        </section>
        <section>
          <p className="text-[0.68rem] font-medium tracking-[0.18em] text-[var(--rule)] uppercase">
            What we screen out
          </p>
          <ul className="mt-4 space-y-4 text-sm leading-7">
            <li>
              <strong className="font-medium">Petrochemical lock-in</strong>{" "}
              where substitutes already exist and can be maintained.
            </li>
            <li>
              <strong className="font-medium">Poison-as-medicine capture</strong>{" "}
              — dependency loops sold as care.
            </li>
            <li>
              <strong className="font-medium">Frail infrastructure</strong> and
              antihuman programs that treat decline as a product.
            </li>
            <li>
              <strong className="font-medium">Industrial-ag / GMO capture</strong>{" "}
              rejected by the mandate. These are investment screens, not a
              brief for interference.
            </li>
          </ul>
        </section>
      </div>

      <p className="mx-auto mt-14 max-w-2xl text-sm leading-7 text-muted-foreground">
        Limited partners and mandate-fit operators can leave a note at the LP
        desk. The form is a stub: it does not send, store, or file anything.
      </p>
      <Link
        href="/contact"
        className="mt-3 inline-block text-sm underline underline-offset-4"
      >
        Open the LP desk
      </Link>
    </div>
  )
}
