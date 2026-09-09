import type { Metadata } from "next"
import { InterestForm } from "@/components/interest-form"
import { PageShell } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "LP desk",
}

export default function ContactPage() {
  return (
    <PageShell
      kicker="Desk"
      title="Limited partner interest"
      lede="For allocators who want the mandate, and operators whose work already fits the screens. This page is a form stub. It does not open a CRM, send mail, or create a filing."
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr]">
        <aside className="space-y-4 text-sm leading-7 text-muted-foreground">
          <p>
            Lightround does not publish an AUM figure, a live book, or a
            subscription document on this site. If you are here for a rant or a
            target list, you are in the wrong product.
          </p>
          <p>
            Notes should speak to mandate fit: what is being restored, what is
            being refused, and why capital or attention is the right instrument.
          </p>
        </aside>
        <InterestForm />
      </div>
    </PageShell>
  )
}
