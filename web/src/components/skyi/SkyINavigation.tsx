"use client";

// ===== Independent logo and detached navigation =====
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { skyISite } from "@/config/site";
import { useSkyIMotion } from "./SkyIProvider";
import { useClientReady } from "@/hooks/useClientReady";
import styles from "./SkyI.module.css";
import { ScrambleText } from "../ui/scramble-text";

const items = [
  { id: "about", label: "About" }, { id: "services", label: "Services" },
  { id: "industries", label: "Sectors" }, { id: "safety", label: "Safety" },
  { id: "projects", label: "Projects" }, { id: "contact", label: "Contact" },
];

export function SkyINavigation({ sisterUrl }: { sisterUrl: string }) {
  const { paused, menuOpen, setMenuOpen } = useSkyIMotion();
  const ready = useClientReady();
  const [active, setActive] = useState("opening");
  const dialog = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  // ===== Current section indicator =====
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-15% 0px -55% 0px" });
    items.forEach(item => { const node = document.getElementById(item.id); if (node) observer.observe(node); });
    return () => observer.disconnect();
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
    const edge = document.getElementById("skyi-edge");
    const sisterLogo = document.getElementById("skyi-sister-logo");
    const isolated = [content, footer, nav, edge, sisterLogo].filter((node): node is HTMLElement => !!node);
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
    const media = matchMedia("(min-width: 1280px)");
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
    <Link href="/" className={styles.logo} data-skyi-logo aria-label="Sky I — company selection"><Image src="/images/sky-i-logo-20261005.png" alt="Sky I" width={1254} height={1254} priority data-hero-motion="top" data-hero-duration="1200" /></Link>
    <nav id="skyi-desktop-nav" aria-label="Sky I" className={`${styles.nav} ${ready ? styles.enhancedNav : ""}`} data-hero-motion="right" data-hero-duration="950">
      {items.map((item, index) => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} data-scramble-trigger data-hero-motion={index % 2 ? "bottom" : "top"} data-hero-delay={100 + index * 60}>
        <ScrambleText text={item.label} />{active === item.id && <motion.span className={styles.indicator} layoutId="skyi-nav-indicator" transition={{ duration: paused ? 0 : 0.3 }} />}
      </a>)}
    </nav>
    <a id="skyi-sister-logo" href="https://ropeaccess.co.za/" className={styles.sisterLogo} aria-label="Skyriders — rope access specialists" title="Skyriders (ropeaccess.co.za)" data-hero-motion="right" data-hero-duration="1000">
      <Image src="/images/sky-logo.png" alt="Skyriders" width={1500} height={1250} priority />
    </a>
    {ready && <button ref={button} className={styles.menuButton} aria-expanded={menuOpen} aria-controls="skyi-menu" onClick={() => setMenuOpen(!menuOpen)} data-scramble-trigger data-hero-motion="right" data-hero-delay="150"><ScrambleText text="Menu" /><span aria-hidden="true">☰</span></button>}
    <a id="skyi-edge" className={styles.edge} href={sisterUrl} data-scramble-trigger data-hero-motion="right" data-hero-delay="700"><ScrambleText text="Part of the Skyriders family" /><span aria-hidden="true">↗</span></a>
    <AnimatePresence>
      {menuOpen && <motion.div id="skyi-menu" ref={dialog} role="dialog" aria-modal="true" aria-label="Sky I navigation" className={styles.menu}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: paused ? 0 : 0.2 }}>
        <button className={styles.close} onClick={() => setMenuOpen(false)} data-scramble-trigger><ScrambleText text="Close" /><span aria-hidden="true">×</span></button>
        <nav aria-label="Sky I mobile">
          {items.map((item, index) => <motion.a key={item.id} href={`#${item.id}`} data-scramble-trigger onClick={() => { setMenuOpen(false); setTimeout(() => document.getElementById(item.id)?.focus({ preventScroll: true }), 250); }}
            initial={{ opacity: 0, x: paused ? 0 : index % 2 ? 45 : -45 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: paused ? 0 : 0.5, delay: paused ? 0 : index * 0.07 }}>
            <span>{String(index + 1).padStart(2, "0")}</span><ScrambleText text={item.label} /><span aria-hidden="true">↗</span>
          </motion.a>)}
        </nav>
        <div className={styles.menuBottom}>
          <p>Sky I inspects.<br />Skyriders does the work.</p>
          {skyISite.email && <a href={`mailto:${skyISite.email}`}>{skyISite.email}</a>}
          {skyISite.phone && <a href={`tel:${skyISite.phone}`}>{skyISite.phone}</a>}
          <a href={sisterUrl}>Skyriders, our rope access sister company ↗</a>
        </div>
      </motion.div>}
    </AnimatePresence>
  </>;
}
