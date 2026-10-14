"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { skyIServicePreview } from "@/content/skyi-service-preview";
import { skyIFieldPhotography } from "@/content/skyi-field-photography";
import { SkyISketchFrame } from "./SkyISketchFrame";
import { SkyIDisclosureFit } from "./SkyIDisclosureFit";
import { useSkyIMotion } from "./SkyIProvider";
import styles from "./SkyIServices.module.css";

// Conceptual asset drawings, not scan data, equipment or project imagery.
function AssetDrawing({ kind }: { kind: string }) {
  return <svg viewBox="0 0 640 400" fill="none" aria-hidden="true" className={styles.drawing}>
    <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      {kind === "boiler" && <>
        <path d="M175 340V90l205-48 92 64v234l-206 48-91-48ZM175 90l91 59 206-43M266 149v239M380 42v65" />
        <path d="m194 111 55 36v198l-55-29V111Zm94 57 163-37v185l-163 39V168" />
        <path className={styles.feature} d="M310 176v116q0 24 16 20t16-27V169m20-5v120q0 24 16 20t16-27V157m20-5v120q0 24 16 20t16-27V145" />
        <path d="m203 185 36 23m-36 19 36 23m-36 19 36 23M175 287l-60-33v-76l60 31m297 50 60-15v-91l-60 15" />
      </>}
      {kind === "tank" && <>
        <ellipse cx="312" cy="107" rx="152" ry="53" /><path d="M160 107v204c0 29 68 53 152 53s152-24 152-53V107" />
        <path d="M160 311c0-29 68-53 152-53s152 24 152 53M312 54v310M185 136v192m254-192v192" strokeDasharray="5 7" opacity=".5" />
        <path className={styles.feature} d="M185 130v163c0 23 57 41 127 41s127-18 127-41V130M185 222c0 23 57 41 127 41s127-18 127-41" />
        <ellipse cx="312" cy="70" rx="33" ry="12" /><path d="M279 70V46c0-7 15-12 33-12s33 5 33 12v24M464 260h48v57h-48M144 345h335" />
      </>}
      {kind === "tower" && <>
        <ellipse cx="327" cy="63" rx="44" ry="16" /><path d="M283 63 248 344c0 24 158 24 158 0L371 63M282 63c0 22 89 22 89 0" />
        <path d="M273 141c0 24 108 24 108 0m-121 110c0 27 135 27 135 0M290 91l-13 244m24-242-5 252m57-255 23 244" opacity=".55" />
        <path className={styles.feature} d="M265 196c-49 9-43 26-2 34m117-35c43 10 45 25 7 34M265 196c30 16 87 16 115-1m-117 35c34 14 89 14 124-1M259 195v34m135-33v31" />
        <path d="M402 354h77V153l-30-30-47 30v201Zm0-201h77m-77 41h77m-77 40h77M136 354V245l66-32v141m-66-67 66-29" />
      </>}
      {(kind === "building" || kind === "thermal") && <>
        <path d="m126 160 218-88 167 72v170l-218 70-167-85V160Zm0 0 167 80 218-96M293 240v144M344 72v80" />
        <path d="m154 149 190-60 135 57-186 72-139-69Zm-9 39v103m36-86v105m37-88v108m36-89v109m56-103v109m43-126v113m43-129v115m42-129v116m43-130v116M145 241l127 62m37-11 181-64M145 270l127 63m37-10 181-61" opacity=".5" />
        {kind === "building" ? <path className={styles.feature} d="m154 149 190-60 135 57-186 72-139-69Zm30 13 156-50 101 41M340 112v-23M381 130l37-12" /> : <g className={styles.feature}>
          <path d="m181 205 36 17v52l-36-18v-51Zm173 70 42-15v-53l-42 16v52m-200-126 190-60 135 57-186 72-139-69Z" />
          <path d="m243 132 99-32 78 33-99 34-78-35Zm24 0 75-24 52 23-75 25-52-24Z" />
        </g>}
      </>}
    </g>
  </svg>;
}

