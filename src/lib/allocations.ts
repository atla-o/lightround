export type AllocationKind = "devo-sibling" | "example-external";

export type Allocation = {
  id: string
  name: string
  kind: AllocationKind
  house: string
  posture: "Sibling" | "Example thesis"
  summary: string
  screens: string[]
}

export const bookDisclaimer =
  "Illustrative book only. These entries are placeholder Devo-adjacent organizations and example external theses. They are not a live portfolio, not an assets-under-management figure, and not an offer to sell or a solicitation to buy any security."

export const allocations: Allocation[] = [
  {
    id: "phenomatch",
    name: "Phenomatch",
    kind: "devo-sibling",
    house: "Devo",
    posture: "Sibling",
    summary:
      "Match people by phenotype, with revenue directed toward a fertility program. A Devo product aimed at pairing and family formation rather than engagement metrics.",
    screens: ["Fertility-adjacent", "Pro-human institutions"],
  },
  {
    id: "antiporn",
    name: "Antiporn",
    kind: "devo-sibling",
    house: "Devo",
    posture: "Sibling",
    summary:
      "Computer restriction that blocks pornography and other user-defined net negatives. Attention infrastructure: the machine should not be an extraction engine.",
    screens: ["Attention resilience", "Pro-human culture"],
  },
  {
    id: "lessfret",
    name: "Lessfret",
    kind: "devo-sibling",
    house: "Devo",
    posture: "Sibling",
    summary:
      "Wellness work aimed at lowering chronic anxiety load so people can parent, build, and remain capable. Adjacent to Devo’s lateral health holding.",
    screens: ["Health", "Human flourishing"],
  },
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
