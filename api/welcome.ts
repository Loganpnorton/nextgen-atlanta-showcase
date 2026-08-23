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

  const from = process.env.RESEND_FROM?.trim() || "NextGen Atlanta <onboarding@resend.dev>";
  const body = parseBody(req);
  const resend = new Resend(apiKey);

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <h1 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">New Client Onboarding Dossier</h1>
      
      <h2 style="color: #333; margin-top: 30px;">1. The Basics</h2>
      <p><strong>Business Name:</strong> ${escapeHtml(String(body.businessName || ""))}</p>
      <p><strong>Contact Person:</strong> ${escapeHtml(String(body.contactPerson || ""))}</p>
      <p><strong>Email:</strong> ${escapeHtml(String(body.email || ""))}</p>
      <p><strong>Phone:</strong> ${escapeHtml(String(body.phone || ""))}</p>
      <p><strong>Address & Hours:</strong><br/>${escapeHtml(String(body.address || "")).replace(/\n/g, "<br/>")}</p>

      <h2 style="color: #333; margin-top: 30px;">2. The Brand</h2>
      <p><strong>Brand Colors:</strong> ${escapeHtml(String(body.brandColors || ""))}</p>
      <p><strong>Social Links:</strong> ${escapeHtml(String(body.socialLinks || ""))}</p>
      <p><strong>Assets Link:</strong> <a href="${escapeHtml(String(body.assetsLink || ""))}">${escapeHtml(String(body.assetsLink || ""))}</a></p>

      <h2 style="color: #333; margin-top: 30px;">3. The Pitch</h2>
      <p><strong>Elevator Pitch:</strong><br/>${escapeHtml(String(body.elevatorPitch || "")).replace(/\n/g, "<br/>")}</p>
      <p><strong>Top 3 Services:</strong> ${escapeHtml(String(body.topServices || ""))}</p>
      <p><strong>CTA Goal:</strong> ${escapeHtml(String(body.ctaGoal || ""))}</p>

      <h2 style="color: #333; margin-top: 30px;">4. Domain & Tech</h2>
      <p><strong>Has Domain:</strong> ${escapeHtml(String(body.hasDomain || ""))}</p>
      ${body.hasDomain === "no" ? `
        <p><strong>Ideal Domain:</strong> ${escapeHtml(String(body.idealDomain || ""))}</p>
      ` : `
        <p><strong>Current Domain:</strong> ${escapeHtml(String(body.currentDomain || ""))}</p>
        <p><strong>Registrar:</strong> ${escapeHtml(String(body.registrar || ""))}</p>
        <p><strong>Access coordination:</strong> DNS instructions or an approved secure access process required.</p>
      `}
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from,
    to: SUPPORT_EMAIL,
    subject: `New Onboarding: ${body.businessName}`,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Failed to send message." });
  }

  return res.status(200).json({ ok: true, id: data?.id });
}
