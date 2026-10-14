import nextEnv from "@next/env";
import nodemailer from "nodemailer";
nextEnv.loadEnvConfig(process.cwd());
const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } = process.env;
const port = Number(process.env.SMTP_PORT || "465");
if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM || ![465,587].includes(port)) {
  console.error("Add the Afrihost SMTP settings to the private environment before verifying."); process.exit(1);
}
const transport = nodemailer.createTransport({host:SMTP_HOST,port,secure:port===465,requireTLS:true,auth:{user:SMTP_USER,pass:SMTP_PASSWORD},tls:{minVersion:"TLSv1.2",rejectUnauthorized:true},connectionTimeout:15000,greetingTimeout:10000,socketTimeout:20000});
try { await transport.verify(); console.log("SMTP connection and authentication verified. No email sent; both inboxes still need a delivery check."); }
catch { console.error("SMTP verification failed. Check the exact mailbox host, secure port and credentials in Afrihost."); process.exitCode=1; }
finally { transport.close(); }
