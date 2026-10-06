// ===== Full local navigation destinations =====
import { skyISite } from "@/config/site";
import { SkyIContact } from "./SkyIContact";
import { SkyIIndustries } from "./SkyIIndustries";
import styles from "./SkyI.module.css";

const services = [
  ["Remote visual inspection", "Start with the structure or space you need to examine. Scope a remote visual inspection around the condition you need to understand and the access available at the site."],
  ["Condition documentation", "Put the findings in context. Agree the imagery, areas of interest and information needed to support the next inspection or maintenance decision."],
  ["Inspection scoping", "Use the initial perspective to identify areas that may need closer investigation. Where the task needs physical access, coordinate the next step with Skyriders."],
  ["Post-intervention review", "Where the agreed scope calls for it, return to the area after intervention for a further visual review. Define what needs to be checked before the inspection begins."],
];

export function SkyISections({sisterUrl}:{sisterUrl:string}) {
  return <>
    {/* ===== About Section ===== */}
    <section id="about" className={styles.aboutSection} tabIndex={-1} aria-labelledby="skyi-about-title">
      <div className={styles.container}><p className={styles.sectionEyebrow}>01 / About Sky I</p><div className={styles.aboutLayout} data-skyi-reveal>
        <h2 id="skyi-about-title">A remote view.<br /><em>A practical purpose.</em></h2>
        <div><p>Sky I brings a drone inspection perspective to industrial spaces and structures that are difficult to reach. The starting point is the asset and the question you need answered.</p><p>Our work complements Skyriders. Sky I finds and documents areas of interest; Skyriders provides rope-access inspection, maintenance and repair when the next step needs physical intervention.</p><a className={styles.sectionLink} href={sisterUrl}>Meet Skyriders <span aria-hidden="true">↗</span></a></div>
      </div></div>
    </section>
    {/* ===== Services Section ===== */}
    <section id="services" className={styles.servicesSection} tabIndex={-1} aria-labelledby="skyi-services-title">
      <div className={styles.container}><p className={styles.sectionEyebrow}>02 / Inspection services</p><div className={styles.servicesLayout}>
        <div data-skyi-reveal><h2 id="skyi-services-title">The question<br /><em>shapes the flight.</em></h2><p>Tell us what needs to be seen. The inspection approach follows the structure, operating environment and intended decision.</p></div>
        <div className={styles.serviceList} data-skyi-reveal>{services.map(([title,body],index)=><details key={title}><summary><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><span aria-hidden="true">+</span></summary><p>{body}</p><a href="#contact">Discuss this inspection <span aria-hidden="true">↗</span></a></details>)}</div>
      </div></div>
    </section>
    {/* ===== Industries Section ===== */}
    <section id="industries" className={styles.industriesSection} tabIndex={-1} aria-labelledby="skyi-industries-title">
      <div className={styles.container}><p className={styles.sectionEyebrow}>03 / Industries</p><h2 id="skyi-industries-title" data-skyi-reveal>Different structures.<br /><em>The same need for clarity.</em></h2><div data-skyi-reveal><SkyIIndustries /></div></div>
    </section>
    {/* ===== Approach Section ===== */}
    <section id="process" className={styles.processSection} tabIndex={-1} aria-labelledby="skyi-process-title">
      <div className={styles.container}><p className={styles.sectionEyebrow}>04 / Our approach</p><div className={styles.processHeading} data-skyi-reveal><h2 id="skyi-process-title">Before the flight,<br /><em>understand the task.</em></h2><p>A useful inspection begins with a clear brief. Match the approach to the asset and site, then define the information needed for the next decision.</p></div>
        <ol className={styles.processList} data-skyi-reveal><li><span>01</span><h3>Define the question</h3><p>The asset, location, area of concern and outcome you need.</p></li><li><span>02</span><h3>Agree the scope</h3><p>Site requirements, operating conditions, access and intended deliverables.</p></li><li><span>03</span><h3>Inspect and document</h3><p>A remote perspective focused on the agreed inspection area.</p></li><li><span>04</span><h3>Plan the next step</h3><p>Review the findings and decide where further investigation or intervention is needed.</p></li></ol>
      </div>
    </section>
    {/* ===== Contact Section ===== */}
    <section id="contact" className={styles.contactSection} tabIndex={-1} aria-labelledby="skyi-contact-title">
      <div className={styles.container}><p className={styles.sectionEyebrow}>05 / Contact</p><div className={styles.contactHeading} data-skyi-reveal><h2 id="skyi-contact-title">Tell us what<br /><em>needs inspecting.</em></h2><div><a href={`mailto:${skyISite.email}`}>{skyISite.email}</a><a href={`tel:${skyISite.phone.replace(/[^\d+]/g,"")}`}>{skyISite.phone}</a><address>{skyISite.address}</address></div></div>
        <div data-skyi-reveal><SkyIContact /></div>
        <noscript><p className={styles.noJsContact}>Email your asset, location and inspection question to <a href={`mailto:${skyISite.email}`}>{skyISite.email}</a>, or call the number above.</p></noscript>
        <div className={styles.regionalOffice}><span>eMalahleni office</span><address>{skyISite.regionalOffice.address}</address><a href={`tel:${skyISite.regionalOffice.phone.replace(/[^\d+]/g,"")}`}>{skyISite.regionalOffice.phone}</a></div>
      </div>
    </section>
  </>;
}
