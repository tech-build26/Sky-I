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

const items = [
  { id: "opening", label: "Home" }, { id: "about", label: "About" },
  { id: "services", label: "Services" }, { id: "industries", label: "Industries" },
  { id: "process", label: "Our approach" }, { id: "contact", label: "Contact" },
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
    const isolated = [content, footer, nav, edge].filter((node): node is HTMLElement => !!node);
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
    <Link href="/" className={styles.logo} data-skyi-logo aria-label="Sky I — company selection"><Image src="/images/sky-i-logo-20261005.png" alt="Sky I" width={1254} height={1254} priority /></Link>
    <nav id="skyi-desktop-nav" aria-label="Sky I" className={`${styles.nav} ${ready ? styles.enhancedNav : ""}`}>
      {items.map(item => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}>
        {item.label}{active === item.id && <motion.span className={styles.indicator} layoutId="skyi-nav-indicator" transition={{ duration: paused ? 0 : 0.3 }} />}
      </a>)}
      <a href={sisterUrl}>Skyriders <span aria-hidden="true">↗</span></a>
    </nav>
    {ready && <button ref={button} className={styles.menuButton} aria-expanded={menuOpen} aria-controls="skyi-menu" onClick={() => setMenuOpen(!menuOpen)}>Menu <span aria-hidden="true">☰</span></button>}
    <a id="skyi-edge" className={styles.edge} href={sisterUrl}>Part of the Skyriders family <span aria-hidden="true">↗</span></a>
    <AnimatePresence>
      {menuOpen && <motion.div id="skyi-menu" ref={dialog} role="dialog" aria-modal="true" aria-label="Sky I navigation" className={styles.menu}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: paused ? 0 : 0.2 }}>
        <button className={styles.close} onClick={() => setMenuOpen(false)}>Close <span aria-hidden="true">×</span></button>
        <nav aria-label="Sky I mobile">
          {items.map((item, index) => <motion.a key={item.id} href={`#${item.id}`} onClick={() => { setMenuOpen(false); setTimeout(() => document.getElementById(item.id)?.focus({ preventScroll: true }), 250); }}
            initial={{ opacity: 0, y: paused ? 0 : 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: paused ? 0 : 0.35, delay: paused ? 0 : index * 0.07 }}>
            <span>{String(index + 1).padStart(2, "0")}</span>{item.label}<span aria-hidden="true">↗</span>
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
