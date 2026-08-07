import { RAW_PAGES } from "@/lib/generated-pages";
import { CITY_FACTS } from "@/lib/city-facts";
import { hashIndex, serviceMetaFor } from "@/lib/service-meta";

export type SeoPage = (typeof RAW_PAGES)[number];

export const SITE_NAME = "BoardUpDispatch";
export const DEFAULT_SITE_URL = "https://boardupdispatch.com";
export const PHONE_DISPLAY = "1-888-903-1607";
export const PHONE_E164 = "+18889031607";

export const SEO_PAGES: SeoPage[] = [...RAW_PAGES];
export const SERVICE_PILLARS = SEO_PAGES.filter((page) => page.pageType === "Service Pillar");
export const EMERGENCY_PAGES = SEO_PAGES.filter((page) => page.pageType === "Emergency Landing");
export const SERVICE_PAGES = SEO_PAGES.filter((page) => page.pageType === "Service Page");
export const CITY_PAGES = SEO_PAGES.filter((page) => page.pageType === "City Service Page");
export const SUPPORT_PAGES = SEO_PAGES.filter(
  (page) => page.pageType !== "Service Pillar" && !isCityPage(page),
);

const PILLAR_SLUGS = new Set(SERVICE_PILLARS.map((page) => page.pageSlug));

// Emergency, near-me and time-based pages map to the pillar that best represents
// their work so breadcrumbs and related links stay coherent.
const FAMILY_RULES: Array<[string, string]> = [
  ["/emergency-board-up-services-canada", "/board-up-company-contractor-canada"],
  ["/24-hour-board-up-service", "/board-up-company-contractor-canada"],
  ["/same-day-board-up-service", "/board-up-company-contractor-canada"],
  ["/overnight-board-up-service", "/board-up-company-contractor-canada"],
  ["/temporary-board-up-service", "/plywood-boarding-services"],
  ["/board-up-near-me", "/board-up-company-contractor-canada"],
  ["/emergency-glass-repair-near-me", "/commercial-glass-repair-services"],
  ["/graffiti-removal-near-me", "/graffiti-removal-services"],
];

// City-page slugs are built from the service prefix plus the city slug. Longest, most
// specific prefixes are listed first so matching stays deterministic.
const CITY_PREFIX_RULES: Array<[string, string]> = [
  ["/board-up-glass-repair-", "/board-up-company-contractor-canada"],
  ["/board-up-window-repair-", "/window-boarding-services"],
  ["/commercial-glass-repair-", "/commercial-glass-repair-services"],
  ["/emergency-garage-door-repair-", "/emergency-commercial-door-repair"],
  ["/graffiti-removal-", "/graffiti-removal-services"],
];

export function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    DEFAULT_SITE_URL;

  const normalized = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  return normalized.replace(/\/+$/, "");
}

export function toPath(slug: string) {
  return slug.startsWith("/") ? slug : `/${slug}`;
}

export function absoluteUrl(path: string) {
  return `${getSiteUrl()}${toPath(path)}`;
}

