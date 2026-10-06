"use client";

// ===== Local inspection-brief builder; no simulated submission =====
import { useRef, useState } from "react";
import { skyISite } from "@/config/site";
import styles from "./SkyI.module.css";

export function SkyIContact() {
  const form = useRef<HTMLFormElement>(null);
  const [asset, setAsset] = useState("");
  const [location, setLocation] = useState("");
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");
  const prepare = () => {
    if (!form.current?.reportValidity()) return null;
    const data = new FormData(form.current);
    return ["Sky I — inspection brief", "", ...["Name", "Company", "Email", "Phone", "Industry", "Asset", "Location", "Inspection question"].map(label => `${label}: ${String(data.get(label) || "—")}`)].join("\n");
  };
  return <form ref={form} className={styles.contactForm} onSubmit={event => {
    event.preventDefault();
    const text = prepare();
    if (!text) return;
    window.location.href = `mailto:${skyISite.email}?subject=${encodeURIComponent(`Inspection enquiry — ${asset}`)}&body=${encodeURIComponent(text)}`;
    setMessage("Your email app will open with the brief. Review it and send when you are ready.");
  }}>
    <div className={styles.formFields}>
      <label>Name<input name="Name" autoComplete="name" required maxLength={120} /></label>
      <label>Company<input name="Company" autoComplete="organization" required maxLength={160} /></label>
      <label>Email<input name="Email" type="email" autoComplete="email" required maxLength={254} /></label>
      <label><span>Phone (optional)</span><input name="Phone" type="tel" autoComplete="tel" maxLength={40} /></label>
      <label><span id="skyi-industry-label">Industry</span><select name="Industry" aria-labelledby="skyi-industry-label" required defaultValue=""><option value="" disabled>Select your industry</option>{["Power generation","Mining","Petroleum & petrochemical","Construction","Facilities maintenance","Municipal infrastructure","Other"].map(item => <option key={item}>{item}</option>)}</select></label>
      <label>Asset or structure<input name="Asset" value={asset} onChange={event => setAsset(event.target.value)} placeholder="e.g. tank, stack, building" required maxLength={160} /></label>
      <label className={styles.fullField}>Location<input name="Location" autoComplete="address-level2" value={location} onChange={event => setLocation(event.target.value)} required maxLength={200} /></label>
      <label className={styles.fullField}>What needs to be seen?<textarea name="Inspection question" value={question} onChange={event => setQuestion(event.target.value)} required maxLength={2000} rows={4} /></label>
    </div>
    <aside className={styles.briefSummary} aria-label="Your inspection brief">
      <span className={styles.label}>Your brief</span><h3>{asset || "The asset comes first."}</h3><p>{location || "Add the location."}</p><p>{question || "What question should the inspection answer?"}</p>
      <button type="submit" className={styles.briefButton} data-magnetic>Draft inspection email <span aria-hidden="true">↗</span></button>
      <button type="button" className={styles.downloadBrief} onClick={() => {
        const text = prepare(); if (!text) return;
        const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
        const link = document.createElement("a"); link.href = url; link.download = "sky-i-inspection-brief.txt"; link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        setMessage("Your brief has downloaded to your device. Nothing has been sent.");
      }}>Download the brief <span aria-hidden="true">↓</span></button>
      <p className={styles.formNote}>Open a draft in your email app, or download a copy. Review before sending.</p>
      <p role="status">{message}</p>
    </aside>
  </form>;
}
