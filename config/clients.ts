export type ClientConfig = {
  name: string;
  logoUrl?: string;
  primary: string;   // e.g. "#0E7C66"
  accent?: string;   // e.g. "#0BBF7A"
  webhookUrl?: string; // client-specific webhook
  // override copy/ranges if needed:
  brandName?: string;
  priceOverrides?: Partial<typeof import('./estimator').ELECTRICIAN_CONFIG.priceMap>;
};

export const CLIENTS: Record<string, ClientConfig> = {
  "acme-electric": {
    name: "ACME Electric",
    logoUrl: "https://cdn.yoursaas.com/logos/acme.png",
    primary: "#0E7C66",
    accent: "#0BBF7A",
    webhookUrl: "https://hooks.zapier.com/hooks/catch/acme/123",
  },
  "bright-power": {
    name: "Bright Power",
    logoUrl: "https://cdn.yoursaas.com/logos/bright.png",
    primary: "#1F4AFF",
    accent: "#7DA3FF",
    webhookUrl: "https://hooks.zapier.com/hooks/catch/bright/456",
  },
  "nexgen": {
    name: "NexGen Electric",
    primary: "#059669",
    accent: "#10B981",
    // Uses default webhook from env
  },
};
