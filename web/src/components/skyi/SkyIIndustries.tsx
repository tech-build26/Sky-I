"use client";

// ===== Sector selection: context rather than client names =====
import { useState } from "react";
import styles from "./SkyI.module.css";

const sectors = [
  { title: "Power generation", detail: "Boilers, stacks and plant structures. Begin with the operating environment and the condition the inspection needs to establish." },
  { title: "Mining", detail: "Large structures and difficult internal spaces. Define the inspection area, access constraints and the findings needed for the next decision." },
  { title: "Petroleum & petrochemical", detail: "Tanks and industrial infrastructure. Scope the work around the asset, its operating status and the site's requirements." },
  { title: "Construction", detail: "Buildings, roofing and structural elements. A remote visual perspective can inform where closer examination is needed." },
  { title: "Facilities maintenance", detail: "Make the inspection question specific: an area of concern, a changing condition or a maintenance decision that needs a clearer view." },
  { title: "Municipal infrastructure", detail: "Structures serving public systems. Start with the asset and the inspection objective, then agree the appropriate approach." },
];
export function SkyIIndustries() {
  const [selected, setSelected] = useState(0);
  return <div className={styles.sectorLayout}>
    <div className={styles.sectorChoices} aria-label="Industry context">
      {sectors.map((sector,index)=><button key={sector.title} aria-pressed={selected===index} aria-controls="skyi-sector-detail" onClick={()=>setSelected(index)}><span>{String(index+1).padStart(2,"0")}</span>{sector.title}<span aria-hidden="true">↗</span></button>)}
    </div>
    <div id="skyi-sector-detail" className={styles.sectorDetail} aria-live="polite"><span className={styles.label}>The inspection context</span><h3>{sectors[selected].title}</h3><p>{sectors[selected].detail}</p><a href="#contact">Define your inspection <span aria-hidden="true">↗</span></a></div>
    <noscript><ul className={styles.staticSectors}>{sectors.map(sector=><li key={sector.title}><h3>{sector.title}</h3><p>{sector.detail}</p></li>)}</ul></noscript>
  </div>;
}