export function SkyIServices() {
  const root = useRef<HTMLElement>(null);
  const { paused, menuOpen } = useSkyIMotion();
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    let visible = false;
    const sync = () => { section.dataset.sceneStatic = String(paused || menuOpen || document.hidden || !visible); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(section);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, [paused, menuOpen]);
  useEffect(() => {
    const openFragment = () => {
      const id = window.location.hash.slice(1);
      const target = document.getElementById(id);
      if (target instanceof HTMLDetailsElement && root.current?.contains(target)) target.open = true;
    };
    openFragment();
    window.addEventListener("hashchange", openFragment);
    return () => window.removeEventListener("hashchange", openFragment);
  }, []);

  return <section ref={root} id="services" className={styles.section} tabIndex={-1} aria-labelledby="skyi-services-title">
    <div className={styles.backgrounds} aria-hidden="true">
      {skyIServicePreview.map(service => <div key={service.id} className={styles.scene} data-service={service.id} data-reveal={service.kind} style={{ "--scene-position": service.backgroundPosition } as CSSProperties}>
        <Image src={service.background} alt="" fill sizes="(max-width: 1023px) 100vw, 70vw" loading="eager" fetchPriority="low" />
      </div>)}
    </div>
    <div className={styles.scrim} aria-hidden="true" />
    <div className={styles.container}>
      <div className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>Services / A closer look</p>
          <h2 id="skyi-services-title" className={styles.heading}>Beyond the surface.<br /><em>Into the detail.</em></h2>
        </div>
        <p className={styles.lead}>Choose the asset you need to understand. Agree the areas to document and the views your maintenance or engineering team needs.</p>
      </div>
      <div className={styles.explorer}>
        <p className={styles.instruction}>Choose an asset <span aria-hidden="true">↘</span></p>
        <div className={styles.index} data-disclosure-layout>
          {skyIServicePreview.map((service, index) => <details key={service.id} id={service.id} name="skyi-service-preview" className={styles.item} open={index === 0}
            onToggle={event => {
              const target = event.currentTarget;
              const heroSelected = target.hasAttribute("data-hero-selected");
              const assetSelected = target.hasAttribute("data-asset-selected");
              if (target.open && (heroSelected || assetSelected)) {
                delete target.dataset.heroSelected;
                delete target.dataset.assetSelected;
                requestAnimationFrame(() => {
                  if (heroSelected || (matchMedia("(max-width: 1023px)").matches && target.getBoundingClientRect().top < 100)) {
                    target.scrollIntoView({ block: "start", behavior: "instant" });
                  }
                  if (heroSelected) target.querySelector("summary")?.focus({ preventScroll: true });
                });
              }
            }}>
            <summary onClick={event => {
              const target = event.currentTarget.parentElement as HTMLDetailsElement;
              if (!target.open) target.dataset.assetSelected = "true";
            }}><span className={styles.assetTitle}>{service.title}</span><span className={styles.assetHint}>{service.hint}</span><ArrowUpRight aria-hidden="true" strokeWidth={1.2} /></summary>
            <div className={styles.panel} data-disclosure-panel>
              <figure className={styles.figure} data-skyi-reveal="image">
                {service.kind === "boiler" ? <>
                  <div className={styles.fieldPhotos}>
                    {skyIFieldPhotography.inspection.map((photo, index) => <SkyISketchFrame key={photo.src} variant={index ? "detail" : "access"} className={styles.fieldPhoto}>
                      <Image src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} sizes="(max-width: 639px) 36vw, 180px" />
                    </SkyISketchFrame>)}
                  </div>
                  <figcaption>At the access point. Inside the structure.<span>On site with Skyriders</span></figcaption>
                </> : <>
                  <AssetDrawing kind={service.kind} />
                  <figcaption>{service.figure}<span>Illustrated inspection areas</span></figcaption>
                </>}
              </figure>
              <div className={styles.detail}>
                <p className={styles.prompt}>{service.question}</p>
                <p className={styles.description}>{service.body}</p>
                <ul className={styles.scope} aria-label="Inspection applications">{service.areas.map(area => <li key={area}>{area}</li>)}</ul>
                <p className={styles.evidence}><span>Evidence to agree</span>Photographs or video of the areas in scope, with the coverage and handover format agreed before inspection.</p>
                <a href="#contact" className={styles.action}>Discuss your inspection <ArrowUpRight aria-hidden="true" size={21} strokeWidth={1.3} /></a>
              </div>
            </div>
          </details>)}
        </div>
      </div>
      <div className={styles.closing}>
        <div className={styles.invitation}>
          <p className={styles.eyebrow}>The starting point</p>
          <p className={styles.closingTitle}>Tell us the asset.<br /><em>Tell us what you need to understand.</em></p>
          <a className={styles.action} href="#contact">Discuss your inspection <ArrowUpRight aria-hidden="true" size={20} /></a>
        </div>
        <div className={styles.faq} aria-label="Inspection questions">
          <p className={styles.eyebrow}>Before your inspection</p>
          <details><summary><span>Can we inspect while the plant is operating?</span><Plus aria-hidden="true" size={18} /></summary><p>It depends on the asset, operating conditions and access requirements. Discuss these with the team before agreeing an inspection window.</p></details>
          <details><summary><span>Is thermal imagery included?</span><Plus aria-hidden="true" size={18} /></summary><p>No standard thermal scope is assumed. Discuss the question you need answered; equipment availability, conditions and suitability must be agreed for that brief.</p></details>
          <details id="window-washing" className={styles.cleaning}>
            <summary><span>Looking for window washing?</span><Plus aria-hidden="true" size={18} /></summary>
            <p>Share the glazing, building height and cleaning requirement so we can discuss site conditions and access.</p>
            <a className={styles.action} href="#contact">Discuss your building <ArrowUpRight aria-hidden="true" size={20} /></a>
          </details>
        </div>
      </div>
    </div>
    <SkyIDisclosureFit sectionId="services" breakpoint={1024} />
  </section>;
}
