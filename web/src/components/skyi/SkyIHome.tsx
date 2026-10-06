// ===== Sky I photography-led hero =====
import { getSkyridersUrl, skyISite } from "@/config/site";
import Link from "next/link";
import { HardHat, ChartNoAxesColumnIncreasing, Leaf, UsersRound } from "lucide-react";
import { SkyIProvider } from "./SkyIProvider";
import { SkyINavigation } from "./SkyINavigation";
import { SkyIPhotography } from "./SkyIPhotography";
import { SkyIControls } from "./SkyIControls";
import { SkyIDrone } from "./SkyIDrone";
import { SkyISections } from "./SkyISections";
import { SkyIReveals } from "./SkyIReveals";
import { SkyIHeroMotion } from "./SkyIHeroMotion";
import { ScrambleText } from "../ui/scramble-text";
import styles from "./SkyI.module.css";
import "@/styles/skyi-tokens.css";

export function SkyIHome({ skyridersHref }: { skyridersHref: string }) {
  const sisterUrl = getSkyridersUrl(skyridersHref);
  const schema = { "@context": "https://schema.org", "@type": "Organization", name: skyISite.name, url: "https://skyi.co.za", description: skyISite.description };
  return <SkyIProvider className="sky-i-foundation">
    {/* ===== Keyboard access ===== */}
    <a className={styles.skip} href="#skyi-title">Skip to content</a>
    {/* ===== Independent identity and floating navigation ===== */}
    <SkyINavigation sisterUrl={sisterUrl} />
    {/* ===== Hero Section ===== */}
    <main id="skyi-main">
      <section id="opening" className={styles.opening} aria-labelledby="skyi-title" tabIndex={-1}>
        <SkyIPhotography />
        <div className={styles.shade} aria-hidden="true" />
        <span className={styles.vertical} data-hero-motion="left" data-hero-delay="400" data-scramble-enter><ScrambleText text="PERSPECTIVE / INSPECTION / UNDERSTANDING" /></span>
        <SkyIDrone />
        <div className={`${styles.container} ${styles.heroPrinciples}`} aria-label="Our priorities">
          <span data-hero-motion="bottom" data-hero-delay="950" data-scramble-enter><HardHat aria-hidden="true" data-hero-motion="icon" data-hero-delay="1150" /><ScrambleText text="Reduced risk" /></span>
          <span data-hero-motion="top" data-hero-delay="1030" data-scramble-enter><ChartNoAxesColumnIncreasing aria-hidden="true" data-hero-motion="icon" data-hero-delay="1230" /><ScrambleText text="Data driven" /></span>
          <span data-hero-motion="bottom" data-hero-delay="1110" data-scramble-enter><Leaf aria-hidden="true" data-hero-motion="icon" data-hero-delay="1310" /><ScrambleText text="Sustainable solutions" /></span>
          <span data-hero-motion="top" data-hero-delay="1190" data-scramble-enter><UsersRound aria-hidden="true" data-hero-motion="icon" data-hero-delay="1390" /><ScrambleText text="Expert support" /></span>
          <p data-hero-motion="right" data-hero-delay="1250" data-scramble-enter><ScrambleText text="Real data." /><br /><em><ScrambleText text="Real outcomes." /></em></p>
        </div>
      </section>
      <SkyISections sisterUrl={sisterUrl} />
    </main>
    <SkyIReveals />
    <SkyIHeroMotion />
    {/* ===== Footer Section ===== */}
    <footer id="skyi-footer" className={styles.fullFooter}><div className={styles.container}><span className={styles.footerMark}>Sky I</span><div><a href="#contact">Contact the inspection team ↗</a><a href={sisterUrl}>Skyriders — access specialists ↗</a><Link href="/">Company selection ↗</Link><SkyIControls /></div><p>Industrial drone inspection · South Africa</p></div></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </SkyIProvider>;
}
