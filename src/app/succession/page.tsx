import type { Metadata } from "next"
import { HouseMap } from "@/components/house-map"
import { PageShell } from "@/components/page-shell"
import { successionLede } from "@/lib/house"

export const metadata: Metadata = {
  title: "Succession",
}

export default function SuccessionPage() {
  return (
    <PageShell kicker="House" title="Investor succession" lede={successionLede}>
      <HouseMap />
    </PageShell>
  )
}
