import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  return NextResponse.json({ message: "API ცოცხალია!" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plotId, name, phone, email, comment } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "სახელი და ტელეფონი სავალდებულოა" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["sunioni31@gmail.com"], // ← აქ უკვე შენი მეილია
      subject: `🏡 ახალი რეგისტრაცია — ნაკვეთი ${plotId}`,
      html: `
        <div style="font-family: sans-serif; padding: 24px;">
          <h2 style="color: #b8912f;">ახალი რეგისტრაცია</h2>
          <p>ნაკვეთი: <strong>${plotId}</strong></p>
          <p>სახელი: ${name}</p>
          <p>ტელეფონი: ${phone}</p>
          <p>ელფოსტა: ${email || "—"}</p>
          <p>კომენტარი: ${comment || "—"}</p>
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