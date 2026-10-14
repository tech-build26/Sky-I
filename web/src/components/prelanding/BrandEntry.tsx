"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

// One persistent cover spans navigation and releases the prepared hero underneath.
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
      animationsRef.current.forEach(animation => animation.cancel());
      animationsRef.current = [];
      overlay.dataset.phase = "idle";
      delete document.documentElement.dataset.brandEntry;
      pendingRef.current = null;
      window.clearTimeout(timeoutRef.current);
      window.dispatchEvent(new Event("brand-entry-ready"));
    };
    const click = async (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>(".prelanding a[data-brand-choice]") : null;
      if (!link || link.target || link.hasAttribute("download")) return;
      const brand = link.dataset.brandChoice;
      if (brand !== "skyriders" && brand !== "skyi") return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (pendingRef.current) { event.preventDefault(); return; }
      const destination = new URL(link.href);
      if (destination.pathname.replace(/\/$/, "") !== "/home") return;
      event.preventDefault();
      pendingRef.current = brand;
      document.documentElement.dataset.brandEntry = brand;
      overlay.dataset.theme = brand;
      overlay.dataset.phase = "departing";
      const stage = link.closest<HTMLElement>(".prelanding")!;
      const departure = stage.animate([{ opacity: 1, transform: "scale(1)" }, { opacity: .2, transform: "scale(1.04)" }], { duration: 220, easing: "cubic-bezier(.3,0,.2,1)", fill: "forwards" });
      const cover = overlay.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: "ease-in-out", fill: "both" });
      animationsRef.current = [departure, cover];
      try { await cover.finished; } catch { clear(); return; }
      timeoutRef.current = window.setTimeout(clear, 6500);
      if (destination.origin === location.origin) router.push(destination.pathname + destination.search + destination.hash);
      else { destination.searchParams.set("_entry", brand); location.assign(destination.toString()); }
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
    animationsRef.current.forEach(animation => animation.cancel());
    overlay.dataset.theme = brand;
    overlay.dataset.phase = "arriving";
    if (entry) { url.searchParams.delete("_entry"); history.replaceState(history.state, "", url.pathname + url.search + url.hash); }
    const page = document.querySelector<HTMLElement>(".sky-i-foundation");
    if (page) page.inert = true;
    let disposed = false;
    let revealed = false;
    let finished = false;
    const timers = new Set<number>();
    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(id => clearTimeout(id)); timers.clear();
      overlay.dataset.phase = "idle";
      delete document.documentElement.dataset.brandEntry;
      pendingRef.current = null;
      if (page) page.inert = false;
      window.dispatchEvent(new Event("brand-entry-ready"));
    };
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => { timers.delete(id); if (!disposed) fn(); }, ms);
      timers.add(id);
    };
    const reveal = () => {
      if (disposed || revealed || finished) return;
      revealed = true;
      overlay.dataset.phase = "revealing";
      window.dispatchEvent(new Event("brand-entry-reveal"));
      const animation = overlay.animate(brand === "skyi" ? [
        { opacity: 1, transform: "scale(1)", offset: 0 },
        { opacity: 1, transform: "scale(1.015)", offset: .12 },
        { opacity: 0, transform: "scale(1.14)", offset: 1 },
      ] : [{ transform: "translateY(0%)" }, { transform: "translateY(-100%)" }], { duration: 420, easing: "cubic-bezier(.45,0,.2,1)", fill: "both" });
      animationsRef.current = [animation];
      animation.finished.then(() => { finish(); animation.cancel(); }, finish);
    };
    const skip = (event: KeyboardEvent) => { if (event.key === "Escape") reveal(); };
    const preference = () => { if (reduced.matches) { animationsRef.current.forEach(animation => animation.cancel()); finish(); } };
    document.addEventListener("keydown", skip);
    reduced.addEventListener("change", preference);
    if (reduced.matches) finish();
    else later(reveal, brand === "skyi" ? 650 : 180);
    later(finish, 4800);
    return () => {
      disposed = true; timers.forEach(id => clearTimeout(id));
      animationsRef.current.forEach(animation => animation.cancel());
      document.removeEventListener("keydown", skip); reduced.removeEventListener("change", preference);
      finish();
    };
  }, [pathname]);

  return <div ref={overlayRef} className="brand-entry-overlay" data-phase="idle" aria-hidden="true">
    <span className="brand-entry-name brand-entry-name--skyriders">Skyriders<span>Industrial rope access</span></span>
    <div className="skyline-entry">
      <div className="skyline-lettering"><span className="skyline-kicker">A different perspective</span><span className="skyline-brand">SKY I</span><span className="skyline-service">Drone inspection</span></div>
      <div className="skyline-city"><Image src="/images/skyline.png" alt="" fill sizes="(max-width:767px) 220vw, 118vw" priority /></div>
      <span className="skyline-horizon" />
    </div>
  </div>;
}
