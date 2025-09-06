import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = "bryce@nexgensites.com"; // sender (your domain)
const TO = ["bryce@nexgensites.com"]; // for now send to me

export async function POST(req: Request) {
  try {
    // accept JSON or form-data
    let body: any;
    try {
      body = await req.json();
    } catch {
      const fd = await req.formData();
      body = Object.fromEntries(fd.entries());
    }

    const { name, email, phone, service, client } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const html = `
      <div style="font:14px/1.6 system-ui,-apple-system,Segoe UI,Arial">
        <h2 style="margin:0 0 8px">New Estimate Lead</h2>
        <p><b>Client:</b> ${client || "Demo"}</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Service:</b> ${service || "n/a"}</p>
      </div>
    `;

    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New Estimate Lead • ${client || "Demo"}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Email failed" }, { status: 500 });
  }
}
