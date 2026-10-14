"use client";

// ===== Independent logo and detached navigation =====
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { skyISite } from "@/config/site";
import { enquiryEmailHref } from "@/config/enquiry";
import { useSkyIMotion } from "./SkyIProvider";
import { useClientReady } from "@/hooks/useClientReady";
import styles from "./SkyINavigation.module.css";

import { SocialRail } from "../ui/social-rail";

const items: { id: string; label: string; pending?: boolean }[] = [
  { id: "about", label: "About" }, { id: "services", label: "Services" },
  { id: "industries", label: "Sectors" }, { id: "safety", label: "Safety" },
  { id: "contact", label: "Contact" },
];

export function SkyINavigation({ sisterUrl }: { sisterUrl: string }) {
  const { paused, menuOpen, setMenuOpen } = useSkyIMotion();
  const ready = useClientReady();
  const [active, setActive] = useState("opening");
  const [compact, setCompact] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [pastHero, setPastHero] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  // ===== Current section indicator =====
  useEffect(() => {
    const main = document.getElementById("skyi-main");
    const sections = Array.from(main?.querySelectorAll<HTMLElement>("section[id]") ?? []);
    const footer = document.getElementById("skyi-footer");
    const contact = document.getElementById("contact");
    if (footer) sections.push(footer);
    let frame = 0;
    let current = "";
    const update = () => {
      frame = 0;
      setCompact(window.scrollY > 180);
      const hero = document.getElementById("opening");
      const camera = hero?.closest<HTMLElement>("[data-skyi-parallax]");
      // A held hero is a backdrop; navigation follows its natural boundary.
      const heroBottom = camera && hero ? camera.getBoundingClientRect().top + hero.offsetHeight : hero?.getBoundingClientRect().bottom ?? 0;
      setHeroVisible(heroBottom > Math.min(innerHeight * .2, 180));
      setPastHero(heroBottom <= 0);
      // Keep the floating return clear of enquiry controls at either boundary.
      const contactBounds = contact?.getBoundingClientRect();
      setContactVisible(!!contactBounds && contactBounds.top < innerHeight && contactBounds.bottom > 0);
      const line = Math.min(innerHeight * .28, 220);
      let next = "opening";
      for (const section of sections) {
        if (section.getBoundingClientRect().top > line) break;
        next = section.id;
      }
      // A compact footer can sit below the reading line at the end of the page.
      if (footer && Math.ceil(window.scrollY + innerHeight) >= document.documentElement.scrollHeight - 2) next = footer.id;
      if (next !== current) { current = next; setActive(next); }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    // Include the hero and recompute from geometry in either scroll direction.
    const resize = new ResizeObserver(schedule);
    if (main) resize.observe(main);
    if (footer) resize.observe(footer);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame); resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
    };
  }, []);

  // ===== Focus trap, page isolation and reversible scroll lock =====
  useEffect(() => {
    if (!menuOpen || !dialog.current) return;
    const panel = dialog.current;
    const targets = () => Array.from(panel.querySelectorAll<HTMLElement>('a[href],button:not([disabled])'));
    const previous = document.activeElement as HTMLElement | null;
    const opener = button.current;
    const oldOverflow = document.body.style.overflow;
    const content = document.getElementById("skyi-main");
    const footer = document.getElementById("skyi-footer");
    const nav = document.getElementById("skyi-desktop-nav");
    const socialRail = document.getElementById("skyi-social-rail");
    const sisterLogo = document.getElementById("skyi-sister-logo");
    const isolated = [content, footer, nav, socialRail, sisterLogo].filter((node): node is HTMLElement => !!node);
    isolated.forEach(node => { node.inert = true; });
    document.body.style.overflow = "hidden";
    targets()[0]?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setMenuOpen(false); }
      if (event.key !== "Tab") return;
      const controls = targets();
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const media = matchMedia("(min-width: 1024px)");
    const closeDesktop = () => { if (media.matches) setMenuOpen(false); };
    document.addEventListener("keydown", key);
    media.addEventListener("change", closeDesktop);
    return () => {
      document.body.style.overflow = oldOverflow;
      isolated.forEach(node => { node.inert = false; });
      document.removeEventListener("keydown", key);
      media.removeEventListener("change", closeDesktop);
      (previous?.isConnected ? previous : opener)?.focus();
    };
  }, [menuOpen, setMenuOpen]);

  return <>
    <header className={styles.header} data-compact={compact} data-section={active} data-hero-visible={heroVisible}>
    <Link href="/" className={styles.logo} data-skyi-logo data-hero-enter="down" tabIndex={heroVisible ? undefined : -1} aria-hidden={!heroVisible || undefined} aria-label="Sky I — company selection"><Image src="/images/sky-i-logo-20261005.png" alt="Sky I" width={1254} height={1254} sizes="(max-width:1023px) 54px, 64px" priority /></Link>
    <nav id="skyi-desktop-nav" aria-label="Sky I" className={`${styles.nav} ${ready ? styles.enhancedNav : ""}`} data-section={active}>
      {items.map((item, index) => item.pending ? <span key={item.id} className={styles.pending} aria-disabled="true" title={`${item.label} — coming soon`} data-hero-enter="down" data-hero-delay={index * 55}>{item.label}</span> : <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} data-hero-enter="down" data-hero-delay={index * 55}>
        {item.label}{active === item.id && <motion.span className={styles.indicator} layoutId="skyi-nav-indicator" transition={{ duration: paused ? 0 : 0.3 }} />}
      </a>)}
    </nav>
    <a id="skyi-sister-logo" data-hero-enter="right" data-hero-delay="260" href={sisterUrl} className={styles.sisterLogo} aria-label="Skyriders — rope access specialists" title="Skyriders (ropeaccess.co.za)">
      <Image src="/images/sky-logo.png" alt="Skyriders" width={1500} height={1250} sizes="(max-width:1023px) 68px, 86px" priority />
    </a>
    {ready && <button data-hero-enter="right" ref={button} className={styles.menuButton} aria-expanded={menuOpen} aria-controls="skyi-menu" onClick={() => setMenuOpen(!menuOpen)}>Menu<span aria-hidden="true">☰</span></button>}
    </header>
    <SocialRail id="skyi-social-rail" className={styles.socialRail} />
    {ready && pastHero && !contactVisible && active !== "skyi-footer" && !menuOpen && <a href="#opening" className={styles.backToTop} aria-label="Back to top" onClick={() => document.getElementById("opening")?.focus({ preventScroll: true })}><span>Back to top</span><ArrowUp size={18} aria-hidden="true" /></a>}
    <AnimatePresence>
      {menuOpen && <motion.div id="skyi-menu" ref={dialog} role="dialog" aria-modal="true" aria-label="Sky I navigation" className={styles.menu}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: paused ? 0 : 0.2 }}>
        <button className={styles.close} onClick={() => setMenuOpen(false)}>Close<span aria-hidden="true">×</span></button>
        <nav aria-label="Sky I mobile">
          {items.map((item, index) => item.pending ? <span key={item.id} className={styles.pending} aria-disabled="true" title={`${item.label} — coming soon`}>{item.label}</span> : <motion.a key={item.id} href={`#${item.id}`} onClick={() => { setMenuOpen(false); setTimeout(() => document.getElementById(item.id)?.focus({ preventScroll: true }), 250); }}
            initial={{ opacity: 0, x: paused ? 0 : index % 2 ? 45 : -45 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: paused ? 0 : 0.5, delay: paused ? 0 : index * 0.07 }}>
            {item.label}<span aria-hidden="true">↗</span>
          </motion.a>)}
        </nav>
        <div className={styles.menuBottom}>
          <p>Sky I inspects.<br />Skyriders does the work.</p>
          {skyISite.email && <a href={enquiryEmailHref} aria-label="Email both the information and reception teams">{skyISite.email}</a>}
          {skyISite.phone && <a href={`tel:${skyISite.phone}`}>{skyISite.phone}</a>}
          <a href={sisterUrl}>Skyriders, our rope access sister company ↗</a>
          <SocialRail className={styles.menuSocialRail} />
        </div>
      </motion.div>}
    </AnimatePresence>
  </>;
}
