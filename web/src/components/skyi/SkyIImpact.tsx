import { ArrowUpRight } from "lucide-react";
import { skyIImpact } from "@/content/skyi-impact";
import { SkyIInspectionVideo } from "./SkyIInspectionVideo";
import styles from "./SkyIImpact.module.css";

export function SkyIImpact() {
  return <section id="impact" className={styles.section} tabIndex={-1} aria-labelledby="skyi-impact-title">
    <div className={styles.media} aria-hidden="true">
      <SkyIInspectionVideo className={styles.video} src={skyIImpact.footage.src} poster={skyIImpact.footage.poster} width={1280} height={720} prefetchMargin="300px 0px" />
    </div>
    <div className={styles.layout}>
      <div className={styles.copy}>
        <p className={styles.eyebrow} data-impact-enter="left">{skyIImpact.eyebrow}</p>
        <h2 id="skyi-impact-title"><span className={styles.mask}><span data-impact-enter="left" data-impact-delay="90">{skyIImpact.heading}</span></span><em className={styles.mask}><span data-impact-enter="right" data-impact-delay="190">{skyIImpact.emphasis}</span></em></h2>
        <p className={styles.body} data-impact-enter="left" data-impact-delay="260">{skyIImpact.body}</p>
        <div data-impact-enter="left" data-impact-delay="360"><a className={styles.action} href="#contact" data-magnetic><span>{skyIImpact.action}</span><span className={styles.arrow} aria-hidden="true"><ArrowUpRight strokeWidth={1.4} /></span></a></div>
        <p className={styles.note} data-impact-enter="left" data-impact-delay="440">{skyIImpact.note}</p>
      </div>
    </div>
  </section>;
}
