import { SeoPage, isCityPage, pageLocation, serviceFamily, serviceTopicLabel } from "@/lib/site-data";

export type SiteImage = {
  src: string;
  width: number;
  height: number;
};

// Pexels CDN URLs. Each photo was verified against its description so the imagery
// matches the dispatch context (boarded windows, broken glass, graffiti cleanup,
// night response) instead of generic or unrelated stock.
const pexels = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop&dpr=1`;

const IMG = {
  boardedWindow: { src: pexels("29127440"), width: 1600, height: 1000 },
  boardedRural: { src: pexels("31788703"), width: 1600, height: 1000 },
  boardedCottage: { src: pexels("35607347"), width: 1600, height: 1000 },
  boardedWood: { src: pexels("18905946"), width: 1600, height: 1000 },
  boardedDoor: { src: pexels("5502660"), width: 1600, height: 1000 },
  brokenGlass: { src: pexels("12196590"), width: 1600, height: 1000 },
  brokenWindow: { src: pexels("10631753"), width: 1600, height: 1000 },
  nightBoarded: { src: pexels("26732100"), width: 1600, height: 1000 },
  securityDoor: { src: pexels("6206426"), width: 1600, height: 1000 },
  glassCleaner: { src: pexels("37440103"), width: 1600, height: 1000 },
  glassEntrance: { src: pexels("33903294"), width: 1600, height: 1000 },
  glassDoors: { src: pexels("7638806"), width: 1600, height: 1000 },
  graffitiCleanup: { src: pexels("10133570"), width: 1600, height: 1000 },
  graffitiWall: { src: pexels("26424724"), width: 1600, height: 1000 },
  storefront: { src: pexels("11077632"), width: 1600, height: 1000 },
  crewFacade: { src: pexels("18479261"), width: 1600, height: 1000 },
  fireKitchen: { src: pexels("10252682"), width: 1600, height: 1000 },
  charredBuilding: { src: pexels("12736402"), width: 1600, height: 1000 },
  stormCeiling: { src: pexels("30499666"), width: 1600, height: 1000 },
  garageDoor: { src: pexels("37124334"), width: 1600, height: 1000 },
  garageRow: { src: pexels("29527707"), width: 1600, height: 1000 },
} as const;

type FamilyImageSet = { hero: SiteImage; secondary: SiteImage; subject: string };

const FAMILY_IMAGES: Record<string, FamilyImageSet> = {
  "/board-up-company-contractor-canada": {
    hero: IMG.boardedWindow,
    secondary: IMG.glassCleaner,
    subject: "a boarded-up storefront window secured after damage",
  },
  "/graffiti-removal-services": {
    hero: IMG.graffitiCleanup,
    secondary: IMG.graffitiWall,
    subject: "workers cleaning graffiti off a storefront facade",
  },
  "/commercial-glass-repair-services": {
    hero: IMG.glassCleaner,
    secondary: IMG.glassEntrance,
    subject: "a storefront window being serviced",
  },
  "/window-boarding-services": {
    hero: IMG.boardedRural,
    secondary: IMG.boardedCottage,
    subject: "a window secured with a plywood board",
  },
  "/emergency-commercial-door-repair": {
    hero: IMG.garageRow,
    secondary: IMG.garageDoor,
    subject: "commercial roll-up doors being repaired",
  },
};

const EMERGENCY_IMAGES: Record<string, FamilyImageSet> = {
  "/emergency-board-up-services-canada": {
    hero: IMG.nightBoarded,
    secondary: IMG.boardedWindow,
    subject: "a building secured with emergency board-up at night",
  },
  "/24-hour-board-up-service": {
    hero: IMG.boardedDoor,
    secondary: IMG.boardedWood,
    subject: "a door and window secured with plywood boarding",
  },
  "/same-day-board-up-service": {
    hero: IMG.boardedCottage,
    secondary: IMG.boardedRural,
    subject: "a window boarded up during the day",
  },
  "/overnight-board-up-service": {
    hero: IMG.nightBoarded,
    secondary: IMG.boardedDoor,
    subject: "an overnight board-up securing a broken opening",
  },
  "/temporary-board-up-service": {
    hero: IMG.boardedWood,
    secondary: IMG.boardedCottage,
    subject: "a temporary plywood barrier holding until the repair",
  },
};

const FALLBACK_SET: FamilyImageSet = FAMILY_IMAGES["/board-up-company-contractor-canada"];

function baseSetFor(page: SeoPage): FamilyImageSet {
  if (EMERGENCY_IMAGES[page.pageSlug]) return EMERGENCY_IMAGES[page.pageSlug];
  const family = serviceFamily(page);
  return FAMILY_IMAGES[family] || FALLBACK_SET;
}

export function heroImageFor(page: SeoPage): { image: SiteImage; alt: string } {
  const set = baseSetFor(page);
  const topic = serviceTopicLabel(page);
  const location = pageLocation(page);
  const alt = isCityPage(page)
    ? `${set.subject}, representing ${topic.toLowerCase()} service in ${location}`
    : `${set.subject}, representing ${topic.toLowerCase()} service across ${location}`;
  return { image: set.hero, alt };
}

export function secondaryImageFor(page: SeoPage): { image: SiteImage; alt: string } {
  const set = baseSetFor(page);
  const location = pageLocation(page);
  const alt = `${set.subject}, on a dispatch call in ${location}`;
  return { image: set.secondary, alt };
}

/** Hero image for the homepage. */
export const HOME_HERO: { image: SiteImage; alt: string } = {
  image: IMG.nightBoarded,
  alt: "A BoardUpDispatch crew securing a storefront with emergency board-up at night across Canada",
};

/** Banner image for the services index page. */
export const SERVICES_HERO: { image: SiteImage; alt: string } = {
  image: IMG.boardedWindow,
  alt: "A boarded-up storefront window, secured and ready for repair by BoardUpDispatch",
};

/** Small card image for a national service pillar, used in listing grids. */
const PILLAR_CARDS: Record<string, SiteImage> = {
  "/board-up-company-contractor-canada": IMG.boardedWindow,
  "/window-boarding-services": IMG.boardedRural,
  "/door-boarding-services": IMG.boardedDoor,
  "/plywood-boarding-services": IMG.boardedWood,
  "/break-in-board-up-service": IMG.brokenGlass,
  "/fire-damage-board-up-service": IMG.fireKitchen,
  "/storm-damage-board-up-service": IMG.stormCeiling,
  "/vandalism-board-up-graffiti-removal": IMG.graffitiWall,
  "/commercial-property-board-up": IMG.crewFacade,
  "/retail-storefront-board-up": IMG.storefront,
  "/emergency-glass-window-repair": IMG.glassEntrance,
  "/commercial-glass-repair-services": IMG.glassCleaner,
  "/storefront-glass-repair": IMG.storefront,
  "/24-hour-glass-repair": IMG.glassDoors,
  "/graffiti-removal-services": IMG.graffitiCleanup,
  "/emergency-commercial-door-repair": IMG.garageRow,
};

export function pillarCardImage(slug: string): { image: SiteImage; alt: string } {
  const image = PILLAR_CARDS[slug] || FAMILY_IMAGES["/board-up-company-contractor-canada"].hero;
  return { image, alt: `${FAMILY_IMAGES[slug]?.subject || "board-up and dispatch work"}, illustrating the service` };
}
