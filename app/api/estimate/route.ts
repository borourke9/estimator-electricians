import { NextResponse } from 'next/server';
import { ELECTRICIAN_CONFIG } from '@/config/estimator';

export async function POST(req: Request) {
  const cfg = ELECTRICIAN_CONFIG;
  const { service, property, scope } = await req.json() as { service:string; property:string; scope:string };

  const found = cfg.priceMap?.[service]?.[property]?.[scope] ?? null;
  if (!found) return NextResponse.json({ ok:true, min:null, max:null, monthly:null, note:'no-match' });

  // Optional monthly teaser (9.99% APR, 60 months)
  const avg = (found.min + found.max) / 2;
  const apr = 0.0999, n = 60;
  const monthly = Math.round((apr/12 * avg) / (1 - Math.pow(1 + apr/12, -n)));

  return NextResponse.json({ ok:true, min:found.min, max:found.max, monthly });
}
