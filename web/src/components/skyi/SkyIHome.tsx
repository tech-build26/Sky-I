// ===== Sky I photography-led hero =====
import { getSkyridersUrl, skyISite } from "@/config/site";
import Link from "next/link";
import { skyICopy } from "@/content/skyi";
import { SkyIProvider } from "./SkyIProvider";
import { SkyINavigation } from "./SkyINavigation";
import { SkyIPhotography } from "./SkyIPhotography";
import { SkyIControls } from "./SkyIControls";
import { SkyIDrone } from "./SkyIDrone";
import { SkyISections } from "./SkyISections";
import { SkyIReveals } from "./SkyIReveals";
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
        <SkyIDrone />
        <div className={styles.shade} aria-hidden="true" />
        <span className={styles.vertical}>PERSPECTIVE / INSPECTION / UNDERSTANDING</span>
        <div className={`${styles.container} ${styles.openingCopy}`}>
          <p className={styles.label}>{skyICopy.discipline}</p>
          <h1 id="skyi-title" tabIndex={-1}>A clearer view.<br /><em>A better next step.</em></h1>
          <p className={styles.intro}>{skyICopy.introduction}</p>
          <div className={styles.heroActions}><a className={styles.heroAction} href="#contact" data-magnetic>Request an inspection <span aria-hidden="true">↗</span></a><a href="#services">Our inspection approach <span aria-hidden="true">↓</span></a></div>
          {/* ===== Inspection-to-intervention context, within the hero ===== */}
          <details id="inspection" className={styles.perspective} tabIndex={-1}>
            <summary>Inspection to intervention <span aria-hidden="true">+</span></summary>
            <div><p>{skyICopy.partnerBody}</p><a href={sisterUrl}>Skyriders, our rope access sister company <span aria-hidden="true">↗</span></a></div>
          </details>
        </div>
        {/* ===== Hero baseline ===== */}
        <div className={`${styles.container} ${styles.baseline}`}><span>Sky I inspects. Skyriders does the work.</span><Link href="/">Company selection <span aria-hidden="true">↗</span></Link></div>
      </section>
      <SkyISections sisterUrl={sisterUrl} />
    </main>
    <SkyIReveals />
    {/* ===== Footer Section ===== */}
    <footer id="skyi-footer" className={styles.fullFooter}><div className={styles.container}><span className={styles.footerMark}>Sky I</span><div><a href="#contact">Contact the inspection team ↗</a><a href={sisterUrl}>Skyriders — access specialists ↗</a><Link href="/">Company selection ↗</Link><SkyIControls /></div><p>Industrial drone inspection · South Africa</p></div></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </SkyIProvider>;
}
