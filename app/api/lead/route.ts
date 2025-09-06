import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = "bryce@nexgensites.com";
const TO = ["bryce@nexgensites.com"];

async function readBody(req: Request) {
  // Try JSON first, then form-data
  try {
    return await req.json();
  } catch {
    try {
      const fd = await req.formData();
      return Object.fromEntries(fd.entries());
    } catch {
      return {};
    }
  }
}

export async function POST(req: Request) {
  try {
    const body: any = await readBody(req);
    const { name, email, phone, service, client } = body;

    // TEMP: log to server (view in Vercel → Functions → Logs)
    console.log("Lead payload:", body);

    // Validate minimal fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { ok: false, error: "Missing fields", received: { name, email, phone, service, client } },
        { status: 400 }
      );
    }

    const html = `
      <div style="font:14px/1.6 system-ui,-apple-system,Segoe UI,Arial">
        <h2 style="margin:0 0 8px">New Estimate Lead</h2>
        <p><b>Client:</b> ${client ?? "Demo"}</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Service:</b> ${service ?? "n/a"}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New Estimate Lead • ${client ?? "Demo"}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Email provider error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Lead route fatal:", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  // simple health check
  return NextResponse.json({ ok: true, route: "lead" });
}