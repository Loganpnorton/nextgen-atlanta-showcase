import type { ApiRequest, ApiResponse } from "./http-types";
import { Resend } from "resend";

const SUPPORT_EMAIL = "support@nextgenatlanta.com";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseBody(req: ApiRequest): Record<string, unknown> {
  const raw = req.body;
  if (raw == null) return {};
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  if (typeof raw === "object") return raw as Record<string, unknown>;
  return {};
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ error: "Email service is not configured" });
  }

  const from =
    process.env.RESEND_FROM?.trim() || "NextGen Atlanta <onboarding@resend.dev>";

  const body = parseBody(req);
  const businessName =
    typeof body.businessName === "string" ? body.businessName.trim() : "";
  const websiteUrl =
    typeof body.websiteUrl === "string" ? body.websiteUrl.trim() : "";
  const frustration =
    typeof body.frustration === "string" ? body.frustration.trim() : "";

  if (!businessName) {
    return res.status(400).json({ error: "Business name is required" });
  }
  if (businessName.length > 200 || websiteUrl.length > 500 || frustration.length > 5000) {
    return res.status(400).json({ error: "One or more fields are too long" });
  }

  const resend = new Resend(apiKey);

  const html = `
    <h2>New mockup request</h2>
    <p><strong>Business name:</strong> ${escapeHtml(businessName)}</p>
    <p><strong>Current website:</strong> ${websiteUrl ? escapeHtml(websiteUrl) : "<em>Not provided</em>"}</p>
    <p><strong>Biggest frustration:</strong></p>
    <p>${frustration ? escapeHtml(frustration).replace(/\n/g, "<br/>") : "<em>Not provided</em>"}</p>
  `;

  const { data, error } = await resend.emails.send({
    from,
    to: SUPPORT_EMAIL,
    subject: `Mockup request: ${businessName}`,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Failed to send message. Please try again later." });
  }

  return res.status(200).json({ ok: true, id: data?.id });
}
