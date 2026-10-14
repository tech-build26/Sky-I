import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { skyIAbout } from "@/content/skyi-about";
import { SkyIInspectionVideo } from "./SkyIInspectionVideo";
import styles from "./SkyIAbout.module.css";

export function SkyIAbout({ sisterUrl }: { sisterUrl: string }) {
  return <section id="about" className={styles.section} tabIndex={-1} aria-labelledby="skyi-about-title">
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.monologue}>
          <p className={styles.eyebrow} data-about-enter="left">{skyIAbout.eyebrow}</p>
          <h2 id="skyi-about-title" className={styles.heading}>
            <span className={styles.titleMask}><span data-about-enter="left">{skyIAbout.heading}</span></span>
            <span className={styles.titleMask}><span data-about-enter="right">{skyIAbout.emphasisParts.lead} <em>{skyIAbout.emphasisParts.word}</em> {skyIAbout.emphasisParts.tail}</span></span>
          </h2>
          <div className={styles.body}>{skyIAbout.paragraphs.map((paragraph, index) => <p key={paragraph} data-about-enter={index % 2 ? "right" : "left"}>{paragraph}</p>)}</div>
          <div className={styles.invitation}>
            <p data-about-enter="left">{skyIAbout.invitation}</p>
            <a className={styles.action} href="#skyi-about-story" data-about-enter="up"><span className={styles.orbit} aria-hidden="true"><ArrowUpRight strokeWidth={1.2} /></span><span>{skyIAbout.action}</span></a>
          </div>
        </div>
        <figure className={styles.footage}>
          <div className={styles.footageFrame}>
            <SkyIInspectionVideo className={styles.inspectionVideo} src={skyIAbout.footage.src} poster={skyIAbout.footage.poster} />
          </div>
          <figcaption className={styles.footageCaption}>{skyIAbout.footage.caption}</figcaption>
        </figure>
      </div>
      <div id="skyi-about-story" className={styles.partner} tabIndex={-1} aria-labelledby="skyi-partner-title">
        <div className={styles.partnerMedia} aria-hidden="true" data-about-enter="image"><Image src={skyIAbout.partner.image} alt="" fill sizes="(max-width: 767px) 90vw, 92vw" /></div>
        <p className={styles.partnerEyebrow} data-about-enter="left">{skyIAbout.partner.eyebrow.map(line => <span key={line}>{line}</span>)}</p>
        <div className={styles.partnerCopy}>
          <h3 id="skyi-partner-title" data-about-enter="up">{skyIAbout.partner.heading.lead} <em>{skyIAbout.partner.heading.word}</em> {skyIAbout.partner.heading.tail}</h3>
          <p data-about-enter="left">{skyIAbout.continuation}</p>
        </div>
        <a className={styles.action + " " + styles.partnerLink} href={sisterUrl} data-about-enter="up"><span className={styles.orbit} aria-hidden="true"><ArrowUpRight strokeWidth={1.2} /></span><span>{skyIAbout.partner.action}</span></a>
      </div>
    </div>
  </section>;
}
