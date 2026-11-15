import { NextResponse } from "next/server";
import { Resend } from "resend";

// Lazily created so the constructor runs at request time (not build time)
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

// 1. IP-based rate limiting (max 5 requests per 10 minutes)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

// 2. Email & Phone cooldown (1 request per 30 minutes per email/phone)
const emailCooldownMap = new Map<string, number>();
const phoneCooldownMap = new Map<string, number>();
const CONTACT_COOLDOWN_MS = 30 * 60 * 1000; // 30 წუთი

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

function checkCooldown(map: Map<string, number>, key: string): number {
  const now = Date.now();
  const lastSent = map.get(key);
  if (lastSent && now - lastSent < CONTACT_COOLDOWN_MS) {
    return Math.ceil((CONTACT_COOLDOWN_MS - (now - lastSent)) / 60000); // დარჩენილი წუთები
  }
  return 0;
}

function cleanupOldEntries() {
  const now = Date.now();
  if (emailCooldownMap.size > 500) {
    for (const [k, time] of emailCooldownMap.entries()) {
      if (now - time > CONTACT_COOLDOWN_MS) emailCooldownMap.delete(k);
    }
  }
  if (phoneCooldownMap.size > 500) {
    for (const [k, time] of phoneCooldownMap.entries()) {
      if (now - time > CONTACT_COOLDOWN_MS) phoneCooldownMap.delete(k);
    }
  }
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

    // 2. Bot Honeypot Protection
    if (website) {
      return NextResponse.json({ success: true, id: "bot-blocked" });
    }

    // 3. Validation & Length limits
    if (!name || typeof name !== "string" || !phone || typeof phone !== "string") {
      return NextResponse.json(
        { error: "სახელი და ტელეფონი სავალდებულოა" },
        { status: 400 }
      );
    }

    if (
      name.length > 100 ||
      phone.length > 50 ||
      (email && String(email).length > 150) ||
      (comment && String(comment).length > 1000)
    ) {
      return NextResponse.json(
        { error: "მონაცემების ზომა აჭარბებს დასაშვებ ლიმიტს" },
        { status: 400 }
      );
    }

    // 4. Email & Phone Duplicate Cooldown Check
    const normalizedEmail = email ? String(email).trim().toLowerCase() : "";
    const normalizedPhone = phone.replace(/\s+/g, "").trim();

    if (normalizedEmail) {
      const emailMinutesLeft = checkCooldown(emailCooldownMap, normalizedEmail);
      if (emailMinutesLeft > 0) {
        return NextResponse.json(
          {
            error: `ამ ელ-ფოსტით მოთხოვნა უკვე გაგზავნილია. ხელახლა გაგზავნას შეძლებთ ${emailMinutesLeft} წუთში.`,
          },
          { status: 429 }
        );
      }
    }

    const phoneMinutesLeft = checkCooldown(phoneCooldownMap, normalizedPhone);
    if (phoneMinutesLeft > 0) {
      return NextResponse.json(
        {
          error: `ამ ტელეფონის ნომრით მოთხოვნა უკვე გაგზავნილია. ხელახლა გაგზავნას შეძლებთ ${phoneMinutesLeft} წუთში.`,
        },
        { status: 429 }
      );
    }

    // 5. Sanitize / Escape inputs
    const safePlotId = escapeHtml(String(plotId || ""));
    const safeName = escapeHtml(name.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeEmail = normalizedEmail ? escapeHtml(normalizedEmail) : "—";
    const safeComment = comment ? escapeHtml(String(comment).trim()) : "—";

    // 6. Send Email via Resend
    const { data, error } = await getResend().emails.send({
      from: "onboarding@resend.dev",
      to: ["niabismamuli@gmail.com"],
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

    // 7. Save timestamp after successful send
    const now = Date.now();
    if (normalizedEmail) {
      emailCooldownMap.set(normalizedEmail, now);
    }
    phoneCooldownMap.set(normalizedPhone, now);
    cleanupOldEntries();

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "სერვერის შეცდომა" }, { status: 500 });
  }
}