import nodemailer from "nodemailer";
import { enquiryRecipients } from "@/config/enquiry";

export function createEnquiryTransport() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } = process.env;
  const port = Number(process.env.SMTP_PORT || "465");
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM || ![465, 587].includes(port)) return null;
  if (!/^[^\s<>@]+@ropeaccess\.co\.za$/i.test(SMTP_FROM)) return null;
  return {
    from: SMTP_FROM,
    transport: nodemailer.createTransport({
      host: SMTP_HOST, port, secure: port === 465, requireTLS: true,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
      tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
      connectionTimeout: 15000, greetingTimeout: 10000, socketTimeout: 20000,
      disableFileAccess: true, disableUrlAccess: true,
    }),
  };
}

export type Enquiry = { name: string; email: string; service: string; message: string };
export async function deliverEnquiry(enquiry: Enquiry, recipients: string[] = [...enquiryRecipients]) {
  const configuration = createEnquiryTransport();
  if (!configuration) throw new Error("SMTP_NOT_CONFIGURED");
  const { transport, from } = configuration;
  try {
    const result = await transport.sendMail({
      from: { name: "Sky I website", address: from }, to: recipients,
      replyTo: { name: enquiry.name, address: enquiry.email },
      subject: `Sky I enquiry — ${enquiry.service || "General inspection"}`,
      text: ["Sky I website enquiry", "", `Name: ${enquiry.name}`, `Email: ${enquiry.email}`, `Service: ${enquiry.service || "To discuss"}`, "", enquiry.message].join("\n"),
    });
    return result.accepted.map(address => String(address).toLowerCase());
  } finally { transport.close(); }
}
