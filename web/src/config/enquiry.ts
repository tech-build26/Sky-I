// Owner-confirmed 13 October: every website enquiry goes to both mailboxes.
export const enquiryRecipients = ["info@ropeaccess.co.za", "reception@ropeaccess.co.za"] as const;
export const enquiryEmailHref = `mailto:${enquiryRecipients.join(",")}`;
export const enquiryLimits = { name: 120, email: 254, message: 2000 } as const;
