import Link from "next/link"
import { clinicNetwork, tops } from "@/lib/house"
import { site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-white text-black">
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-3">
          <p className="font-heading text-lg tracking-tight">{site.name}</p>
          <p className="max-w-md text-sm leading-6">
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
          <p className="text-[0.68rem] font-medium tracking-[0.18em] uppercase">
            Peer tops
          </p>
          <ul className="space-y-2 text-sm leading-6">
            {tops.map((top) => (
              <li key={top.id}>
                <span>{top.name}</span>
                <span> — {top.role}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm leading-6">
            Under Humanehealth:{" "}
            {clinicNetwork.map((node) => node.name).join(", ")}.
          </p>
        </div>
        <p className="text-xs leading-5 md:col-span-2">
          Publisher {site.publisher}. No AUM figure is published here. The LP
          desk writes notes to Firestore in GCP project{" "}
          <span className="font-mono">devo-holding</span>.{" "}
          <Link href="/succession" className="underline underline-offset-4">
            Read the succession
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
