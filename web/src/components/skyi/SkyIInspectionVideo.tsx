"use client";

import { useEffect, useRef } from "react";
import { useSkyIMotion } from "./SkyIProvider";

export function SkyIInspectionVideo({ src, poster, className, width = 1920, height = 1080, prefetchMargin = "0px" }: {
  src: string; poster: string; className: string; width?: number; height?: number; prefetchMargin?: string;
}) {
  const footage = useRef<HTMLVideoElement>(null);
  const failed = useRef(false);
  const { paused, menuOpen } = useSkyIMotion();

  useEffect(() => {
    const video = footage.current;
    if (!video) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (failed.current || paused || menuOpen || connection?.saveData || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    let visible = false;
    let disposed = false;
    const ensureSource = () => {
      if (disposed || video.getAttribute("src")) return;
      video.src = src;
      video.load();
    };
    const sync = () => {
      if (disposed || !visible || document.hidden) { video.pause(); return; }
      if (failed.current) return;
      ensureSource();
      void video.play().then(() => {
        if (disposed || !visible || document.hidden) video.pause();
      }).catch(() => { /* The poster remains when autoplay is unavailable. */ });
    };
    const load = new IntersectionObserver(([entry]) => {
      if (disposed || !entry.isIntersecting || document.hidden) return;
      ensureSource(); load.disconnect(); sync();
    }, { rootMargin: prefetchMargin });
    const observer = new IntersectionObserver(([entry]) => {
      if (disposed) return;
      visible = entry.isIntersecting;
      sync();
    }, { threshold: .01 });
    load.observe(video); observer.observe(video);
    const showPoster = () => {
      failed.current = true; video.pause(); video.removeAttribute("src"); video.load();
      load.disconnect(); observer.disconnect();
    };
    video.addEventListener("error", showPoster);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true; load.disconnect(); observer.disconnect(); video.pause();
      document.removeEventListener("visibilitychange", sync);
      video.removeEventListener("error", showPoster);
    };
  }, [src, prefetchMargin, paused, menuOpen]);

  return <video ref={footage} className={className} width={width} height={height} poster={poster} muted loop playsInline preload="none" tabIndex={-1} aria-hidden="true" />;
}
