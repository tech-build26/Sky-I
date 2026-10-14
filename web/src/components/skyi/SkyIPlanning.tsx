"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { skyIPlanning, skyIEnquiryEvent, type SkyIEnquirySeed } from "@/content/skyi-planning";
import { useClientReady } from "@/hooks/useClientReady";
import { skyIFieldPhotography } from "@/content/skyi-field-photography";
import { SkyISketchFrame } from "./SkyISketchFrame";
import styles from "./SkyIPlanning.module.css";

export function SkyIPlanning() {
  const [choices, setChoices] = useState([0, 2, 0]);
  const ready = useClientReady();
  const selected = skyIPlanning.map((group, index) => group.options[choices[index]]);
  return <section id="safety" className={styles.section} tabIndex={-1} aria-labelledby="skyi-planning-title">
    <div className={styles.layout}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Safety & preparation / Before we fly</p>
        <h2 id="skyi-planning-title">A good inspection<br /> starts <em>on the ground.</em></h2>
        <p className={styles.description}>Choose the setting, conditions and evidence you need. Take this starting brief to the team, then agree suitability and access before scheduling.</p>
        <details className={styles.process}><summary>From enquiry to evidence</summary><ol><li><strong>Discuss the site.</strong> Share the asset, location and area of concern.</li><li><strong>Agree the scope.</strong> Establish suitability, access, permissions and documentation.</li><li><strong>Inspect and hand over.</strong> Carry out the agreed work and provide the documentation defined in the brief.</li></ol></details>
        <div className={styles.grounding}>
          <figure className={styles.sitePhoto} data-skyi-reveal="image">
            <SkyISketchFrame tone="ink" className={styles.siteFrame}>
              <Image src={skyIFieldPhotography.preparation.src} width={skyIFieldPhotography.preparation.width} height={skyIFieldPhotography.preparation.height} alt={skyIFieldPhotography.preparation.alt} sizes="(max-width: 599px) 38vw, 180px" />
            </SkyISketchFrame>
            <figcaption>{skyIFieldPhotography.preparation.caption}</figcaption>
          </figure>
          <div className={styles.statement} aria-live="polite" aria-atomic="true"><MoveUpRight size={36} strokeWidth={1} aria-hidden="true" /><span className={styles.statementLabel}>Your starting point</span><p>{selected[0]}<br /><em>{selected[1]}.</em><br />{selected[2]}.</p></div>
        </div>
      </div>
      <div className={styles.workbench}>
        <p className={styles.workbenchTitle}>Shape the inspection brief <span>Try the choices below</span></p>
        <noscript><p className={styles.note}>Discuss these three questions with the team using the contact links below.</p></noscript>
        {skyIPlanning.map((group, index) => <fieldset className={styles.group} key={group.name}>
          <legend>{group.label}</legend>
          <div className={styles.choices}>{group.options.map((option, optionIndex) => <label key={option}><input type="radio" name={`skyi-plan-${group.name}`} value={option} checked={choices[index] === optionIndex} onChange={() => setChoices(current => current.map((choice, i) => i === index ? optionIndex : choice))} /><span>{option}<span aria-hidden="true">↗</span></span></label>)}</div>
          <p className={styles.note}>{group.notes[choices[index]]}</p>
        </fieldset>)}
        <a className={styles.action} href="#contact" onClick={() => {
          const detail: SkyIEnquirySeed = { message: `Inspection area: ${selected[0]}\nSite conditions: ${selected[1]}\nEvidence to discuss: ${selected[2]}\n\nSite / asset:\nArea of concern:\nPreferred timing:` };
          window.dispatchEvent(new CustomEvent<SkyIEnquirySeed>(skyIEnquiryEvent, { detail }));
        }}>{ready ? "Take this brief to the team" : "Discuss your inspection"}<ArrowUpRight size={23} aria-hidden="true" /></a>
        <p className={styles.disclaimer}>Site access, permissions and inspection suitability need agreement before work is scheduled.</p>
      </div>
    </div>
  </section>;
}
