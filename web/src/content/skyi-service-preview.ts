// Brochure 2026, physical PDF page 8 (printed 7), reviewed 13 October 2026.
// Applications describe inspection scope; no credentials or payload ownership inferred.
export const skyIServicePreview = [
  {
    id: "internal-inspections", title: "Boilers & ducting", hint: "Inside the process", kind: "boiler",
    background: "/images/skyi/service-m1.jpg", backgroundPosition: "76% 45%",
    figure: "Furnace walls / elements / ducting",
    question: "What is happening beyond the access point?",
    body: "Look into boiler internals and enclosed process spaces. Visual inspection can help identify areas that need closer investigation before maintenance is planned.",
    areas: ["Burners & wall blowers", "Furnace walls & elements", "Back-pass ducting", "Vacuum furnaces"],
  },
  {
    id: "tanks-and-silos", title: "Tanks & silos", hint: "The spaces within", kind: "tank",
    background: "/images/skyi/about-tank-20261013.png", backgroundPosition: "50% 42%",
    figure: "Internal surfaces / external condition",
    question: "What does the inside reveal?",
    body: "Explore internal and external surfaces of storage assets. Start with the area of concern, the contents and the access conditions to scope a useful inspection.",
    areas: ["Storage tanks", "Silo interiors & exteriors", "Reservoirs", "Enclosed spaces"],
  },
  {
    id: "external-inspections", title: "Towers & stacks", hint: "A view at height", kind: "tower",
    background: "/images/skyi/about-stack-20261013.png", backgroundPosition: "65% 38%",
    figure: "High-level surfaces / cladding / lagging",
    question: "Which details are out of reach?",
    body: "Examine elevated structures from a different viewpoint. Agree the surfaces and connections to document, then use those views to plan further investigation.",
    areas: ["Cooling towers", "Smoke stacks", "Flare stacks", "Cladding & lagging"],
  },
  {
    id: "buildings-and-roofs", title: "Buildings & roofs", hint: "Above the everyday", kind: "building",
    background: "/images/skyi/about-facade-20261013.png", backgroundPosition: "65% 36%",
    figure: "Roof surfaces / building envelope",
    question: "What can you see from above?",
    body: "Bring roof areas and exterior surfaces into view. Tell us where deterioration or an access constraint is prompting a closer look.",
    areas: ["Roofing", "Building exteriors", "Dam walls", "Tower reservoirs"],
  },
  {
    id: "thermal-inspections", title: "Thermal inspection", hint: "Another layer of information", kind: "thermal",
    background: "/images/skyi/inspection-infrastructure.png", backgroundPosition: "70% 50%",
    figure: "Surface patterns / areas for investigation",
    question: "Would a thermal view help answer your question?",
    body: "Discuss thermal imagery alongside the visual inspection. Suitability, equipment and operating conditions are agreed for the particular asset and inspection brief.",
    areas: ["Thermal applications", "Visual context", "Site conditions", "Inspection objectives"],
  },
] as const;
