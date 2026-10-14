// Scope commitments, not client endorsements, certifications or inspection results.
export const skyIConfidence = {
  eyebrow: "Confidence",
  context: "Know what you’re commissioning",
  emphasis: "An informed next step.",
  introduction: ["Before you commission an inspection, establish what will be", "covered, what will be documented and who will use the evidence."],
  questions: [
    { title: "What will be inspected?", body: "Agree the asset, surfaces and areas of concern. Access and operating conditions shape the scope; a drone view does not replace every form of investigation." },
    { title: "What will you receive?", body: "Discuss the photographs, video or other documentation needed for your decision. Coverage, format and any thermal requirement are agreed for the specific brief." },
    { title: "What happens after the inspection?", body: "Use the agreed views to discuss further investigation or maintenance. If the next task needs physical access, Skyriders’ rope-access work is scoped separately." },
  ],
  action: "Discuss your inspection",
  disciplines: "Aerial inspection  /  Structural assets  /  Actionable evidence",
  imagery: {
    scene: "/images/skyi/confidence-scene-generated-v2-20261014.png",
    access: "/images/skyi/confidence-access-generated-20261014.png",
    evidence: "/images/skyi/confidence-evidence-generated-20261014.png",
    caption: "Illustrative inspection scene",
  },
} as const;
