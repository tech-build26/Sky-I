import Link from "next/link";
import { getSiteBrand } from "@/config/brands";

export default function NotFound() {
  const site = getSiteBrand();
  return (
    <main className={`preview-page preview-page--${site.id}`} role="main">
      <p className="preview-eyebrow">404 Error / Route Unavailable</p>
      <h1>Page Not Found</h1>
      <p>
        The page you are looking for does not exist on {site.name}. You can return to the pre-landing
        experience or explore the brand home.
      </p>
      <div style={{ display: "flex", gap: "16px", marginTop: "24px", flexWrap: "wrap" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: "44px",
            minWidth: "44px",
            padding: "8px 18px",
            border: "1px solid var(--focus)",
            borderRadius: "4px",
            color: "var(--light)",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          Return to Start
        </Link>
        <Link
          href="/home/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: "44px",
            minWidth: "44px",
            padding: "8px 18px",
            border: "1px solid currentColor",
            borderRadius: "4px",
            color: "var(--light)",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          {site.name} Home
        </Link>
      </div>
    </main>
  );
}
