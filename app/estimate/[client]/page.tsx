"use client";
import Image from "next/image";
import { getClient } from "@/configs/clients";
import { EmbedContainer, useEmbedFlags } from "@/components/layout/EmbedAware";
import { Card } from "@/components/ui/Card";
import { Stepper } from "@/components/ui/Stepper";
import { OptionTile } from "@/components/ui/OptionTile";
import { TextInput, PrimaryButton } from "@/components/ui/Field";
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
  const { blended } = useEmbedFlags();
  
  // Override blended detection with search params for server-side rendering
  const isBlended = searchParams.mode === 'blended' || blended;

  useEffect(() => {
    const off = setupAutoHeight();
    return () => off();
  }, []);

  return (
    <EmbedContainer blended={isBlended}>
      <Card className={isBlended ? "" : "backdrop-blur-0"}>
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
        <h1 className="mt-5 text-2xl md:text-3xl font-semibold text-neutral-900">
          {client.copy?.heroTitle || "Get an estimate in less than 30 secs!"}
        </h1>

        {/* Estimator component with embed-aware styling */}
        <div className="mt-5">
          <Estimator
            brandName={client.name}
            primaryVar={client.theme.brand}
            accentVar={client.theme.brandSoft}
            clientSlug={params.client}
            webhookUrl={client.webhookUrl}
            clientConfig={client}
            embedMode={isBlended}
          />
        </div>
      </Card>
    </EmbedContainer>
  );
}