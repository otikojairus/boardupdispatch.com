// Concrete, service-specific detail used to generate genuinely different copy per
// service family instead of dropping one keyword into an otherwise identical template.
// Everything here reads like a dispatch crew explaining the work to a property owner
// or a storefront manager, not like keyword filler.
export type ServiceMeta = {
  audiences: string[];
  items: string[];
  differentiator: string;
  painPoint: string;
  synonym: string;
};

export const SERVICE_META: Record<string, ServiceMeta> = {
  "/board-up-company-contractor-canada": {
    audiences: ["storefront owners", "property managers and landlords", "strata and condo councils", "insurance and security contacts"],
    items: ["measuring and cutting the plywood barrier", "securing windows, doors and glass openings", "logging the install for your insurance file"],
    differentiator: "we measure, cut and fasten a proper barrier on site and document it, so the opening is truly secure and your claim has the photos it needs",
    painPoint: "a broken door or window leaving your property open to the street",
    synonym: "the board-up service",
  },
  "/graffiti-removal-services": {
    audiences: ["retail storefronts", "banks and ATMs", "transit stops and municipal buildings", "apartment and condo entrances"],
    items: ["fresh paint and tagging", "staining and etch marks", "a protective coating afterwards"],
    differentiator: "we test the surface first and use the right chemistry so tags lift without etching the substrate",
    painPoint: "a tagged storefront that makes your property look neglected",
    synonym: "the graffiti removal",
  },
  "/commercial-glass-repair-services": {
    audiences: ["retail storefronts", "restaurants and cafés", "banks and credit unions", "office and medical buildings"],
    items: ["the shattered pane and frame", "the glazing bead and seal", "the laminated or tempered unit"],
    differentiator: "we match the glass type and finish the install so it clears inspection the first time",
    painPoint: "a broken or crazed storefront window",
    synonym: "the commercial glass repair",
  },
  "/window-boarding-services": {
    audiences: ["storefront owners", "property managers", "landlords", "security and insurance contacts"],
    items: ["the broken window frame", "the plywood barrier and fasteners", "the sealed edge against weather"],
    differentiator: "we cut, fit and fasten the board so it seals the opening and reads as deliberate, not temporary chaos",
    painPoint: "a shattered window that has to stay open overnight",
    synonym: "the window boarding",
  },
  "/emergency-commercial-door-repair": {
    audiences: ["retail storefronts", "restaurants and cafés", "offices and pharmacies", "warehouse and garage operators"],
    items: ["a door that will not close or lock", "a sprung or damaged frame", "a roll-up or overhead door that is stuck"],
    differentiator: "we roll a technician the same night so your door is closed, locked and functional before you leave",
    painPoint: "a door stuck open with your site unsecured right now",
    synonym: "the emergency door fix",
  },
  "/door-boarding-services": {
    audiences: ["retail storefronts", "apartment and condo entrances", "commercial building owners", "landlords"],
    items: ["the damaged door leaf", "the frame and locking hardware", "a temporary barrier that still allows access"],
    differentiator: "we secure the doorway so the site stays accessible to your crew while it is sealed to everyone else",
    painPoint: "a broken or kicked-in door that will not stay closed",
    synonym: "the door boarding",
  },
  "/plywood-boarding-services": {
    audiences: ["storefront owners", "property managers", "landlords", "insurance and security contacts"],
    items: ["the correct plywood grade and thickness", "the cut, fit and edge seal", "the fastening pattern and documentation"],
    differentiator: "we size and fasten the plywood to the actual opening and log it, so it holds until the real repair happens",
    painPoint: "a temporary fix that flaps in the wind or lets water in",
    synonym: "the plywood boarding",
  },
  "/break-in-board-up-service": {
    audiences: ["retail storefronts", "restaurants and bars", "pharmacies and banks", "landlords of commercial units"],
    items: ["the forced door or window", "the damage left by the break-in", "the temporary secure barrier"],
    differentiator: "we get the site secured fast after a break-in, then document everything so the loss report and claim line up",
    painPoint: "a break-in that has left your door or window open to the street",
    synonym: "the break-in board-up",
  },
  "/fire-damage-board-up-service": {
    audiences: ["homeowners after a fire", "landlords of rental properties", "commercial building owners", "insurance adjusters"],
    items: ["the openings cut by fire crews", "smoke and water-damaged windows and doors", "the temporary barrier and tarp"],
    differentiator: "we secure fire-damaged openings the same day so the property is protected while the claim is sorted",
    painPoint: "a fire that has left your building open and exposed",
    synonym: "the fire damage board-up",
  },
  "/storm-damage-board-up-service": {
    audiences: ["homeowners after a storm", "storefront owners", "property managers", "insurance contacts"],
    items: ["wind and hail-damaged glass", "fallen or damaged doors", "the temporary barrier before the repair"],
    differentiator: "we roll after storms with enough plywood and crews to cover a street of openings, not just one",
    painPoint: "a storm that has left windows or doors broken across your property",
    synonym: "the storm damage board-up",
  },
  "/vandalism-board-up-graffiti-removal": {
    audiences: ["retail storefronts", "banks and ATMs", "transit and municipal buildings", "apartment and condo entrances"],
    items: ["the broken glass or door", "the tag and paint damage", "the board-up and cleanup as one visit"],
    differentiator: "we handle the board-up and the cleanup in one dispatch, so your property is secure and clean in a single visit",
    painPoint: "vandalism that leaves your property both damaged and tagged",
    synonym: "the vandalism response",
  },
  "/commercial-property-board-up": {
    audiences: ["commercial building owners", "property managers", "facility teams", "insurance and security contacts"],
    items: ["all broken openings across the building", "consistent, tidy barriers", "a documented site log"],
    differentiator: "we secure the whole site on one ticket, with consistent boarding and a log your facility team can hand to insurance",
    painPoint: "multiple broken openings with no single contractor accountable",
    synonym: "the commercial board-up",
  },
  "/retail-storefront-board-up": {
    audiences: ["retail storefront owners", "restaurant operators", "plaza and mall management", "landlords"],
    items: ["the storefront glass opening", "the entrance door", "a barrier that protects the display and the stock"],
    differentiator: "we board up to protect the merchandise and the lease, so the storefront stays presentable while it is secured",
    painPoint: "a smashed storefront that kills foot traffic until it is fixed",
    synonym: "the retail board-up",
  },
  "/emergency-glass-window-repair": {
    audiences: ["storefront owners", "homeowners", "property managers", "insurance contacts"],
    items: ["the shattered pane", "the frame and seal", "the replacement glass install"],
    differentiator: "we secure the opening first and install the replacement pane so you are back in business fast",
    painPoint: "a broken window leaving your home or store open to the street",
    synonym: "the emergency glass response",
  },
  "/storefront-glass-repair": {
    audiences: ["retail storefronts", "restaurants and cafés", "banks and credit unions", "office and medical buildings"],
    items: ["the shattered storefront pane", "the glazing and frame", "the finished install"],
    differentiator: "we match the storefront glass type and finish the install so it clears inspection the first time",
    painPoint: "a broken storefront window that has to stay boarded until it is replaced",
    synonym: "the storefront glass repair",
  },
  "/24-hour-glass-repair": {
    audiences: ["storefront owners", "property managers", "landlords", "security and insurance contacts"],
    items: ["the broken pane", "the secured opening", "the replacement install"],
    differentiator: "we keep a glass crew on the overnight line so a broken window is repaired, not just taped, around the clock",
    painPoint: "a broken window at a time when every other glass shop is closed",
    synonym: "the 24-hour glass repair",
  },
  "/emergency-board-up-services-canada": {
    audiences: ["storefront owners", "property managers", "landlords", "insurance and security contacts"],
    items: ["a broken door or window", "the frame damage around it", "the temporary barrier"],
    differentiator: "we measure, cut and fasten a proper barrier and log it for your insurance, any hour of the day",
    painPoint: "a break-in or storm leaving your property open to the street",
    synonym: "the emergency board-up",
  },
  "/24-hour-board-up-service": {
    audiences: ["storefront owners", "property managers", "landlords", "security teams"],
    items: ["the broken opening", "the plywood barrier", "the sealed, locked result"],
    differentiator: "we run a true 24-hour line, so a broken window is secured at 2 a.m. the same way it would be at 2 p.m.",
    painPoint: "a broken opening at an hour when nothing else is open",
    synonym: "the 24-hour board-up",
  },
  "/same-day-board-up-service": {
    audiences: ["storefront owners", "property managers", "landlords", "insurance contacts"],
    items: ["the damaged opening", "the same-day barrier", "the documentation for the claim"],
    differentiator: "we schedule same-day crews so the opening is closed before the day is over, not tomorrow morning",
    painPoint: "a broken window you cannot leave unsecured overnight",
    synonym: "the same-day board-up",
  },
  "/overnight-board-up-service": {
    audiences: ["storefront owners", "property managers", "landlords", "security teams"],
    items: ["the broken opening", "the overnight barrier", "the morning handover"],
    differentiator: "we cover the gap between close of business and the repair shop opening, so the property is never left open",
    painPoint: "a broken window between close and the next business day",
    synonym: "the overnight board-up",
  },
  "/temporary-board-up-service": {
    audiences: ["storefront owners", "property managers", "landlords", "insurance contacts"],
    items: ["the damaged opening", "the temporary plywood barrier", "the plan for the permanent repair"],
    differentiator: "we install a clean, water-tight temporary barrier that holds until the real glazing or door repair is scheduled",
    painPoint: "a patch that leaks, flaps or looks abandoned for weeks",
    synonym: "the temporary board-up",
  },
};

const FALLBACK_META: ServiceMeta = SERVICE_META["/board-up-company-contractor-canada"];

export function serviceMetaFor(key: string): ServiceMeta {
  return SERVICE_META[key] || FALLBACK_META;
}

export function hashIndex(value: string, mod: number) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash % mod;
}
