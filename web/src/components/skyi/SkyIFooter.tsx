import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { skyISite } from "@/config/site";
import { enquiryEmailHref } from "@/config/enquiry";
import { SocialRail } from "../ui/social-rail";
import { SkyIControls } from "./SkyIControls";
import styles from "./SkyIFooter.module.css";

const phoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export function SkyIFooter({ sisterUrl }: { sisterUrl: string }) {
  return <footer id="skyi-footer" className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.signature} data-skyi-reveal="closing-up">
        <Link href="/" aria-label="Sky I — company selection" className={styles.logo}><Image src="/images/sky-i-logo-20261005.png" alt="Sky I" width={1254} height={1254} sizes="80px" /></Link>
        <div className={styles.identity}><p>Sky I / Industrial drone solutions</p><p className={styles.signoff}>A clearer view. A practical next step.</p></div>
        <a className={styles.back} href="#opening"><span>Back to top</span><ArrowUp size={18} aria-hidden="true" /></a>
      </div>
      <div className={styles.directory}>
        <div className={styles.contact} data-skyi-reveal="closing-left" data-scroll-delay="60">
          <h2 className={styles.label}>Keep the conversation going</h2>
          <a className={styles.email} href={enquiryEmailHref} aria-label="Email both the information and reception teams"><span>{skyISite.email}</span><ArrowUpRight size={18} aria-hidden="true" /></a>
          <a className={styles.secondaryEmail} href={enquiryEmailHref}>reception@ropeaccess.co.za</a>
          <nav className={styles.navigation} aria-label="Footer navigation"><a href="#about">About</a><a href="#services">Services</a><a href="#industries">Sectors</a><a href="#safety">Before we fly</a><a href="#contact">Contact</a></nav>
        </div>
        <div className={styles.office} data-skyi-reveal="closing-up" data-scroll-delay="140"><h2 className={styles.label}>Midrand <span>Gauteng</span></h2><address>{skyISite.address}</address><a href={phoneHref(skyISite.phone)}>{skyISite.phone}<ArrowUpRight size={16} aria-hidden="true" /></a></div>
        <div className={styles.office} data-skyi-reveal="closing-right" data-scroll-delay="220"><h2 className={styles.label}>{skyISite.regionalOffice.name} <span>Mpumalanga</span></h2><address>{skyISite.regionalOffice.address}</address><a href={phoneHref(skyISite.regionalOffice.phone)}>{skyISite.regionalOffice.phone}<ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </div>
      <div className={styles.family} data-skyi-reveal="closing-up" data-scroll-delay="120">
        <a className={styles.sister} href={sisterUrl}><Image src="/images/sky-logo.png" alt="Skyriders" width={1500} height={1250} sizes="64px" /><span><span className={styles.sisterLabel}>Our rope access sister company</span><span className={styles.sisterAction}>Meet Skyriders <ArrowUpRight size={15} aria-hidden="true" /></span></span></a>
        <div className={styles.social}><span>Skyriders social pages</span><SocialRail className={styles.socialRail} /></div>
      </div>
      <div className={styles.bottom} data-skyi-reveal="closing-up" data-scroll-delay="200"><p>© {new Date().getFullYear()} Sky I · South Africa</p><a href="#enquiry-privacy">Your enquiry details</a><Link href="/">Company selection <ArrowUpRight size={13} aria-hidden="true" /></Link></div>
      <SkyIControls />
    </div>
  </footer>;
}
