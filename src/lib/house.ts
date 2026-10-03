/**
 * Oct 1 investor map.
 * Peer tops are exactly Arcada, Lightround, Humanehealth, Mattercircle.
 * Clinic-network names stay nested under Humanehealth.
 * Do not add Unnaturalfertility as a peer hub.
 */

export type PeerTop = {
  id: string
  name: string
  role: string
  summary: string
}

export type ClinicNode = {
  id: string
  name: string
  summary: string
}

export type RoadmapStage = {
  id: string
  title: string
  body: string
}

export const tops: readonly PeerTop[] = [
  {
    id: "arcada",
    name: "Arcada",
    role: "Social club",
    summary:
      "Four clubs in one house: ancestry, spiritual, political, and education. A peer top for membership and formation.",
  },
  {
    id: "lightround",
    name: "Lightround",
    role: "Fund",
    summary:
      "This fund. Capital and attention toward work that restores civilizational capacity. The LP desk on this site belongs to this top. No assets-under-management figure is published.",
  },
  {
    id: "humanehealth",
    name: "Humanehealth",
    role: "Clinic network",
    summary:
      "The clinic-network hub. Coverage, phenotype matching, attention restriction, wellness, and the family lander sit in this network.",
  },
  {
    id: "mattercircle",
    name: "Mattercircle",
    role: "Matter and physics",
    summary:
      "The matter and physics peer. Factory and essentials: plant, materials, and physical capacity built to be maintained.",
  },
] as const

export const clinicHubId = "humanehealth"

export const clinicNetwork: readonly ClinicNode[] = [
  {
    id: "acashi",
    name: "Acashi",
    summary:
      "Subsidized health coverage. A bare-bones application and account status inside the Humanehealth clinic network.",
  },
  {
    id: "phenomatch",
    name: "Phenomatch",
    summary:
      "Phenotype matching, with revenue directed toward a fertility program. Inside the Humanehealth clinic network.",
  },
  {
    id: "antiporn",
    name: "Antiporn",
    summary:
      "Computer restriction against pornography and other user-defined net negatives. Inside the Humanehealth clinic network.",
  },
  {
    id: "lessfret",
    name: "Lessfret",
    summary:
      "Wellness work that lowers chronic anxiety load: coaching and care coordination. Inside the Humanehealth clinic network.",
  },
  {
    id: "devoutshaman",
    name: "devoutshaman",
    summary:
      "The family domain and holding lander. On this map it sits in the Humanehealth clinic network.",
  },
] as const

export const peerLine = tops.map((top) => top.name).join(" · ")

export const successionLede =
  "The house an allocator is underwriting has four peer tops: Arcada, Lightround, Humanehealth, and Mattercircle. Clinic-network work is held by Humanehealth. This page is the succession map. It publishes no assets-under-management figure, and it is not an offer to sell or a solicitation to buy any security."

export const roadmapLede =
  "Attention follows the succession map. The sequence below is how Lightround reads the house. It publishes no assets-under-management figure, no return target, and no calendar of raises."

export const roadmap: readonly RoadmapStage[] = [
  {
    id: "tops",
    title: "Four peer tops",
    body: "The succession an allocator uses is Arcada, Lightround, Humanehealth, and Mattercircle. Those four names are the tops.",
  },
  {
    id: "fund",
    title: "This fund",
    body: "Lightround is the allocator among the four. The desk on this site takes limited-partner and operator notes for that mandate. Assets-under-management figures stay off this site.",
  },
  {
    id: "clinic",
    title: "Clinic network",
    body: "Humanehealth holds Acashi, Phenomatch, Antiporn, Lessfret, and devoutshaman. Capital or attention that touches those names is attention inside that hub.",
  },
  {
    id: "matter",
    title: "Factory and essentials",
    body: "Mattercircle is the matter and physics peer. The work there is factory and essentials: materials, plant, and physical capacity.",
  },
  {
    id: "examples",
    title: "Example theses stay labeled",
    body: "Work outside the house can appear in the book only with the label example thesis. Those entries illustrate the screens.",
  },
] as const
