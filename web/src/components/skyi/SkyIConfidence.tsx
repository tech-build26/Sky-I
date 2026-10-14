import { ArrowRight } from "lucide-react";
import { skyIConfidence } from "@/content/skyi-confidence";
import { ConfidenceCompass, ConfidenceContours, ConfidenceDetail, ConfidenceScene } from "./SkyIConfidenceArtwork";
import styles from "./SkyIConfidence.module.css";

export function SkyIConfidence() {
  return <section id="testimonials" className={styles.section} tabIndex={-1} aria-labelledby="skyi-confidence-title">
    <ConfidenceContours />
    <div className={styles.hero}>
      <ConfidenceScene />
      <ConfidenceCompass />
      <svg className={styles.indexRail} viewBox="0 0 70 190" fill="none" aria-hidden="true"><path d="M7 7v143" stroke="#6e8291" strokeWidth=".6" /><path d="M7 7v15" stroke="#fb8b32" /><g fontFamily="Arial,sans-serif" fontSize="12"><text x="25" y="22" fill="#f5f7f8">01</text><text x="25" y="77" fill="#536773">02</text><text x="25" y="132" fill="#536773">03</text></g></svg>
      <div className={styles.intro}>
        <p className={styles.eyebrow} data-skyi-reveal="left" data-scroll-delay="40"><span>{skyIConfidence.eyebrow}</span> / {skyIConfidence.context}</p>
        <h2 id="skyi-confidence-title" data-skyi-reveal="confidence-center" data-scroll-delay="140">Clear <span>scope.</span><strong>{skyIConfidence.emphasis}</strong></h2>
        <p className={styles.description} data-skyi-reveal="left" data-scroll-delay="240">{skyIConfidence.introduction.map(line => <span key={line}>{line} </span>)}</p>
        <a className={styles.action} href="#contact" data-skyi-reveal="confidence-center" data-scroll-delay="320"><span>{skyIConfidence.action}</span><span className={styles.actionCircle} aria-hidden="true"><ArrowRight size={24} strokeWidth={1.6} /></span></a>
        <p className={styles.disciplines} data-skyi-reveal="confidence-fade" data-scroll-delay="420">{skyIConfidence.disciplines}</p>
      </div>
    </div>
    <div className={styles.questions}>{skyIConfidence.questions.map((question, index) =>
      <div className={styles.question} key={question.title}>
        <dl className={styles.answerCopy} data-skyi-reveal={index === 1 ? "confidence-center" : index === 2 ? "right" : "left"} data-scroll-delay={index * 80}>
          <dt><span className={styles.number} aria-hidden="true">0{index + 1}</span>{question.title}</dt>
          <dd>{question.body}</dd>
        </dl>
        <ConfidenceDetail index={index} />
      </div>
    )}</div>
  </section>;
}
