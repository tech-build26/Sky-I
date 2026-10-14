"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Info } from "lucide-react";
import { skyISolutions } from "@/content/skyi-solutions";
import { enquiryEmailHref } from "@/config/enquiry";
import { skyIEnquiryEvent, type SkyIEnquirySeed } from "@/content/skyi-planning";
import styles from "./SkyIContact.module.css";

export function SkyIContact() {
  const [message, setMessage] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deliveryAvailable, setDeliveryAvailable] = useState<boolean | null>(null);
  const requestId = useRef("");
  const started = useRef(0);
  const form = useRef<HTMLFormElement>(null);
  const enquiry = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    started.current = Date.now();
    const controller = new AbortController();
    void fetch("/api/enquiry/", { signal: controller.signal, cache: "no-store" }).then(result => result.json()).then(result => setDeliveryAvailable(result.available === true)).catch(() => { if (!controller.signal.aborted) setDeliveryAvailable(false); });
    const seed = (event: Event) => {
      const detail = (event as CustomEvent<SkyIEnquirySeed>).detail;
      if (!enquiry.current || typeof detail?.message !== "string") return;
      const current = enquiry.current.value;
      if (current.includes(detail.message)) return;
      const next = current.trim() ? `${current}\n\n${detail.message}` : detail.message;
      if (next.length > 2000) { setMessage("Your existing message has been kept. Add the planning details you need within the message limit."); return; }
      enquiry.current.value = next;
      requestId.current = "";
      setMessage("Your planning choices are added below. Complete the site details before sending your enquiry.");
    };
    window.addEventListener(skyIEnquiryEvent, seed);
    return () => { controller.abort(); window.removeEventListener(skyIEnquiryEvent, seed); };
  }, []);
  useEffect(() => {
    if (Object.keys(errors).length) form.current?.querySelector<HTMLInputElement>('[aria-invalid="true"]')?.focus();
  }, [errors]);
  return <form ref={form} className={styles.form} aria-label="Sky I enquiry" aria-busy={sending} onInput={() => { requestId.current = ""; setErrors({}); setMessage(""); }} onSubmit={async event => {
    event.preventDefault();
    if (sending) return;
    const data = new FormData(event.currentTarget);
    if (!deliveryAvailable) {
      const body = ["Sky I enquiry", "", ...["Name", "Email", "Service", "Message"].map(field => `${field}: ${String(data.get(field) || "To discuss").trim()}`)].join("\n");
      const draft = document.createElement("a");
      draft.href = `${enquiryEmailHref}?subject=${encodeURIComponent("Sky I inspection enquiry")}&body=${encodeURIComponent(body)}`;
      draft.click();
      setMessage("Email draft requested for both inboxes. Review and send it from your email app; this website has not sent your enquiry.");
      return;
    }
    requestId.current ||= crypto.randomUUID();
    setSending(true); setErrors({}); setMessage("Sending your enquiry…");
    try {
      const result = await fetch("/api/enquiry/", { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": requestId.current }, signal: AbortSignal.timeout(40000), body: JSON.stringify({ name: data.get("Name"), email: data.get("Email"), service: data.get("Service"), message: data.get("Message"), website: data.get("Website"), started: started.current }) });
      const reply = await result.json();
      setMessage(typeof reply.message === "string" ? reply.message : "Delivery could not be confirmed. Please contact the team directly.");
      if (reply.errors) setErrors(reply.errors);
    } catch { setMessage("Delivery could not be confirmed. Your details are kept below. Please retry or contact the team directly."); }
    finally { setSending(false); }
  }}>
    <p className={styles.draftNote}>{deliveryAvailable ? "Your enquiry goes to both our information and reception teams." : "Online sending is unavailable. Prepare an email draft to both teams, then review and send it from your email app."}</p>
    <div className={styles.trap} aria-hidden="true"><label>Leave this empty<input name="Website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className={styles.fields}>
      <label>Your name<input name="Name" autoComplete="name" required maxLength={120} disabled={sending} aria-invalid={!!errors.name} aria-describedby={errors.name ? "enquiry-name-error" : undefined} />{errors.name && <span id="enquiry-name-error" className={styles.error}>{errors.name}</span>}</label>
      <label>Email address<input name="Email" type="email" autoComplete="email" required maxLength={254} disabled={sending} aria-invalid={!!errors.email} aria-describedby={errors.email ? "enquiry-email-error" : undefined} />{errors.email && <span id="enquiry-email-error" className={styles.error}>{errors.email}</span>}</label>
      <label className={styles.fullField}>Service <span className={styles.optional}>optional</span><select name="Service" defaultValue="" disabled={sending} aria-invalid={!!errors.service} aria-describedby={errors.service ? "enquiry-service-error" : undefined}><option value="">Choose a service</option>{skyISolutions.map(solution => <option key={solution.id}>{solution.title}</option>)}</select>{errors.service && <span id="enquiry-service-error" className={styles.error}>{errors.service}</span>}</label>
      <label className={styles.fullField}>What do you need?<textarea ref={enquiry} name="Message" required maxLength={2000} rows={4} disabled={sending} aria-invalid={!!errors.message} aria-describedby={errors.message ? "enquiry-message-error" : undefined} placeholder="The site, asset and work you have in mind." />{errors.message && <span id="enquiry-message-error" className={styles.error}>{errors.message}</span>}</label>
    </div>
    <div className={styles.formEnd}>
      <button type="submit" className={styles.prepare} disabled={sending || deliveryAvailable === null}><span>{sending ? "Sending…" : deliveryAvailable ? "Send enquiry" : "Prepare email draft"}</span><span className={styles.sendArrow}><ArrowUpRight size={22} aria-hidden="true" /></span></button>
      <span className={styles.emailInfo} onPointerEnter={event => { if (event.pointerType === "mouse") setInfoOpen(true); }} onPointerLeave={event => { if (!event.currentTarget.contains(document.activeElement)) setInfoOpen(false); }} onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); setInfoOpen(false); } }}>
        <button type="button" className={styles.infoButton} aria-label="About sending your enquiry" aria-describedby="skyi-email-info" onFocus={() => setInfoOpen(true)} onBlur={() => setInfoOpen(false)} onClick={() => setInfoOpen(true)}><Info size={18} aria-hidden="true" /></button>
        <span id="skyi-email-info" role="tooltip" className={styles.tooltip} data-open={infoOpen}>{deliveryAvailable ? "Sends to both team inboxes. If sending fails, your details stay in the form and you can email or call directly." : "Opens your email app with both recipients. Review and send the draft yourself."}</span>
      </span>
    </div>
    <p className={styles.status} role="status">{message}</p>
  </form>;
}
