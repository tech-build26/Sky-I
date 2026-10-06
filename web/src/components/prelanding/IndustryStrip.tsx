"use client";

import { useEffect, useRef } from "react";
import { Building2, Factory, Fuel, HardHat, House, Pickaxe, RadioTower, Warehouse, Waves, Zap } from "lucide-react";
import { industries } from "@/content/prelanding";

const industryIcons = [Fuel, Factory, Pickaxe, HardHat, Building2, Zap, RadioTower, Waves, Warehouse, House] as const;

function IndustryList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul aria-hidden={duplicate ? "true" : undefined}>
      {industries.map((industry, index) => {
        const Icon = industryIcons[index];
        return <li key={industry}><Icon aria-hidden="true" size={23} strokeWidth={1.4} />{industry}</li>;
      })}
    </ul>
  );
}

export function IndustryStrip() {
  const stripRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const scene = strip.closest<HTMLElement>(".prelanding");
    let inView = true;
    let sceneInView = true;
    const sync = () => {
      strip.dataset.paused = String(!inView || document.hidden);
      if (scene) scene.dataset.paused = String(!sceneInView || document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    const sceneObserver = new IntersectionObserver(([entry]) => {
      sceneInView = entry.isIntersecting;
      sync();
    });
    observer.observe(strip);
    if (scene) sceneObserver.observe(scene);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      sceneObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <aside className="industries" aria-label="Industries served" ref={stripRef}>
      <h2>Industries</h2>
      <div className="industry-window" role="region" aria-label="Industry list; focus to pause scrolling" tabIndex={0}>
        <div className="industry-track">
          <IndustryList />
          <IndustryList duplicate />
          <IndustryList duplicate />
          <IndustryList duplicate />
        </div>
      </div>
    </aside>
  );
}
