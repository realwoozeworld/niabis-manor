import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple memory-based rate limiting (per IP: max 5 requests per 10 minutes)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

// Escape HTML characters to prevent XSS / HTML injection in emails
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function GET() {
  return NextResponse.json({ message: "API ცოცხალია!" });
}

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-ip";

    if (ip !== "unknown-ip" && isRateLimited(ip)) {
      return NextResponse.json(
        { error: "გთხოვთ სცადოთ ცოტა ხანში" },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { plotId, name, phone, email, comment, website } = body;

    // 2. Bot Honeypot Protection: Bots usually auto-fill hidden "website" field
    if (website) {
      // Silently accept so bot thinks it succeeded, but do not send email
      return NextResponse.json({ success: true, id: "bot-blocked" });
    }

    // 3. Validation & Length limits
    if (!name || typeof name !== "string" || !phone || typeof phone !== "string") {
      return NextResponse.json(
        { error: "სახელი და ტელეფონი სავალდებულოა" },
        { status: 400 }
      );
    }

    if (name.length > 100 || phone.length > 50 || (email && String(email).length > 150) || (comment && String(comment).length > 1000)) {
      return NextResponse.json(
        { error: "მონაცემების ზომა აჭარბებს დასაშვებ ლიმიტს" },
        { status: 400 }
      );
    }

    // 4. Sanitize / Escape inputs
    const safePlotId = escapeHtml(String(plotId || ""));
    const safeName = escapeHtml(name.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeEmail = email ? escapeHtml(String(email).trim()) : "—";
    const safeComment = comment ? escapeHtml(String(comment).trim()) : "—";

    // 5. Send Email via Resend
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["sunion31@gmail.com"],
      subject: `🏡 ახალი რეგისტრაცია — ნაკვეთი ${safePlotId}`,
      html: `
        <div style="font-family: sans-serif; padding: 24px;">
          <h2 style="color: #b8912f;">ახალი რეგისტრაცია</h2>
          <p>ნაკვეთი: <strong>${safePlotId}</strong></p>
          <p>სახელი: ${safeName}</p>
          <p>ტელეფონი: ${safePhone}</p>
          <p>ელფოსტა: ${safeEmail}</p>
          <p>კომენტარი: ${safeComment}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: "ვერ გაიგზავნა" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "სერვერის შეცდომა" }, { status: 500 });
  }
}