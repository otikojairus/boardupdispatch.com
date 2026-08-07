"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  PHONE_DISPLAY,
  PHONE_E164,
  SERVICE_PILLARS,
  SITE_NAME,
  SeoPage,
  serviceShortLabel,
  toPath,
} from "@/lib/site-data";

// Curated subset of national services shown in the main navigation.
const NAV_SLUGS = [
  "/board-up-company-contractor-canada",
  "/window-boarding-services",
  "/door-boarding-services",
  "/commercial-glass-repair-services",
  "/graffiti-removal-services",
];

function navLabel(page: SeoPage) {
  switch (page.pageSlug) {
    case "/board-up-company-contractor-canada":
      return "Board-Up";
    case "/window-boarding-services":
      return "Window Boarding";
    case "/door-boarding-services":
      return "Door Boarding";
    case "/commercial-glass-repair-services":
      return "Glass Repair";
    case "/graffiti-removal-services":
      return "Graffiti Removal";
    default:
      return "Services";
  }
}

const NAV_PILLARS = NAV_SLUGS.map((slug) => SERVICE_PILLARS.find((p) => p.pageSlug === slug)).filter(
  (p): p is SeoPage => Boolean(p),
);

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [showCall, setShowCall] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowCall(window.matchMedia("(max-width: 900px)").matches && window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="bud-header">
        <div className="bud-wrap bud-nav">
          <Link href="/" className="bud-brand" aria-label={SITE_NAME} onClick={() => setOpen(false)}>
            <Image src="/logo.svg" alt="BoardUpDispatch logo" width={40} height={40} priority />
            <span className="bud-brand-name">
              <span>BoardUp</span>
              <em>Dispatch</em>
            </span>
          </Link>
          <nav className="bud-links" aria-label="Primary navigation">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            {NAV_PILLARS.map((page) => (
              <Link key={page.pageSlug} href={toPath(page.pageSlug)}>
                {navLabel(page)}
              </Link>
            ))}
          </nav>
          <a className="bud-call bud-call-desktop" href={`tel:${PHONE_E164}`}>
            Call {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            className="bud-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className={`bud-drawer ${open ? "bud-drawer-open" : ""}`} aria-hidden={!open}>
        <button className="bud-drawer-shade" type="button" aria-label="Close menu" onClick={() => setOpen(false)} />
        <aside className="bud-drawer-panel">
          <nav className="bud-drawer-links" aria-label="Mobile navigation">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/services" onClick={() => setOpen(false)}>
              Services
            </Link>
            {SERVICE_PILLARS.map((page) => (
              <Link key={page.pageSlug} href={toPath(page.pageSlug)} onClick={() => setOpen(false)}>
                {serviceShortLabel(page)}
              </Link>
            ))}
          </nav>
        </aside>
      </div>

      <div className={`bud-mobile-call ${showCall && !open ? "bud-mobile-call-show" : ""}`}>
        <a className="bud-call" href={`tel:${PHONE_E164}`}>
          Call {PHONE_DISPLAY} — 24/7 Dispatch
        </a>
      </div>
    </>
  );
}
