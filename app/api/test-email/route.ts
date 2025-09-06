import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function GET() {
  try {
    await resend.emails.send({
      from: "bryce@nexgensites.com", // sender from your verified domain
      to: ["yourpersonalemail@gmail.com"], // replace with your inbox
      subject: "✅ Estimator Test Email",
      html: "<p>This is a test email from your estimator app.</p>",
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
