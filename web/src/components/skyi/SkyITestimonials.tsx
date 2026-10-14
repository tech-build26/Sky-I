"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { skyITestimonialSamples } from "@/content/skyi-testimonials";
import { useSkyIMotion } from "./SkyIProvider";
import { useClientReady } from "@/hooks/useClientReady";
import styles from "./SkyITestimonials.module.css";

export function SkyITestimonials() {
  const root = useRef<HTMLElement>(null);
  const { paused, menuOpen } = useSkyIMotion();
  const ready = useClientReady();
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [columns, setColumns] = useState(3);
  useEffect(() => {
    const media = matchMedia("(max-width: 767px)");
    const tablet = matchMedia("(max-width: 1100px)");
    const resize = () => setColumns(media.matches ? 1 : tablet.matches ? 2 : 3);
    const visibility = () => setHidden(document.hidden);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .05 });
    if (root.current) observer.observe(root.current);
    resize(); visibility();
    media.addEventListener("change", resize); tablet.addEventListener("change", resize); document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); media.removeEventListener("change", resize); tablet.removeEventListener("change", resize); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  const still = expanded || paused || !ready;
  const groups = Array.from({ length: columns }, (_, column) => skyITestimonialSamples.filter((_, index) => index % columns === column));
  return <section ref={root} id="testimonials" className={styles.section} data-static={still} data-running={visible && !hidden && !menuOpen && !paused} tabIndex={-1} aria-labelledby="skyi-testimonials-title">
    <div className={styles.architecture} aria-hidden="true"><span /><span /><span /><span className={styles.quotation}>“</span></div>
    <div className={styles.layout}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Client confidence <span>Design preview</span></p>
        <h2 id="skyi-testimonials-title">A fresh perspective.<br /><em>A few kind words.</em></h2>
        <div className={styles.caption}><p>Nine illustrative voices from South Africa and the region. Sample copy for design review; these are not actual client testimonials or evidence of regional work.</p>{ready && !paused && <button type="button" aria-expanded={expanded} aria-controls="skyi-testimonial-quotes" onClick={() => setExpanded(value => !value)}>{expanded ? "Return to the moving view" : "Read all"}{expanded ? <ArrowUpRight size={18} aria-hidden="true" /> : <ArrowDownRight size={18} aria-hidden="true" />}</button>}</div>
      </div>
      <div id="skyi-testimonial-quotes" className={styles.window}>
        {groups.map((group, column) => <div className={styles.column} key={column} tabIndex={still ? undefined : 0} aria-label={`Sample quotes, column ${column + 1}. Focus pauses this column.`} data-skyi-reveal={column % 2 ? "up" : "right"} data-skyi-reveal-trigger="#testimonials" data-scroll-delay={column * 110}>
          <div className={styles.track} data-testimonial-track style={{ "--testimonial-duration": `${columns === 1 ? 96 : columns === 2 ? 55 + column * 6 : 34 + column * 5}s` } as CSSProperties}>
            {[0, 1].map(copy => <ul className={styles.batch} key={copy} aria-hidden={copy === 1 ? true : undefined} data-copy={copy}>
              {group.map(item => <motion.li key={item.location} className={styles.tile} whileHover={paused ? undefined : { y: -4 }} transition={{ duration: .4 }}>
                <span className={styles.service}>{item.service}<span aria-hidden="true">“</span></span>
                <blockquote><p>{item.quote}</p></blockquote>
                <div className={styles.attribution}><span>{item.role}</span><span>{item.location}</span></div>
              </motion.li>)}
            </ul>)}
          </div>
        </div>)}
      </div>
    </div>
  </section>;
}
