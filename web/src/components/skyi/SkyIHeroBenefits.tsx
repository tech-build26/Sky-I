import { Scan, Building2, Images, ClipboardCheck } from "lucide-react";
import { skyIHero } from "@/content/skyi-hero";
import styles from "./SkyIHero.module.css";

const icons = [Scan, Building2, Images, ClipboardCheck];

export function SkyIHeroBenefits() {
  return <div className={styles.benefits} aria-label="Our approach" data-parallax-layer="4">
    <ul className={styles.benefitList}>
      {skyIHero.benefits.map((label, index) => {
        const Icon = icons[index];
        return <li key={label} className={styles.benefit} data-hero-enter={index % 2 ? "right" : "left"} data-hero-delay={650 + index * 90}>
          <span className={styles.benefitInner}><Icon aria-hidden="true" strokeWidth={1.2} /><span>{label}</span></span>
        </li>;
      })}
    </ul>
    <p className={styles.outcome} data-hero-enter="right" data-hero-delay="1010"><span>{skyIHero.outcome.map(line => <span key={line}>{line}</span>)}</span></p>
  </div>;
}