export function titleCase(value: string) {
  return value
    .split(/(\s|-|\/)/)
    .map((part) => {
      if (/^\s|-|\/$/.test(part)) return part;
      const upper = part.toUpperCase();
      if (["bc", "ab", "on", "mb", "sk", "nb", "ns", "qc", "nl", "pe", "nt", "yt", "nu"].includes(part.toLowerCase())) {
        return upper;
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("")
    .replace(/\bAnd\b/g, "and")
    .replace(/\bIn\b/g, "in")
    .replace(/\bNear Me\b/g, "Near Me")
    .replace(/\bOf\b/g, "of");
}

export function cityFromTargetArea(targetArea: string) {
  return targetArea.replace(/\s*\([^)]*\)/, "").split(",")[0].trim();
}

export function provinceFromTargetArea(targetArea: string) {
  return targetArea.includes(",") ? targetArea.split(",")[1].trim() : "Canada";
}

export function isCityPage(page: SeoPage) {
  return page.pageType === "City Service Page";
}

export function isEmergencyPage(page: SeoPage) {
  return page.pageType === "Emergency Landing";
}

function stripBrand(value: string) {
  return value.replace(/\s*\|\s*BoardUpDispatch$/i, "").trim();
}

/**
 * Cleans the SEO title suffixes from the Excel plan so the rendered H1 and link
 * labels read naturally instead of echoing keyword-stuffed title text verbatim.
 */
function cleanTitle(value: string) {
  return stripBrand(value)
    .replace(/\s*[-–]\s*24\/7\s*Response\s*$/i, "")
    .replace(/\s*[-–]\s*Same\s+Day\s+Response\s*$/i, "")
    .replace(/\s*[-–]\s*Canada\s*$/i, "")
    .replace(/\s+Canada\s+Wide\s*$/i, "")
    .replace(/\s*\(\s*Canada\s*\)\s*$/i, "")
    .trim();
}

export function pageListLabel(page: SeoPage) {
  return cleanTitle(page.pageTitle) || titleCase(page.primaryKeyword);
}

export function linkLabel(page: SeoPage) {
  return isCityPage(page) ? cityFromTargetArea(page.targetArea) : pageListLabel(page);
}

/**
 * Compact, unique label for flat index lists. City pages become "{City}, {Prov} — {Service}"
 * so multiple pages in one province stay distinct without repeating the full keyword-heavy
 * title on every line.
 */
export function indexLabel(page: SeoPage) {
  if (!isCityPage(page)) return pageListLabel(page);
  const city = cityFromTargetArea(page.targetArea);
  const prov = provinceFromTargetArea(page.targetArea);
  const family = serviceFamily(page);
  const pillar = SEO_PAGES.find((item) => item.pageSlug === family);
  const service = pillar ? serviceShortLabel(pillar) : "Dispatch";
  return `${city}, ${prov} — ${service}`;
}

/** Short, human service label for a pillar (drops trailing "Services"/"Repair" noise). */
export function serviceShortLabel(page: SeoPage) {
  switch (page.pageSlug) {
    case "/board-up-company-contractor-canada":
      return "Board-Up";
    case "/window-boarding-services":
      return "Window Boarding";
    case "/door-boarding-services":
      return "Door Boarding";
    case "/plywood-boarding-services":
      return "Plywood Boarding";
    case "/break-in-board-up-service":
      return "Break-In Board-Up";
    case "/fire-damage-board-up-service":
      return "Fire Damage Board-Up";
    case "/storm-damage-board-up-service":
      return "Storm Damage Board-Up";
    case "/vandalism-board-up-graffiti-removal":
      return "Vandalism & Graffiti";
    case "/commercial-property-board-up":
      return "Commercial Board-Up";
    case "/retail-storefront-board-up":
      return "Retail Board-Up";
    case "/emergency-glass-window-repair":
      return "Emergency Glass";
    case "/commercial-glass-repair-services":
      return "Commercial Glass";
    case "/storefront-glass-repair":
      return "Storefront Glass";
    case "/24-hour-glass-repair":
      return "24-Hour Glass";
    case "/graffiti-removal-services":
      return "Graffiti Removal";
    case "/emergency-commercial-door-repair":
      return "Door & Garage Repair";
    default:
      return pageListLabel(page);
  }
}

/**
 * One-line, name-free tagline for a pillar card so listing grids never echo the card
 * title back to back (e.g. "Window Boarding Window Boarding handled...").
 */
export function pillarTagline(page: SeoPage): string {
  switch (page.pageSlug) {
    case "/board-up-company-contractor-canada":
      return "Broken windows, doors and glass openings measured, cut, fastened and logged — secured properly, not just covered.";
    case "/window-boarding-services":
      return "Shattered windows boarded so the opening seals, the lock holds and the site reads as secured, not abandoned.";
    case "/door-boarding-services":
      return "Damaged or kicked-in doors secured so the site stays closed to everyone except the people you choose.";
    case "/plywood-boarding-services":
      return "The right plywood, cut and fastened to the actual opening, so the temporary fix holds until the real repair.";
    case "/break-in-board-up-service":
      return "After a break-in, the opening is secured fast and the damage is documented for the loss report.";
    case "/fire-damage-board-up-service":
      return "Fire crews cut openings; we close them the same day so the property is protected while the claim is sorted.";
    case "/storm-damage-board-up-service":
      return "Storm-damaged windows and doors covered with enough crews and plywood to handle a whole street.";
    case "/vandalism-board-up-graffiti-removal":
      return "Boarded up and cleaned in one dispatch, so a tagged, broken storefront stops looking like an easy target.";
    case "/commercial-property-board-up":
      return "The whole site secured on one ticket, with consistent boarding and a log your facility team can hand over.";
    case "/retail-storefront-board-up":
      return "Storefronts boarded to protect the stock and the lease, not just the opening.";
    case "/emergency-glass-window-repair":
      return "The opening secured first, the replacement pane installed fast, and the site back in business.";
    case "/commercial-glass-repair-services":
      return "Shattered or crazed commercial panes replaced and finished so the install clears inspection.";
    case "/storefront-glass-repair":
      return "Storefront glass matched and installed so the display is visible again, not boarded up.";
    case "/24-hour-glass-repair":
      return "A glass crew on the overnight line, so a broken window is repaired around the clock.";
    case "/graffiti-removal-services":
      return "Tags and paint removed with the right chemistry, without etching the surface underneath.";
    case "/emergency-commercial-door-repair":
      return "Doors and roll-up doors fixed or secured the same night, so the site is closed and locked before you leave.";
    default:
      return "Emergency board-up, glass and vandalism response dispatched across Canada, 24/7.";
  }
}

/** Keyword-rich anchor text for internal links (never a generic "click here"). */
export function anchorText(page: SeoPage) {
  return titleCase(page.primaryKeyword);
}

export function pillarAnchor(page: SeoPage) {
  return pageListLabel(page);
}

export function pageLocation(page: SeoPage) {
  if (isCityPage(page)) return cityFromTargetArea(page.targetArea);
  if (page.targetArea.includes("Canada")) return "Canada";
  return provinceFromTargetArea(page.targetArea);
}

export function serviceFamily(page: SeoPage) {
  const slug = toPath(page.pageSlug).replace(/\/+$/, "");
  if (PILLAR_SLUGS.has(slug)) return slug;
  for (const [prefix, family] of FAMILY_RULES) {
    if (slug === prefix || slug.startsWith(prefix)) return family;
  }
  for (const [prefix, family] of CITY_PREFIX_RULES) {
    if (slug.startsWith(prefix)) return family;
  }
  if (slug.includes("glass")) return "/commercial-glass-repair-services";
  if (slug.includes("graffiti")) return "/graffiti-removal-services";
  if (slug.includes("door")) return "/emergency-commercial-door-repair";
  if (slug.includes("board") || slug.includes("boarding")) return "/board-up-company-contractor-canada";
  return "/board-up-company-contractor-canada";
}

export function bySlug(slug: string) {
  const clean = toPath(slug).replace(/\/+$/, "");
  return SEO_PAGES.find((page) => page.pageSlug === clean) || fallbackPageFromSlug();
}

function fallbackPageFromSlug(): SeoPage {
  return (
    SEO_PAGES.find((page) => page.pageSlug === "/board-up-company-contractor-canada") ||
    SEO_PAGES[0]
  );
}

export function pillarFor(page: SeoPage) {
  return bySlug(serviceFamily(page)) || SERVICE_PILLARS[0];
}

export function cityPagesForPillar(pillar: SeoPage): SeoPage[] {
  return CITY_PAGES.filter((page) => serviceFamily(page) === pillar.pageSlug);
}

/**
 * One representative city page per location, so "Find Your City"-style grids show each
 * city exactly once instead of repeating it once per service.
 */
export function uniqueCityPages(): SeoPage[] {
  const seen = new Set<string>();
  const out: SeoPage[] = [];
  for (const page of CITY_PAGES) {
    const city = cityFromTargetArea(page.targetArea);
    if (seen.has(city)) continue;
    seen.add(city);
    out.push(page);
  }
  return out;
}

export function sameCityPages(page: SeoPage) {
  if (!isCityPage(page)) return [];
  const city = cityFromTargetArea(page.targetArea);
  return CITY_PAGES.filter((item) => item.pageSlug !== page.pageSlug && cityFromTargetArea(item.targetArea) === city);
}

export function supportCityLinks(page: SeoPage, limit = 5) {
  const family = serviceFamily(page);
  const matches = CITY_PAGES.filter((item) => item.pageSlug !== page.pageSlug && serviceFamily(item) === family);
  if (matches.length >= limit) return matches.slice(0, limit);
  const extras = CITY_PAGES.filter(
    (item) => item.pageSlug !== page.pageSlug && !matches.some((match) => match.pageSlug === item.pageSlug),
  );
  return [...matches, ...extras.slice(0, Math.max(0, limit - matches.length))];
}

/** Short topic label used mid-sentence ("your board-up work"). */
export function serviceTopicLabel(page: SeoPage) {
  const target = isCityPage(page) || isEmergencyPage(page) || page.pageType === "Service Page" ? pillarFor(page) : page;
  return serviceShortLabel(target);
}

/** The H1 for a city page reads "… in Toronto, ON" even though the plan titles omit "in". */
function cityH1(page: SeoPage): string {
  const city = cityFromTargetArea(page.targetArea);
  const prov = provinceFromTargetArea(page.targetArea);
  const base = pageListLabel(page).replace(/\s*[,-]?\s*$/, "");
  const cityClean = city.replace(/['’]/g, "").toLowerCase();
  const words = base.split(/\s+/);
  if (words.length > 1 && words[words.length - 1].toLowerCase() === cityClean) {
    words.pop();
  }
  return `${words.join(" ").trim()} in ${city}, ${prov}`;
}

export function buildH1(page: SeoPage) {
  if (isCityPage(page)) return cityH1(page);
  return pageListLabel(page);
}

/** Ordered Home > Services > Pillar > Page breadcrumb trail, reused for schema + visible UI. */
export function breadcrumbTrail(page: SeoPage): Array<{ name: string; path: string }> {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ];
  if (page.pageType === "Service Pillar") {
    trail.push({ name: buildH1(page), path: toPath(page.pageSlug) });
    return trail;
  }
  const pillar = pillarFor(page);
  trail.push({ name: pillarAnchor(pillar), path: toPath(pillar.pageSlug) });
  trail.push({ name: buildH1(page), path: toPath(page.pageSlug) });
  return trail;
}

function fitTitle(base: string, brandSuffix: string): string {
  const min = 50;
  const max = 60;
  let candidate = `${base}${brandSuffix}`;
  if (candidate.length >= min && candidate.length <= max) return candidate;

  if (candidate.length > max) {
    const words = base.split(" ");
    while (words.length > 1 && `${words.join(" ")}${brandSuffix}`.length > max) {
      words.pop();
    }
    candidate = `${words.join(" ")}${brandSuffix}`;
    if (candidate.length <= max) return candidate;
    const hardCut = max - brandSuffix.length;
    return `${base.slice(0, Math.max(hardCut, 1))}${brandSuffix}`;
  }

  const fillers = ["Board-Up", "Canada", "Experts", "Company"];
  let widened = base;
  for (const filler of fillers) {
    if (widened.toLowerCase().includes(filler.toLowerCase())) continue;
    const attempt = `${widened} ${filler}`;
    if (`${attempt}${brandSuffix}`.length <= max) {
      widened = attempt;
      candidate = `${widened}${brandSuffix}`;
      if (candidate.length >= min) return candidate;
    }
  }
  return candidate;
}

export function buildMetaTitle(page: SeoPage): string {
  const brandSuffix = ` | ${SITE_NAME}`;
  const keyword = titleCase(page.primaryKeyword);
  const lower = keyword.toLowerCase();
  let base = keyword;
  if (!isCityPage(page) && !lower.includes("near me") && !lower.includes("canada")) {
    base = `${keyword} Canada`;
  }
  return fitTitle(base, brandSuffix);
}

const MIN_DESC = 150;
const MAX_DESC = 160;

function fitDescription(opener: string, pool: string, cta: string): string {
  const fixedOpener = /[.!?]$/.test(opener.trim()) ? opener.trim() : `${opener.trim()}.`;
  const words = pool.trim().split(/\s+/);
  const danglingConnectors = new Set([
    "a",
    "an",
    "the",
    "and",
    "or",
    "plus",
    "with",
    "since",
    "for",
    "to",
    "in",
    "of",
    "so",
    "is",
    "are",
    "we",
    "that",
  ]);
  let bestCandidate = "";
  let bestDiff = Infinity;
  let fallbackValidButDangling = "";

  for (let i = 1; i <= words.length; i += 1) {
    const lastWord = words[i - 1].replace(/[.,;:]+$/, "").toLowerCase();
    const dangling = danglingConnectors.has(lastWord) && i < words.length;
    let middle = words.slice(0, i).join(" ").replace(/[,;:\s]+$/, "");
    if (!/[.!?]$/.test(middle)) middle += ".";
    const candidate = `${fixedOpener} ${middle} ${cta}`.replace(/\s+/g, " ").trim();
    const len = candidate.length;
    if (len > MAX_DESC) break;
    if (len >= MIN_DESC) {
      if (!dangling) return candidate;
      fallbackValidButDangling = candidate;
      continue;
    }
    if (dangling) continue;
    const diff = MIN_DESC - len;
    if (diff < bestDiff) {
      bestDiff = diff;
      bestCandidate = candidate;
    }
  }

  return fallbackValidButDangling || bestCandidate || `${fixedOpener} ${cta}`.replace(/\s+/g, " ").trim();
}

export function buildMetaDescription(page: SeoPage): string {
  const location = pageLocation(page);
  const meta = serviceMetaFor(serviceKeyFor(page));
  const opener = isEmergencyPage(page)
    ? `Need ${page.primaryKeyword} in ${location} today? We dispatch fast.`
    : `Book ${page.primaryKeyword} in ${location}.`;
  const cta = `Call ${PHONE_DISPLAY} now.`;
  const pool = `We work with ${meta.audiences[0]}, ${meta.audiences[1]}, ${meta.audiences[2]} and ${meta.audiences[3]} across the region. ${meta.synonym} covers boarding, glass replacement, door repair and vandalism cleanup, with crews on a 24/7 dispatch line. Every install is documented for your insurance file, and same-week scheduling stays available through the whole year.`;
  return fitDescription(opener, pool, cta);
}

function serviceKeyFor(page: SeoPage): string {
  if (page.pageType === "Emergency Landing") return page.pageSlug;
  return serviceFamily(page);
}

/** Deterministic pseudo-random pick so the same page always renders the same variant. */
function pick<T>(list: T[], seed: string, salt: string): T {
  return list[hashIndex(`${seed}:${salt}`, list.length)];
}

export function localFacts(page: SeoPage): Array<{ label: string; value: string }> {
  const city = cityFromTargetArea(page.targetArea);
  const facts = CITY_FACTS[city] || CITY_FACTS["Toronto"];
  return [
    { label: "Population", value: facts.population },
    { label: "Local landmark", value: facts.landmark },
    { label: "Retail frontages", value: facts.street },
    { label: "Weather & risk", value: facts.climate },
  ];
}

function needsKeyword(keyword: string, h1: string): boolean {
  return !h1.toLowerCase().includes(keyword.toLowerCase().trim());
}

export function introText(page: SeoPage): string {
  const meta = serviceMetaFor(serviceKeyFor(page));
  const location = pageLocation(page);
  const keyword = page.primaryKeyword;

  if (isEmergencyPage(page)) {
    const opener = needsKeyword(keyword, buildH1(page))
      ? `When you search for ${keyword}, you need one thing: a crew on site now, not a callback next week`
      : `When a door is broken, a window is shattered, or a storefront is open, you need one thing: a crew on site now, not a callback next week`;
    return `${opener}. We keep technicians on standby for ${meta.audiences[0]} and ${meta.audiences[1]} across ${location}, and ${meta.differentiator}. Most of the calls we take are about ${meta.painPoint}, so when you reach us we focus on your address, what is damaged, and how fast we can get there. From there, ${meta.synonym} usually happens the same day, with the site secured and any paperwork sorted before we leave.`;
  }

  if (page.pageType === "Service Pillar") {
    const opener = needsKeyword(keyword, buildH1(page)) ? `${titleCase(keyword)} is for you if you run or manage` : `You are in the right place if you run or manage`;
    return `${opener} ${meta.audiences[0]}, ${meta.audiences[1]}, ${meta.audiences[2]}, or ${meta.audiences[3]} anywhere across Canada. Every visit centres on ${meta.items[0]} and ${meta.items[1]}, and ${meta.differentiator}. Most people call us because ${meta.painPoint} kept happening with a previous contractor, and the fix usually starts with a short conversation about your address, the damage, and how soon you need the site secured. Below, you will see exactly what a visit covers, how your first dispatch gets booked, and how ${meta.synonym} adapts as your property changes through the year.`;
  }

  if (isCityPage(page)) {
    const city = cityFromTargetArea(page.targetArea);
    const facts = CITY_FACTS[city] || CITY_FACTS["Toronto"];
    const pillar = pillarFor(page);
    const scopeLine = `you get ${serviceTopicLabel(pillar).toLowerCase()} handled on a schedule that fits how ${city} actually runs`;
    const opener = needsKeyword(keyword, buildH1(page)) ? `With ${titleCase(keyword)}, ${scopeLine}` : `In ${city}, ${scopeLine}`;
    const middle = pick(
      [
        `${city} is home to ${facts.population}, and if your property sits near ${facts.neighbourhood} you already know ${facts.climate}`,
        `Around ${facts.neighbourhood}, ${facts.population} and ${facts.climate} keep board-up and glass crews working through the year, especially along ${facts.street}`,
        `With ${facts.population} spread through ${facts.region}, ${facts.climate} means windows, doors and storefronts take real punishment near ${facts.neighbourhood}`,
      ],
      `${city}:${serviceFamily(page)}`,
      "intro",
    );
    const closer = pick(
      [
        `Instead of a one-size national route, your visits across ${city} are timed around your access, your opening hours, and the fact that ${meta.differentiator}. You end up with a plan that matches your site, not a template pulled from another market.`,
        `Rather than a generic national schedule, your visits in ${city} are built around your access, your hours, and the fact that ${meta.differentiator}. The result is a plan shaped for your property, not a template pulled from another market.`,
      ],
      `${city}:${serviceFamily(page)}`,
      "closer",
    );
    return `${opener}. ${middle}. ${closer}`;
  }

  // Service Page (near-me intent)
  const opener = needsKeyword(keyword, buildH1(page)) ? `${titleCase(keyword)} is built around` : `Your service is built around`;
  return `${opener} the day-to-day reality of ${meta.audiences[0]} and ${meta.audiences[1]}, where ${meta.painPoint} is the exact problem you want gone. Every visit covers ${meta.items[0]} and ${meta.items[1]} on a schedule you control, and ${meta.differentiator}. You will see who this fits, how your first dispatch gets booked, and what to ask before you sign with any contractor. If you run ${meta.audiences[2]} or ${meta.audiences[3]}, you get the same approach with only small changes to timing and access.`;
}

export function planningText(page: SeoPage): string {
  const meta = serviceMetaFor(serviceKeyFor(page));
  const location = pageLocation(page);

  if (isCityPage(page)) {
    const city = cityFromTargetArea(page.targetArea);
    return `When you book your first dispatch in ${city}, we start with a quick rundown of your access, what is broken or open, and what is going wrong today. Because ${meta.differentiator}, that first visit usually settles whether you need a straight board-up, a glass replacement, or a door repair. Getting ${meta.painPoint} off your plate is the whole point, and you are almost always quoted before the crew leaves your site.`;
  }
  if (isEmergencyPage(page)) {
    return `On an emergency call, we skip the slow proposal and get to the essentials: your address, how the crew can reach the opening, and what is damaged right now. Because ${meta.differentiator}, dispatch can usually give you a real arrival window on the first call across ${location}. Securing ${meta.painPoint} fast is the only goal, and we handle the barrier, the cleanup, and any required paperwork before we pull away.`;
  }
  return `When you plan your service, we start with your current traffic, how often ${meta.items[0]} needs attention, and whether ${location} access fits a standard crew or needs a ladder or lift. Because ${meta.differentiator}, you are matched to the right crew on the first call instead of waiting on a drawn-out proposal. Expect one quick follow-up after the first visit once your real numbers are clear, and know that small schedule tweaks then are normal, not a sign anything was set up wrong.`;
}

const STEP_TITLES = ["Dispatch Call & Intake", "Site & Opening Check", "Secure & Board Up", "Documentation & Handover"];

export function processSteps(page: SeoPage) {
  const meta = serviceMetaFor(serviceKeyFor(page));
  const location = pageLocation(page);
  return [
    {
      title: STEP_TITLES[0],
      text: `Tell us your site type, roughly what is broken or open, and whether you need ${location} service today or on a set schedule. We lock in an arrival window.`,
    },
    {
      title: STEP_TITLES[1],
      text: `We confirm how the crew can reach the opening, where the damage sits, and whether ${meta.painPoint} has been a recurring problem, so the crew arrives with the right plywood, glass or hardware.`,
    },
    {
      title: STEP_TITLES[2],
      text: `The crew handles ${meta.items[0]}, ${meta.items[1]} and ${meta.items[2]} on site, since ${meta.differentiator}.`,
    },
    {
      title: STEP_TITLES[3],
      text: `We log the install, hand you any insurance or security paperwork you need, and set your next visit if you want one. After that, changes are a quick call, not a new setup.`,
    },
  ];
}

export function keyTakeaways(page: SeoPage): string[] {
  const meta = serviceMetaFor(serviceKeyFor(page));
  const location = pageLocation(page);

  if (isCityPage(page)) {
    const city = cityFromTargetArea(page.targetArea);
    return [
      `Whether you need a one-time board-up or a standing dispatch arrangement in ${city}.`,
      `How your ${meta.items[0]} and ${meta.items[1]} should be handled for your site.`,
      `A visit window that works with your access and your hours.`,
      `What it takes to keep ${meta.painPoint} from coming back once you are set up.`,
      `How the install is documented so your insurer or security file stays clean.`,
    ];
  }
  return [
    `Whether this fits you better than a general contractor if you run ${meta.audiences[0]} or ${meta.audiences[1]}.`,
    `How ${meta.items[0]} gets handled, secured, and documented across ${location}.`,
    `Why ${meta.differentiator}, and what that means for a cleaner, longer-lasting fix.`,
    `What usually causes ${meta.painPoint}, and how a proper dispatch keeps it away.`,
    `When it makes sense to move from a one-time call to a recurring security plan.`,
  ];
}

/** Pillar-only deep dive that adds substantive, non-duplicated detail so pillar pages clear an 800-word floor. */
export function pillarDeepDive(page: SeoPage): { heading: string; paragraphs: string[] } | null {
  if (page.pageType !== "Service Pillar") return null;
  const meta = serviceMetaFor(serviceKeyFor(page));
  return {
    heading: "What A Standard Visit Actually Covers",
    paragraphs: [
      `A visit starts with ${meta.items[0]}, then moves to ${meta.items[1]} and ${meta.items[2]}, scaled to your site rather than a generic checklist. If you run ${meta.audiences[0]}, the job looks different than it does for ${meta.audiences[2]}, so what the crew brings and how long they stay reflects the building in front of them, not a flat template.`,
      `${titleCase(meta.differentiator)}. That matters most if you have already dealt with ${meta.painPoint}, because it is usually a scheduling or access problem rather than a one-off fluke. Fixing the routine, not just clearing today's mess, is what tends to keep it solved.`,
      `If you manage more than one location, you can run every site through a single dispatch account, with each address on its own visit frequency instead of one blanket schedule. When your traffic or vacancy changes, adjusting a site is a quick call, not a renegotiated contract, and every visit is logged so your records stay clean for inspectors, insurers, or head office.`,
      `You usually get a crew on site the same week you call, since teams already run routes through most regions we cover. When a spike, a storm, or a break-in wave hits, we can absorb it without reworking your whole account, because ${meta.synonym} is built to flex around your site rather than lock you into a fixed cadence for the year.`,
    ],
  };
}

export function faqsFor(page: SeoPage) {
  const meta = serviceMetaFor(serviceKeyFor(page));
  const location = pageLocation(page);

  if (isCityPage(page)) {
    const city = cityFromTargetArea(page.targetArea);
    const facts = CITY_FACTS[city] || CITY_FACTS["Toronto"];
    const seed = `${city}:${serviceFamily(page)}`;
    const first = pick(
      [
        {
          q: `What should I have ready before I call?`,
          a: `Have a rough idea of what is broken or open, where the crew can park or set a ladder, and whether you are near ${facts.neighbourhood} or elsewhere in ${city}. That is enough for us to give you a first quote.`,
        },
        {
          q: `What do I need to know before my first visit?`,
          a: `Roughly what is damaged, how the crew can reach the opening, and whether you are near ${facts.neighbourhood} or elsewhere in ${city}. That is enough for us to quote the job.`,
        },
      ],
      seed,
      "faq1",
    );
    const second = pick(
      [
        {
          q: `Can you handle more than one site?`,
          a: `Yes. Multi-site accounts across ${location} are common, and we schedule each address on its own frequency instead of forcing every location onto the same route.`,
        },
        {
          q: `Do you cover multiple locations on one account?`,
          a: `Yes. We run multi-site accounts across ${location}, scheduling each address on its own frequency rather than one blanket route.`,
        },
      ],
      seed,
      "faq2",
    );
    const third = pick(
      [
        {
          q: `Do the seasons affect scheduling here?`,
          a: `They can. ${facts.climate}, so storm and thaw seasons fill up fast in ${city}. Calling early keeps you near the front of the line.`,
        },
        {
          q: `When does dispatch fill up in ${city}?`,
          a: `Storm and thaw seasons are the busy ones. Given ${facts.climate}, calling early in ${city} keeps you near the front of the line.`,
        },
      ],
      seed,
      "faq3",
    );
    return [first, second, third];
  }

  if (isEmergencyPage(page)) {
    return [
      {
        q: `How fast can a crew reach me?`,
        a: `Across ${location}, dispatch runs 24/7 and can usually give you a real arrival window on the first call. From there, ${meta.synonym} starts the same day in most regions.`,
      },
      {
        q: `What happens on the first emergency visit?`,
        a: `We secure the opening, protect the interior, and log the install. Because ${meta.differentiator}, the emergency response is built to leave your property properly closed, not just covered.`,
      },
      {
        q: `Will you deal with my insurance?`,
        a: `Yes. We document every step and coordinate with your adjuster, so ${meta.painPoint.toLowerCase()} is handled once and the paperwork does not become a second headache.`,
      },
    ];
  }

  return [
    {
      q: `Should I start with a service or my city?`,
      a: `If you want the full picture of how a board-up or glass visit works, start with the service page. If you already know your location and just need a crew out, jump straight to your city.`,
    },
    {
      q: `Do you cover emergencies?`,
      a: `Yes. The emergency pages cover same-day and after-hours board-up, glass and door response. Call and we will give you a real arrival window.`,
    },
    {
      q: `Can I just call instead of picking a page?`,
      a: `Yes. Call us, tell us your site type and what is broken, and we will point you to the right service and get a crew moving.`,
    },
  ];
}
