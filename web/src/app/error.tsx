"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error cleanly for client diagnostics
    console.error("Application loading error:", error);
  }, [error]);

  return (
    <main className="preview-page" role="alert" aria-live="assertive">
      <p className="preview-eyebrow">Service Notice / Error Encountered</p>
      <h1>Something went wrong</h1>
      <p>
        An unexpected error occurred while loading this view. You can attempt to retry the operation
        or return to the starting page.
      </p>
      <div style={{ display: "flex", gap: "16px", marginTop: "24px", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: "44px",
            minWidth: "44px",
            padding: "8px 18px",
            border: "1px solid var(--focus, #d8af7b)",
            borderRadius: "4px",
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
            fontSize: "14px",
            fontFamily: "inherit",
          }}
        >
          Try Again
        </button>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: "44px",
            minWidth: "44px",
            padding: "8px 18px",
            border: "1px solid currentColor",
            borderRadius: "4px",
            color: "inherit",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          Return to Start
        </Link>
      </div>
    </main>
  );
}
