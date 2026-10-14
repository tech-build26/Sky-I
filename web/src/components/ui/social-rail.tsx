import type { ComponentPropsWithoutRef } from "react";
import { socialLinks } from "@/content/prelanding";

function SocialIcon({ name }: { name: "Facebook" | "LinkedIn" }) {
  return name === "Facebook" ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 22V12.9H16l.4-3.1h-2.8V7.9c0-.9.3-1.5 1.5-1.5h1.5V3.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.3H8v3.1h2.5V22h3.1Z" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.3a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM3.6 9.8h3.2V20H3.6V9.8Zm5.2 0h3.1v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.1 3.9 4.8V20h-3.3v-5.1c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V20H8.8V9.8Z" /></svg>
  );
}

export function SocialRail({ className = "", ...props }: ComponentPropsWithoutRef<"nav">) {
  return <nav className={`social-rail ${className}`} aria-label="Skyriders social pages" {...props}>
    {socialLinks.map(({ name, href }) => <a className={`social-link social-link--${name.toLowerCase()}`} href={href} key={name} target="_blank" rel="noopener noreferrer" aria-label={`Skyriders on ${name}`}><SocialIcon name={name} /></a>)}
  </nav>;
}
