# Asset intake

Current source assets are at `C:\Users\ISHE-GAMING\Desktop\App Dev\Ropeaccess`. Preserve the originals. New assets can be placed in `C:\Users\ISHE-GAMING\Desktop\App Dev\Ropeaccess\public\images\incoming`; the assigned agent will copy approved derivatives into `web/public/images/`. Ishe need not edit code or rename files.

| File at project root | Inspection | Approved use |
| --- | --- | --- |
| `hero-bg.jpg` | 1672×941 JPEG; warm access structure and cool industrial view | Skyriders pre-landing background; gradient keeps text legible. |
| `sky-bg.jpg` | 1916×821 JPEG; industrial wall, sky and Elios 3 | Sky I pre-landing background. Crop to emphasise architecture and avoid duplicating the visible selectable aircraft. |
| `rope-cutout.png` | 1024×1536 RGBA with transparent pixels | Larger technician subject on both site variants. No CSS glow or rough polygon crop. The source retains some warm-toned pixels; keep source unchanged. |
| `elios_3.png` | 1600×1000 indexed PNG with transparency | Caged Elios 3 subject; preserve geometry. |
| `sky-logo.png` | 1500×1250 RGBA; artwork reads SKYRIDERS | Enlarged Skyriders logo. The filename does not mean Sky I. |
| `Skyriders Access Specialists Pty Ltd - Brochure - 2026.pdf` | 11 PDF pages; some image-based text | Content research only. Client marks in it are not approved for public reuse. |

Sky I has no supplied logo; the approved typographic wordmark is intentional. If a logo arrives, place it at `C:\Users\ISHE-GAMING\Desktop\App Dev\Ropeaccess\public\images\incoming\skyi-logo.svg` (or `.png`) and request a design review before replacement. Other later full-site images should have descriptive filenames plus a record of which projects may be identified publicly.

For production, create responsive WebP/AVIF background variants and alpha PNG/WebP subjects without overwriting originals. Keep intrinsic dimensions and a mobile crop where it helps. Measure actual LCP and asset weight against the site's performance targets; do not degrade fine rope/cage detail merely to reach a target byte count.
