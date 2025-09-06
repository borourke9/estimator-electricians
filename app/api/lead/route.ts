import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  
  // Use client-specific webhook if provided, otherwise fall back to default
  const url = data.webhookUrl || process.env.ESTIMATOR_WEBHOOK_URL;
  if (!url) return NextResponse.json({ ok:false, error:'Missing webhook URL' }, { status:500 });

  try {
    await fetch(url, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(data)
    });
    return NextResponse.json({ ok:true });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error:String(e) }, { status:500 });
  }
}
