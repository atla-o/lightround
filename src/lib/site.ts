export const site = {
  name: "Lightround",
  tagline: "A counterdecadence fund",
  parent: "Devo",
  publisher: "Devo / atla-o",
  familyDomain: "devoutshaman.com",
  publicHost: "https://lightround.devoutshaman.com",
  github: "https://github.com/atla-o/lightround",
  description:
    "Lightround allocates capital and attention toward work that restores civilizational capacity. A Devo fund. Not a live AUM statement.",
} as const;

export const nav = [
  { href: "/", label: "Mandate" },
  { href: "/portfolio", label: "Allocations" },
  { href: "/thesis", label: "Screens" },
  { href: "/contact", label: "LP desk" },
] as const;

export const siblings = [
  { name: "Phenomatch", note: "Phenotype matching; revenue toward fertility" },
  { name: "Antiporn", note: "Computer restriction against extractive media" },
  { name: "Lessfret", note: "Wellness; lower chronic anxiety load" },
] as const;
