import Link from "next/link"
import { siblings, site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-3">
          <p className="font-heading text-lg tracking-tight">{site.name}</p>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            A {site.parent} allocator. Capital and attention toward restoration.
            Public host:{" "}
            <a
              href={site.publicHost}
              className="underline underline-offset-4"
            >
              lightround.devoutshaman.com
            </a>
            . Cloud Run on GCP; DNS only on Cloudflare. Family:{" "}
            {site.familyDomain}.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[0.68rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Devo siblings
          </p>
          <ul className="space-y-2 text-sm leading-6">
            {siblings.map((sibling) => (
              <li key={sibling.name}>
                <span className="text-foreground">{sibling.name}</span>
                <span className="text-muted-foreground"> — {sibling.note}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs leading-5 text-muted-foreground md:col-span-2">
          Publisher {site.publisher}. No AUM figure is published here. The LP
          desk form does not transmit.{" "}
          <Link href="/thesis" className="underline underline-offset-4">
            Read the screens
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
