export type ScreenSide = "for" | "against"

export type Screen = {
  id: string
  side: ScreenSide
  title: string
  criterion: string
}

export const mandateLead =
  "Lightround underwrites restoration. We look for operators and institutions that increase civilizational capacity — and we decline patterns that extract from it. The screens below are investment criteria, not a political program and not a call to interfere with any person or firm."

export const screens: Screen[] = [
  {
    id: "resilience",
    side: "for",
    title: "Resilience",
    criterion:
      "Systems that keep working under stress: food, water, power, shelter, attention, and kinship. Preference for local repair, redundancy, and operators who can explain failure modes.",
  },
  {
    id: "durable-infra",
    side: "for",
    title: "Durable infrastructure",
    criterion:
      "Plant and software built to last and be maintained. We favor long service life, open enough documentation to repair, and capital that compounds in the physical world.",
  },
  {
    id: "flourishing",
    side: "for",
    title: "Human flourishing",
    criterion:
      "Work that makes capable adults and intact households more likely. Includes fertility- and health-adjacent efforts that fit Devo’s lateral health holding.",
  },
  {
    id: "materials-energy",
    side: "for",
    title: "Materials and energy alternatives",
    criterion:
      "Cleaner binders, process heat, and energy paths that reduce petrochemical dependency where substitutes exist. Substitution must be real, maintainable, and not a rebrand of the same lock-in.",
  },
  {
    id: "medicine",
    side: "for",
    title: "Medicine that heals",
    criterion:
      "Clinical and research efforts aimed at resolution — restoring function — rather than capturing patients in dependency loops. Screened as capital allocation, not as a treatment recommendation.",
  },
  {
    id: "culture",
    side: "for",
    title: "Pro-human culture and institutions",
    criterion:
      "Schools, media, software, and civic forms that treat people as ends. Attention products that reduce extraction. Institutions that can outlast a funding cycle.",
  },
  {
    id: "petro",
    side: "against",
    title: "Petrochemical lock-in",
    criterion:
      "We screen out businesses whose core advantage is keeping customers on petrochemical pathways when workable alternatives exist. Incumbency is not a thesis.",
  },
  {
    id: "poison-medicine",
    side: "against",
    title: "Poison-as-medicine capture",
    criterion:
      "We decline models that profit from perpetual dosing, iatrogenic lock-in, or treating the patient as a recurring revenue line. This is an investment screen, not a campaign against any named clinician.",
  },
  {
    id: "frail-infra",
    side: "against",
    title: "Frail infrastructure",
    criterion:
      "We decline disposable civic and digital systems that fail closed, cannot be repaired, or transfer maintenance risk onto the public while privatizing the rent.",
  },
  {
    id: "antihuman",
    side: "against",
    title: "Antihuman programs",
    criterion:
      "We do not allocate to efforts whose operating logic is fewer capable people, weaker households, or managed decline presented as progress.",
  },
  {
    id: "ag-capture",
    side: "against",
    title: "Industrial-ag and GMO capture",
    criterion:
      "Where the fund thesis rejects captive seed, input, and processing stacks that strip farmer and eater agency, we screen them out. Presented as mandate, not as interference with lawful agriculture.",
  },
]

export const conduct = [
  "No targeting of named private individuals for harassment, doxxing, or extra-legal pressure.",
  "No illegal interference with facilities, supply chains, or persons. Screens are allocation rules.",
  "No forged filings, invented AUM, or simulated regulatory status.",
  "Sibling Devo products may appear as related work. They are labeled. External names in this build are example theses only.",
]
