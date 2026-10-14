import { createHash } from "node:crypto";
import { enquiryLimits, enquiryRecipients } from "@/config/enquiry";
import { skyISolutions } from "@/content/skyi-solutions";
import { createEnquiryTransport, deliverEnquiry, type Enquiry } from "@/lib/enquiry-mail";

export const runtime = "nodejs";
const lifetime = 15 * 60 * 1000;
type Receipt = { fingerprint: string; expires: number; accepted: string[]; pending?: Promise<string[]> };
const receipts = new Map<string, Receipt>();
const attempts = new Map<string, { count: number; expires: number }>();
const response = (body: object, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function GET() {
  const configuration = createEnquiryTransport();
  configuration?.transport.close();
  return response({ available: !!configuration });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowed = [new URL(request.url).origin, process.env.SITE_URL].filter(Boolean);
  if (!origin || !allowed.includes(origin)) return response({ message: "Please submit the form from the Sky I website." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return response({ message: "Please use the enquiry form." }, 415);
  if (Number(request.headers.get("content-length") || 0) > 16000) return response({ message: "Your enquiry is too long." }, 413);
  let input: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error();
    const decoder = new TextDecoder();
    let text = "", bytes = 0;
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 16000) { await reader.cancel(); return response({ message: "Your enquiry is too long." }, 413); }
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    input = parsed as Record<string, unknown>;
  } catch { return response({ message: "The enquiry could not be read. Please try again." }, 400); }
  const fields = ["name", "email", "service", "message"] as const;
  const enquiry = Object.fromEntries(fields.map(field => [field, typeof input[field] === "string" ? input[field].trim() : ""])) as Enquiry;
  const errors: Record<string, string> = {};
  if (!enquiry.name || enquiry.name.length > enquiryLimits.name || /[\r\n]/.test(enquiry.name)) errors.name = "Enter your name (up to 120 characters).";
  if (enquiry.email.length > enquiryLimits.email || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(enquiry.email)) errors.email = "Enter a valid email address.";
  if (!enquiry.message || enquiry.message.length > enquiryLimits.message) errors.message = "Describe your enquiry in up to 2000 characters.";
  if (enquiry.service && !skyISolutions.some(service => service.title === enquiry.service)) errors.service = "Choose one of the listed services.";
  if (Object.keys(errors).length) return response({ message: "Please check the highlighted fields.", errors }, 400);
  if (input.website || typeof input.started !== "number" || Date.now() - input.started < 1000 || Date.now() - input.started > 24 * 60 * 60 * 1000) return response({ message: "Please refresh the form and try again, or call the team." }, 400);
  const id = request.headers.get("idempotency-key") || "";
  if (!/^[a-f\d-]{36}$/i.test(id)) return response({ message: "Please refresh the form and try again." }, 400);
  const now = Date.now();
  for (const [key, item] of receipts) if (item.expires < now && !item.pending) receipts.delete(key);
  for (const [key, item] of attempts) if (item.expires < now) attempts.delete(key);
  const fingerprint = createHash("sha256").update(JSON.stringify(enquiry)).digest("hex");
  let receipt = receipts.get(id);
  if (receipt && receipt.fingerprint !== fingerprint) return response({ message: "Your enquiry changed. Please submit it again." }, 409);
  while (receipt?.pending) { await receipt.pending.catch(() => {}); }
  const delivered = receipt?.accepted || [];
  if (enquiryRecipients.every(address => delivered.includes(address))) return response({ message: "Your enquiry has been accepted for delivery to both the information and reception teams." });
  const configuration = createEnquiryTransport();
  if (!configuration) return response({ message: "Online sending is not available yet. Your details are kept in the form; please use the email or phone links." }, 503);
  configuration.transport.close();
  // Afrihost must confirm its trusted proxy header before production; this is a
  // bounded per-process limiter, not a distributed spam-control service.
  const peer = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "direct";
  const key = createHash("sha256").update(peer).digest("hex");
  const attempt = attempts.get(key) || { count: 0, expires: now + lifetime };
  if (attempt.count >= 5 || attempts.size >= 2000 || (!receipt && receipts.size >= 2000)) return response({ message: "Please wait before trying again, or call the team." }, 429);
  attempt.count++; attempts.set(key, attempt);
  receipt ||= { fingerprint, expires: now + lifetime, accepted: [] };
  receipts.set(id, receipt);
  const remaining = enquiryRecipients.filter(address => !receipt.accepted.includes(address));
  receipt.pending = deliverEnquiry(enquiry, remaining);
  try {
    const accepted = await receipt.pending;
    receipt.accepted = [...new Set([...receipt.accepted, ...accepted])];
    if (!enquiryRecipients.every(address => receipt.accepted.includes(address))) return response({ message: "Only part of the delivery was accepted. Please retry; recipients already reached will not receive another copy in this session." }, 502);
    return response({ message: "Your enquiry has been accepted for delivery to both the information and reception teams." });
  } catch {
    return response({ message: "We could not confirm delivery. Your details are kept below. Please retry or contact the team directly." }, 502);
  } finally { delete receipt.pending; }
}
