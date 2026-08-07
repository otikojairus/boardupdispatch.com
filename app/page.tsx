import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { HOME_HERO, pillarCardImage } from "@/lib/images";
import {
  EMERGENCY_PAGES,
  PHONE_DISPLAY,
  PHONE_E164,
  SERVICE_PAGES,
  SERVICE_PILLARS,
  SITE_NAME,
  SeoPage,
  absoluteUrl,
  anchorText,
  linkLabel,
  pageListLabel,
  pillarTagline,
  toPath,
  uniqueCityPages,
} from "@/lib/site-data";
import { breadcrumbSchema } from "@/lib/schema";

const homeFaqs = [
  {
    q: "Do you work with a site like mine?",
    a: "If you run a storefront, a restaurant, a bank, an office, a plaza, or a condo entrance, yes. You get a crew matched to your door, your glass, and your exposure to break-ins and storm damage.",
  },
  {
    q: "How do I know which service I need?",
    a: "Tell us what is broken, open, or tagged. If you know your city, start there; if not, describe the site and we will point you to the right service and quote it.",
  },
  {
    q: "Can I just call before I figure it all out?",
    a: "Yes. Call us, describe your site, what is damaged, and how soon you need a crew. We take it from there and give you a real arrival window.",
  },
];

// Curated core services shown as cards on the homepage + services page.
const CORE_SLUGS = [
  "/board-up-company-contractor-canada",
  "/window-boarding-services",
  "/door-boarding-services",
  "/fire-damage-board-up-service",
  "/commercial-glass-repair-services",
  "/graffiti-removal-services",
];

const CORE_PILLARS = CORE_SLUGS.map((slug) => SERVICE_PILLARS.find((p) => p.pageSlug === slug)).filter(
  (p): p is SeoPage => Boolean(p),
);

export const metadata: Metadata = {
  title: `${SITE_NAME} | 24/7 Board-Up, Glass & Graffiti Dispatch`,
  description:
    "Emergency board-up, window and door boarding, commercial glass repair and graffiti removal across Canada. 24/7 dispatch with insurance documentation on every install.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} | Board-Up, Glass & Graffiti Dispatch`,
    description: "24/7 emergency board-up, glass and vandalism response across Canada. Secured fast, documented for your claim.",
    url: absoluteUrl("/"),
    type: "website",
    siteName: SITE_NAME,
  },
};

