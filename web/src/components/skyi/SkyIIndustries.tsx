import { ArrowUpRight } from "lucide-react";
import { skyISectors, skyISectorVisuals } from "@/content/skyi-sectors";
import styles from "./SkyIIndustries.module.css";
import { SkyISectorArtwork } from "./SkyISectorArtwork";
import { SkyISectorInteractions } from "./SkyISectorInteractions";
import { SkyIDisclosureFit } from "./SkyIDisclosureFit";

export function SkyIIndustries() {
  return <section id="industries" className={styles.section} tabIndex={-1} aria-labelledby="skyi-industries-title">
    <div className={styles.container}>
      <div className={styles.surface} aria-hidden="true"><svg viewBox="0 0 1280 800" preserveAspectRatio="none"><g fill="none" stroke="currentColor"><path d="M0 100H1280M0 700H1280M160 0v800M1120 0v800M400 0 0 700M580 0 120 800M1280 200 900 800M1280 400 1040 800" /><path d="M20 60h40m-20-20v40M1200 730h40m-20-20v40M540 710h100m-50-10v20" /></g></svg></div>
      <div className={styles.intro} data-skyi-reveal="left">
        <p className={styles.eyebrow}>Sectors / The context matters</p>
        <h2 id="skyi-industries-title">Industrial sites.<br /><em>Specific questions.</em></h2>
        <p className={styles.lead}>The asset, the access and what you need to see.<br />Choose your setting.</p>
      </div>
      <div className={styles.selector} data-disclosure-layout>
        <div className={styles.index} aria-label="Choose an industry">
          {skyISectors.map((sector, index) => {
            const visual = skyISectorVisuals[index];
            return <details key={sector.title} name="skyi-sector" className={styles.item} open={index === 0} data-sector-id={visual.id}>
              <summary data-skyi-reveal="left" data-scroll-delay={index * 65}>{sector.title}<span className={styles.arrow} aria-hidden="true"><ArrowUpRight size={21} /></span></summary>
              <div className={styles.panel} data-disclosure-panel data-disclosure-offset data-sector-panel>
                <SkyISectorArtwork visual={visual} />
                <div className={styles.context} data-skyi-reveal="sector-detail" data-scroll-delay="120">
                  <p className={styles.assets}>{sector.assets}</p>
                  <p className={styles.word} aria-hidden="true">{sector.word}</p>
                  <h3>{sector.question}</h3>
                  <p className={styles.body}>{sector.context}</p>
                  <div className={styles.brief}><span>Bring to the conversation</span><p>{sector.brief}</p></div>
                  <a className={styles.action} href="#contact">Discuss your inspection <ArrowUpRight size={21} aria-hidden="true" /></a>
                </div>
              </div>
            </details>;
          })}
        </div>
      </div>
      <div className={styles.baseline} data-skyi-reveal="up"><span>A site-specific conversation.</span><i aria-hidden="true" /><span>An inspection with a purpose.</span></div>
      <SkyISectorInteractions />
      <SkyIDisclosureFit sectionId="industries" breakpoint={1024} />
    </div>
  </section>;
}
