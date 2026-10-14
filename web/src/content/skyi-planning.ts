// Profile page 8 supports indoor/outdoor, photo/video and thermal applications.
// Site planning questions are editorial guidance, not a safety certification.
export const skyIPlanning = [
  { name: "view", label: "Where do you need a view?", options: ["Inside an asset", "Outside a structure", "Let’s establish it"], notes: ["Tell us the entry points, internal dimensions and area of concern.", "Identify the structure, surrounding activity and surfaces to examine.", "A site description or existing photographs are a useful starting point."] },
  { name: "conditions", label: "What are the site conditions?", options: ["In operation", "Planned downtime", "To be confirmed"], notes: ["Share the operating conditions and any limits on access. Suitability needs assessment.", "Share the available inspection window and the site’s access requirements.", "The team can discuss the information needed to scope the work."] },
  { name: "evidence", label: "What will help your next decision?", options: ["Photographs", "Video", "Discuss thermal"], notes: ["Define the details and wider views your team needs to review.", "Describe the area or route you need recorded and how you intend to use it.", "Thermal suitability and available equipment are agreed for the specific brief."] },
] as const;

export type SkyIEnquirySeed = { message: string };
export const skyIEnquiryEvent = "skyi:enquiry-seed";
