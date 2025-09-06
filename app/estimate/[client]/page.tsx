"use client";
import Image from "next/image";
import { getClient } from "@/configs/clients";
import { Card } from "@/components/ui/Card";
import { setupAutoHeight } from "@/app/estimate/iframe-height";
import { useEffect } from "react";
import Estimator from '@/components/Estimator';

export default function EstimatorPage({ 
  params, 
  searchParams 
}:{ 
  params:{ client:string }; 
  searchParams: { mode?: string } 
}) {
  const client = getClient(params.client);
  if (!client) return <div className="p-8 text-white">Client not found.</div>;

  useEffect(() => {
    const off = setupAutoHeight();
    return () => off();
  }, []);

  return (
    <main className="min-h-screen flex items-start justify-center bg-transparent px-4 py-8">
      <div className="w-full max-w-xl">
        <Card className="pb-16">
          {/* Header row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Image src={client.logoUrl} alt={client.name} width={28} height={28} />
              <div className="font-semibold text-neutral-900">{client.name} • Instant Estimate</div>
            </div>
            {/* Simple step dots */}
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span className="h-2 w-2 rounded-full bg-neutral-300" />
              <span className="h-2 w-2 rounded-full bg-neutral-300" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="mt-5 text-xl font-semibold tracking-tight md:text-2xl text-neutral-900">
            {client.copy?.heroTitle || "Get an estimate in less than 30 secs!"}
          </h1>

          {/* Estimator component */}
          <div className="mt-5">
            <Estimator
              brandName={client.name}
              primaryVar={client.theme.brand}
              accentVar={client.theme.brandSoft}
              clientSlug={params.client}
              webhookUrl={client.webhookUrl}
              clientConfig={client}
              embedMode={false}
            />
          </div>
        </Card>
      </div>
    </main>
  );
}