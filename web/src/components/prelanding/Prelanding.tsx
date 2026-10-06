import Image from "next/image";
import Link from "next/link";
import { brands, homeHref, type BrandId } from "@/config/brands";
import { choices, socialLinks } from "@/content/prelanding";
import { IndustryStrip } from "./IndustryStrip";
import { RotatingIntro } from "./RotatingIntro";
import { SubjectInteractions } from "./SubjectInteractions";

function BrandMark({ brand }: { brand: BrandId }) {
  const company = brands[brand];
  return (
    <Image
      className={`${brand}-mark`}
      src={company.logo}
      alt={company.logoAlt}
      width={company.logoWidth}
      height={company.logoHeight}
      sizes={brand === "skyriders" ? "(max-width: 800px) 105px, 164px" : "(max-width: 800px) 88px, 137px"}
      priority
    />
  );
}

function SocialIcon({ name }: { name: "Facebook" | "LinkedIn" }) {
  return name === "Facebook" ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 22V12.9H16l.4-3.1h-2.8V7.9c0-.9.3-1.5 1.5-1.5h1.5V3.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.3H8v3.1h2.5V22h3.1Z" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.3a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM3.6 9.8h3.2V20H3.6V9.8Zm5.2 0h3.1v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.1 3.9 4.8V20h-3.3v-5.1c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V20H8.8V9.8Z" /></svg>
  );
}

export function Prelanding({ site }: { site: BrandId }) {
  const order: BrandId[] = site === "skyriders" ? ["skyriders", "skyi"] : ["skyi", "skyriders"];
  return (
    <main className={`prelanding prelanding--${site}`}>
      <div className="scene-backdrop" aria-hidden="true" />
      <header className="brandbar" aria-label="Company sites">
        {order.map((brand) => (
          <Link className={`brandbar-link brandbar-link--${brand}`} data-brand-choice={brand} href={homeHref(site, brand)} key={brand} aria-label={`Explore ${brands[brand].name}`}>
            <BrandMark brand={brand} />
          </Link>
        ))}
      </header>
      <span className="vertical-label" aria-hidden="true">{brands[site].verticalLabel}</span>
      <nav className="social-rail" aria-label="Skyriders social pages">
        {socialLinks.map(({ name, href }) => (
          <a className={`social-link social-link--${name.toLowerCase()}`} href={href} key={name} target="_blank" rel="noopener noreferrer" aria-label={`Skyriders on ${name}`}>
            <SocialIcon name={name} />
          </a>
        ))}
      </nav>
      <RotatingIntro />
      <nav className="choices" aria-label="Choose a company">
        {order.map((brand) => {
          const company = brands[brand];
          const choice = choices[brand];
          return (
            <Link className={`destination destination--${brand}`} data-brand-choice={brand} href={homeHref(site, brand)} key={brand} aria-label={`Enter ${company.name}: ${company.description}`}>
              <span className="subject-motion">
                <Image
                  className="destination-subject"
                  src={choice.image}
                  alt={choice.imageAlt}
                  width={brand === "skyriders" ? 1024 : 1600}
                  height={brand === "skyriders" ? 1536 : 1000}
                  sizes={brand === "skyriders" ? "(max-width: 800px) 300px, 35vw" : "(max-width: 800px) 420px, 45vw"}
                  priority
                />
              </span>
              <span className="destination-caption">
                <span className="destination-copy">
                  <span className="destination-overline">{choice.number} / {company.discipline}</span>
                  <span className="destination-name">Enter {company.name}</span>
                  <span className="destination-description">{company.description}</span>
                </span>
              </span>
            </Link>
          );
        })}
      </nav>
      <IndustryStrip />
      <SubjectInteractions />
    </main>
  );
}
