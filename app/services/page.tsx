import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SERVICES_HERO, pillarCardImage } from "@/lib/images";
import {
  EMERGENCY_PAGES,
  PHONE_DISPLAY,
  PHONE_E164,
  SEO_PAGES,
  SERVICE_PAGES,
  SERVICE_PILLARS,
  SITE_NAME,
  SUPPORT_PAGES,
  absoluteUrl,
  anchorText,
  indexLabel,
  linkLabel,
  pageListLabel,
  pillarTagline,
  toPath,
  uniqueCityPages,
} from "@/lib/site-data";
import { breadcrumbSchema } from "@/lib/schema";

const serviceFaqs = [
  {
    q: "Should I start with a service or my city?",
    a: "If you want the full picture of how a board-up or glass visit works, start with the service page. If you already know your location and just need a crew out, jump straight to your city.",
  },
  {
    q: "Do you cover emergencies?",
    a: "Yes. The emergency pages cover same-day and after-hours board-up, glass, door and vandalism response. Call and we will give you a real arrival window.",
  },
  {
    q: "Can I just call instead of picking a page?",
    a: "Yes. Call us, tell us your site type and what is broken, and we will point you to the right service and get a crew moving.",
  },
];

export const metadata: Metadata = {
  title: `${SITE_NAME} Services`,
  description:
    "Browse board-up, window and door boarding, glass repair, graffiti removal, emergency response, and city coverage in one place.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${SITE_NAME} Services`,
    description: "Browse board-up, glass, graffiti removal, emergency response, and city coverage for BoardUpDispatch.",
    url: absoluteUrl("/services"),
  },
};

export default function ServicesPage() {
  return (
    <main className="bud-main bud-page">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: serviceFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          },
        ]}
      />
      <section className="bud-page-head">
        <div className="bud-wrap bud-split">
          <div>
            <p className="bud-kicker">
              <span className="bud-blink" aria-hidden="true" />
              // EVERY SERVICE IN ONE PLACE
            </p>
            <h1>Services</h1>
            <p>
              Find exactly what you need in one place. Whether it is a shattered window, a kicked-in door, a broken
              storefront pane, or a fresh tag on your facade, start with the service that fits and drill down to your
              city. If you would rather skip the browsing, call and we will get you to the right crew.
            </p>
            <div className="bud-actions">
              <a className="bud-call bud-call-large" href={`tel:${PHONE_E164}`}>
                Call {PHONE_DISPLAY}
              </a>
              <Link className="bud-secondary" href="/">
                Back to Home
              </Link>
            </div>
          </div>
          <div className="bud-page-media">
            <Image
              src={SERVICES_HERO.image.src}
              alt={SERVICES_HERO.alt}
              width={SERVICES_HERO.image.width}
              height={SERVICES_HERO.image.height}
              priority
              sizes="(max-width: 1020px) 100vw, 46vw"
            />
          </div>
        </div>
      </section>

      <section className="bud-section">
        <div className="bud-wrap">
          <p className="bud-eyebrow">// ALL NATIONAL SERVICES</p>
          <h2>Board-Up, Glass &amp; Vandalism Services</h2>
          <div className="bud-grid bud-grid-3">
            {SERVICE_PILLARS.map((page, index) => {
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
          <p className="bud-eyebrow">// EMERGENCY & SAME-DAY</p>
          <h2>24/7 Dispatch Lines</h2>
          <div className="bud-chip-grid">
            {EMERGENCY_PAGES.map((page) => (
              <Link className="bud-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                {anchorText(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bud-section">
        <div className="bud-wrap">
          <h2>Near Me Pages</h2>
          <div className="bud-chip-grid">
            {SERVICE_PAGES.map((page) => (
              <Link className="bud-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                {pageListLabel(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bud-section bud-section-line">
        <div className="bud-wrap">
          <p className="bud-eyebrow">// LOCAL CREWS</p>
          <h2>Local Pages</h2>
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
          <h2>More Pages</h2>
          <div className="bud-chip-grid">
            {SUPPORT_PAGES.map((page) => (
              <Link className="bud-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                {pageListLabel(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bud-section bud-section-line">
        <div className="bud-wrap">
          <h2>Browse All</h2>
          <div className="bud-index-list">
            {SEO_PAGES.map((page) => (
              <Link href={toPath(page.pageSlug)} key={page.pageSlug} aria-label={pageListLabel(page)}>
                {indexLabel(page)}
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
            {serviceFaqs.map((faq, index) => (
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
