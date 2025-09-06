import Image from "next/image";
import { getClient } from "@/configs/clients";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Card } from "@/components/ui/Card";
import { Stepper } from "@/components/ui/Stepper";
import { OptionTile } from "@/components/ui/OptionTile";
import Estimator from '@/components/Estimator';

export default function EstimatorPage({ params }:{ params:{ client:string } }) {
  const client = getClient(params.client);
  if (!client) return <div className="p-8 text-white">Client not found.</div>;

  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_600px_at_50%_-10%,#0B1220,transparent)] bg-neutral-950 text-white">
      <div className="mx-auto max-w-xl md:max-w-2xl px-4 py-6 md:py-12">
        <ThemeProvider theme={client.theme}>
          <header className="sticky top-0 z-20 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
            <div className="h-16 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src={client.logoUrl} alt={client.name} width={28} height={28}/>
                <div className="font-semibold">{client.name} • Instant Estimate</div>
              </div>
            </div>
          </header>

          <Estimator
            brandName={client.name}
            primaryVar={client.theme.brand}
            accentVar={client.theme.brandSoft}
            clientSlug={params.client}
            webhookUrl={client.webhookUrl}
            clientConfig={client}
          />
        </ThemeProvider>
      </div>
    </main>
  );
}