export default function HomePage() {
  return (
    <main className="bud-main">
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: homeFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          },
        ]}
      />

      <section className="bud-hero">
        <div className="bud-hero-grid" aria-hidden="true" />
        <div className="bud-wrap bud-hero-content">
          <div className="bud-hero-copy">
            <p className="bud-kicker">
              <span className="bud-blink" aria-hidden="true" />
              // 24/7 DISPATCH · COAST TO COAST
            </p>
            <h1>Broken, Open or Tagged? Secured Fast — and Documented for Your Claim.</h1>
            <p className="bud-hero-lede">
              Board-up, glass repair and graffiti removal, dispatched by crews who measure, cut and fasten a real
              barrier. Tell us what is broken and where the crew can park, and a technician shows up sized for the job —
              with the site secured and the paperwork handled before we leave.
            </p>
            <div className="bud-actions">
              <a className="bud-call bud-call-large" href={`tel:${PHONE_E164}`}>
                Call {PHONE_DISPLAY}
              </a>
              <Link className="bud-secondary" href="/services">
                Browse Services
              </Link>
            </div>
            <ul className="bud-hero-status" aria-label="Dispatch status">
              <li>Dispatch: LIVE</li>
              <li>ETA: On call</li>
              <li>Plywood: In stock</li>
            </ul>
          </div>

          <div className="bud-hero-console">
            <div className="bud-console-frame">
              <Image
                src={HOME_HERO.image.src}
                alt={HOME_HERO.alt}
                width={HOME_HERO.image.width}
                height={HOME_HERO.image.height}
                priority
                sizes="(max-width: 1020px) 100vw, 46vw"
              />
              <div className="bud-console-live" aria-hidden="true">
                <span className="bud-blink" />
                LIVE
              </div>
            </div>
            <div className="bud-ticket" aria-hidden="true">
              <div className="bud-ticket-head">
                <span>DISPATCH TICKET #BD-1847</span>
                <b>SECURED</b>
              </div>
              <div className="bud-ticket-row">
                <span>Site</span>
                <em>Storefront · 2 storeys</em>
              </div>
              <div className="bud-ticket-row">
                <span>Openings</span>
                <em>1 window · 1 door</em>
              </div>
              <div className="bud-ticket-row">
                <span>Barrier</span>
                <div className="bud-meter">
                  <i style={{ width: "100%" }} />
                </div>
                <b>100%</b>
              </div>
              <p className="bud-ticket-note">Install logged · insurance file ready.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bud-strip" aria-label="Dispatch guarantee">
        <div className="bud-wrap bud-strip-inner">
          <span>24/7 dispatch</span>
          <span>Insurance documentation</span>
          <span>Real plywood barriers</span>
          <span>Same-night response</span>
        </div>
      </div>

      <section className="bud-section">
        <div className="bud-wrap bud-split">
          <div>
            <p className="bud-eyebrow">// THE PROBLEM</p>
            <h2>A Broken Opening Is a Loss Waiting to Happen</h2>
          </div>
          <p>
            A shattered window, a kicked-in door, or a tagged storefront is more than an eyesore — it is an open
            invitation and a growing insurance claim. We dispatch a crew to measure, cut, fasten and log a proper
            barrier the same night, then schedule the real glass or door repair before your stock, your lease or your
            adjuster pays the price.
          </p>
        </div>
      </section>

      <section className="bud-section bud-section-line">
        <div className="bud-wrap">
          <p className="bud-eyebrow">// CORE DISPATCH SERVICES</p>
          <h2>Secured Fast, Repaired Right</h2>
          <div className="bud-grid bud-grid-3">
            {CORE_PILLARS.map((page, index) => {
              const card = pillarCardImage(page.pageSlug);
              return (
                <Link className="bud-media-card" href={toPath(page.pageSlug)} key={page.pageSlug}>
                  <div className="bud-media-card-thumb">
                    <Image
                      src={card.image.src}
                      alt={card.alt}
                      width={card.image.width}
                      height={card.image.height}
                      loading="lazy"
                      sizes="(max-width: 1020px) 100vw, 33vw"
                    />
                    <span className="bud-media-card-num">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="bud-media-card-body">
                    <span className="bud-media-card-tag">{pageListLabel(page)}</span>
                    <p>{pillarTagline(page)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bud-section bud-section-dark">
        <div className="bud-wrap">
          <div className="bud-alert">
            <div>
              <strong>Opening is broken right now?</strong>
              <p>We keep crews on the overnight line for board-up, glass and door emergencies.</p>
            </div>
            <a className="bud-call" href={`tel:${PHONE_E164}`}>
              Emergency Line
            </a>
          </div>
        </div>
      </section>

      <section className="bud-section">
        <div className="bud-wrap">
          <p className="bud-eyebrow">// EMERGENCY & NEAR-ME</p>
          <h2>Fast Response &amp; Local Coverage</h2>
          <div className="bud-chip-grid">
            {[...EMERGENCY_PAGES, ...SERVICE_PAGES].map((page) => (
              <Link className="bud-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                {anchorText(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bud-section bud-section-line">
        <div className="bud-wrap">
          <p className="bud-eyebrow">// FIND YOUR CITY</p>
          <h2>Local Dispatch Crews</h2>
          <div className="bud-city-grid">
            {uniqueCityPages().map((page) => (
              <Link className="bud-city-tile" href={toPath(page.pageSlug)} key={page.pageSlug}>
                <span>{linkLabel(page)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bud-section">
        <div className="bud-wrap">
          <p className="bud-eyebrow">// COMMON QUESTIONS</p>
          <h2>Before You Call</h2>
          <div className="bud-faq-grid">
            {homeFaqs.map((faq, index) => (
              <article className="bud-card" key={faq.q}>
                <span className="bud-card-num">Q{index + 1}</span>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
