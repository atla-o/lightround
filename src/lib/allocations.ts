export type AllocationKind = "example-external";

export type Allocation = {
  id: string
  name: string
  kind: AllocationKind
  house: string
  posture: "Example thesis"
  summary: string
  screens: string[]
}

export const bookDisclaimer =
  "Illustrative book only. The four peer tops and the Humanehealth clinic network are the house map. External entries below are example theses. This page is not a live portfolio, not an assets-under-management figure, and not an offer to sell or a solicitation to buy any security."

export const allocations: Allocation[] = [
  {
    id: "materials",
    name: "Regional materials substitution",
    kind: "example-external",
    house: "External",
    posture: "Example thesis",
    summary:
      "Process heat, binders, and structural materials that displace petrochemical lock-in where substitutes already exist and can be maintained without a captive supply chain.",
    screens: ["Clean materials", "Reduced petrochemical dependency"],
  },
  {
    id: "civic-repair",
    name: "Repairable civic plant",
    kind: "example-external",
    house: "External",
    posture: "Example thesis",
    summary:
      "Water, power, and shelter systems designed to be repaired locally rather than replaced on vendor cycles. Anti-frailty infrastructure over disposable civic kit.",
    screens: ["Durable infrastructure", "Resilience"],
  },
  {
    id: "restorative-clinic",
    name: "Resolution-first clinic models",
    kind: "example-external",
    house: "External",
    posture: "Example thesis",
    summary:
      "Clinical practice oriented to resolving conditions rather than managing patients inside lifelong dependency loops. Thesis and screen language only — not medical advice.",
    screens: ["Medicine that heals", "Health"],
  },
]
