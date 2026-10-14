// ===== Sky I service-first hero =====
import { getSkyridersUrl, skyISite } from "@/config/site";
import Image from "next/image";
import { SkyIProvider } from "./SkyIProvider";
import { SkyINavigation } from "./SkyINavigation";
import { SkyIFooter } from "./SkyIFooter";
import { SkyIDrone } from "./SkyIDrone";
import { SkyISections } from "./SkyISections";
import { SkyIReveals } from "./SkyIReveals";
import { SkyIHeroMotion } from "./SkyIHeroMotion";
import { SkyIHeroBenefits } from "./SkyIHeroBenefits";
import { SkyIParallaxTransition } from "./SkyIParallaxTransition";
import { SkyIAbout } from "./SkyIAbout";
import { skyIHero } from "@/content/skyi-hero";
import styles from "./SkyI.module.css";
import hero from "./SkyIHero.module.css";
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
      <SkyIParallaxTransition>
      <section id="opening" className={`${styles.opening} ${hero.hero}`} aria-labelledby="skyi-title" tabIndex={-1} data-parallax-layers>
        <div className={hero.backdrop} aria-hidden="true" data-parallax-layer="1"><Image src="/images/skyi/charcoal-studio-floor-20261012.png" alt="" fill sizes="100vw" priority /></div>
        <span className={hero.vertical} data-hero-enter="left">SKY I / DRONE SERVICES</span>
        <div className={hero.introduction} data-intro-phase="initial" data-parallax-layer="2">
          <div className={`${hero.introPanel} ${hero.initialPanel}`} data-intro-initial aria-hidden="true">
            <p className={hero.eyebrow} data-hero-enter="down" data-hero-delay="80">{skyIHero.opening.eyebrow}</p>
            <p className={`${hero.initialHeading} ${hero.revealMask}`}><span data-hero-enter="up" data-hero-delay="140">{skyIHero.opening.heading} <em>{skyIHero.opening.emphasis}</em></span></p>
            <p className={hero.initialDescription} data-hero-enter="up" data-hero-delay="220">{skyIHero.opening.description}</p>
          </div>
          <div className={`${hero.introPanel} ${hero.finalPanel}`} data-intro-final>
            <p className={hero.eyebrow} data-intro-enter="left">{skyIHero.eyebrow}</p>
            <h1 id="skyi-title" className={`${hero.heading} ${hero.revealMask}`} tabIndex={-1}><span data-intro-enter="up">What do you <em>need</em> us to do?</span></h1>
            <p className={hero.description} data-intro-enter="right">{skyIHero.description}</p>
          </div>
        </div>
        <SkyIDrone />
        <SkyIHeroBenefits />
      </section>
      <SkyIAbout sisterUrl={sisterUrl} />
      </SkyIParallaxTransition>
      <SkyISections />
    </main>
    <SkyIReveals />
    <SkyIHeroMotion />
    {/* ===== Footer Section ===== */}
    <SkyIFooter sisterUrl={sisterUrl} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </SkyIProvider>;
}
