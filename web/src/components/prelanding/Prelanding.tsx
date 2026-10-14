import Image from "next/image";
import Link from "next/link";
import { brands, homeHref, type BrandId } from "@/config/brands";
import { choices } from "@/content/prelanding";
import { SocialRail } from "../ui/social-rail";
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
      <SocialRail />
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
