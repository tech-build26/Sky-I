// ===== Full local navigation destinations =====
import { skyISite } from "@/config/site";
import { enquiryEmailHref } from "@/config/enquiry";
import Image from "next/image";
import { skyIFieldPhotography } from "@/content/skyi-field-photography";
import { SkyIContact } from "./SkyIContact";
import { SkyIIndustries } from "./SkyIIndustries";
import { SkyIServices } from "./SkyIServices";
import { SkyIImpact } from "./SkyIImpact";
import { SkyIConfidence } from "./SkyIConfidence";
import { SkyIPlanning } from "./SkyIPlanning";
import contactStyles from "./SkyIContact.module.css";
import { ArrowUpRight } from "lucide-react";

export function SkyISections() {
  return <>
    {/* ===== Services Section ===== */}
    <SkyIServices />
    {/* ===== Industries Section ===== */}
    <SkyIIndustries />
    <SkyIImpact />
    <SkyIConfidence />
    <SkyIPlanning />
    {/* ===== Contact Section ===== */}
    <section id="contact" className={contactStyles.section} tabIndex={-1} aria-labelledby="skyi-contact-title">
      <div className={contactStyles.photograph}>
        <Image {...skyIFieldPhotography.contact} alt={skyIFieldPhotography.contact.alt} sizes="(max-width: 900px) 100vw, (max-width: 1600px) 45vw, 690px" />
      </div>
      <div className={contactStyles.layout}>
        <div className={contactStyles.intro} data-skyi-reveal="closing-left">
          <p className={contactStyles.eyebrow}>Contact / Discuss your inspection</p>
          <h2 id="skyi-contact-title" className={contactStyles.heading}>Your site.<br />Your question.<br /><em>Let’s talk.</em></h2>
          <p className={contactStyles.description}>Share the site location, asset and question. We’ll discuss suitability, access and scope.</p>
          <a className={contactStyles.direct} href={enquiryEmailHref} aria-label="Email both the information and reception teams"><span>{skyISite.email}</span><ArrowUpRight size={22} aria-hidden="true" /></a>
          <p className={contactStyles.sharedContact}>Sky I and Skyriders share this contact team.</p>
          <div className={contactStyles.phones}><a href={`tel:${skyISite.phone.replace(/[^\d+]/g,"")}`}><span>Midrand</span>{skyISite.phone}</a><a href={`tel:${skyISite.regionalOffice.phone.replace(/[^\d+]/g,"")}`}><span>eMalahleni</span>{skyISite.regionalOffice.phone}</a></div>
        </div>
        <div className={contactStyles.enquiry} data-skyi-reveal="closing-right" data-scroll-delay="140">
          <p className={contactStyles.formHeading}>Your inspection brief</p>
          <SkyIContact />
          <noscript><p className={contactStyles.noJs}>Email the site and work you have in mind, or call the team using the links above.</p></noscript>
          <div id="enquiry-privacy" className={contactStyles.privacy} tabIndex={-1}><h3>Your enquiry details</h3><p>Your details go to information and reception through our mail service. Drafts are sent only from your email app. We keep no enquiry database; share only authorised site information.</p></div>
        </div>
      </div>
    </section>
  </>;
}
