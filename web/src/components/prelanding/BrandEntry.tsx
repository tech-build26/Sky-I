"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

// The two sites share the handoff contract, but use different visual entrances.
export function BrandEntry() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<string | null>(null);
  const animationsRef = useRef<Animation[]>([]);
  const timeoutRef = useRef<number | undefined>(undefined);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const clear = () => {
      animationsRef.current.forEach((animation) => animation.cancel());
      animationsRef.current = [];
      overlay.dataset.phase = "idle";
      delete document.documentElement.dataset.brandEntry;
      pendingRef.current = null;
      window.clearTimeout(timeoutRef.current);
      window.dispatchEvent(new Event("brand-entry-ready"));
    };
    const click = async (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>(".prelanding a[data-brand-choice]");
      if (!link || link.target || link.hasAttribute("download")) return;
      const brand = link.dataset.brandChoice;
      if (brand !== "skyriders" && brand !== "skyi") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (pendingRef.current) { event.preventDefault(); return; }
      const destination = new URL(link.href);
      if (destination.pathname.replace(/\/$/, "") !== "/home") return;
      event.preventDefault();
      pendingRef.current = brand;
      overlay.dataset.theme = brand;
      overlay.dataset.phase = "departing";
      const compact = window.matchMedia("(max-width: 800px)").matches;
      const stage = link.closest<HTMLElement>(".prelanding")!;
      const departure = stage.animate([
        { opacity: 1, transform: "scale(1)" },
        { opacity: .32, transform: `scale(${compact ? 1.015 : 1.045})` },
      ], { duration: compact ? 280 : 410, easing: "cubic-bezier(.3,0,.2,1)", fill: "forwards" });
      const cover = overlay.animate(brand === "skyriders" ? [
        { clipPath: "inset(0% 100% 0% 0%)", transform: "translateX(0px)" },
        { clipPath: "inset(0% 0% 0% 0%)", transform: "translateX(0px)" },
      ] : [
        { opacity: 0, transform: `perspective(1200px) translateX(${compact ? 18 : 90}px) rotateY(-14deg) scale(.94)` },
        { opacity: 1, transform: "perspective(1200px) translateX(0px) rotateY(0deg) scale(1)" },
      ], { duration: compact ? 280 : 410, easing: "cubic-bezier(.3,0,.2,1)", fill: "both" });
      animationsRef.current = [departure, cover];
      try { await cover.finished; } catch { clear(); return; }
      // Both local and cross-domain requests can stall before the next document.
      timeoutRef.current = window.setTimeout(clear, 1800);
      if (destination.origin === location.origin) {
        router.push(destination.pathname + destination.search + destination.hash);
      } else {
        destination.searchParams.set("_entry", brand);
        location.assign(destination.toString());
      }
    };
    const restore = (event: PageTransitionEvent) => { if (event.persisted) clear(); };
    document.addEventListener("click", click, true);
    window.addEventListener("pageshow", restore);
    return () => { document.removeEventListener("click", click, true); window.removeEventListener("pageshow", restore); clear(); };
  }, [router]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay || pathname.replace(/\/$/, "") !== "/home") return;
    const url = new URL(location.href);
    const entry = url.searchParams.get("_entry");
    const brand = pendingRef.current ?? (entry === "skyriders" || entry === "skyi" ? entry : null);
    if (!brand) return;
    window.clearTimeout(timeoutRef.current);
    animationsRef.current.forEach((animation) => animation.cancel());
    overlay.dataset.theme = brand;
    overlay.dataset.phase = "arriving";
    if (entry) { url.searchParams.delete("_entry"); history.replaceState(history.state, "", url.pathname + url.search + url.hash); }
    const finish = () => {
      overlay.dataset.phase = "idle";
      delete document.documentElement.dataset.brandEntry;
      pendingRef.current = null;
      window.dispatchEvent(new Event("brand-entry-ready"));
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { finish(); return; }
    const compact = window.matchMedia("(max-width: 800px)").matches;
    const reveal = overlay.animate(brand === "skyriders" ? [
      { transform: "translateY(0%)", opacity: 1 }, { transform: "translateY(-100%)", opacity: 1 },
    ] : [
      { transform: "perspective(1200px) translateZ(0px) scale(1)", opacity: 1 },
      { transform: `perspective(1200px) translateZ(${compact ? 50 : 180}px) scale(1.12)`, opacity: 0 },
    ], { duration: compact ? 320 : 480, easing: "cubic-bezier(.16,.7,.25,1)", fill: "both" });
    animationsRef.current = [reveal];
    reveal.finished.then(() => { finish(); reveal.cancel(); }, finish);
    return () => { reveal.cancel(); finish(); };
  }, [pathname]);

  return <div ref={overlayRef} className="brand-entry-overlay" data-phase="idle" aria-hidden="true">
    <span className="brand-entry-name brand-entry-name--skyriders">Skyriders<span>Industrial rope access</span></span>
    <span className="brand-entry-name brand-entry-name--skyi">Sky I<span>Industrial drone inspection</span></span>
    <span className="brand-entry-edge" />
  </div>;
}
