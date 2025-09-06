import { ELECTRICIAN_CONFIG } from '@/config/estimator';

export type ThemeSpec = {
  brand: string;        // e.g. "#1976FF"
  brandSoft: string;    // e.g. "#EAF2FF"
  text: string;         // dark text on white
  cardBg: string;       // usually "#FFFFFF"
  radius: number;       // px - e.g. 24
  tileStyle?: "outline" | "filled";
  stepperStyle?: "pills" | "dots";
  density?: "cozy" | "comfortable" | "spacious";
};

export type ClientConfig = {
  slug: string;
  name: string;
  logoUrl: string;
  webhookUrl?: string;
  theme: ThemeSpec;
  copy: {
    heroTitle: string;
    sub: string;
    step1Title: string;
    step1Hint?: string;
  };
  // keep your existing services/pricing shape as-is
  services: any[];
};

export const CLIENTS: ClientConfig[] = [
  {
    slug: "acme-electric",
    name: "ACME Electric",
    logoUrl: "/logos/acme.svg",
    webhookUrl: "https://hooks.zapier.com/hooks/catch/acme/123",
    theme: {
      brand: "#1976FF",
      brandSoft: "#EAF2FF",
      text: "#0A0A0B",
      cardBg: "#FFFFFF",
      radius: 24,
      tileStyle: "outline",
      stepperStyle: "pills",
      density: "comfortable",
    },
    copy: {
      heroTitle: "Get your estimate in 30 seconds",
      sub: "Answer 3 quick questions to see your ballpark price.",
      step1Title: "What service do you need?",
      step1Hint: "Select Service",
    },
    services: ELECTRICIAN_CONFIG.steps[0].choices
  },
  {
    slug: "bright-power",
    name: "Bright Power",
    logoUrl: "/logos/bright.svg",
    webhookUrl: "https://hooks.zapier.com/hooks/catch/bright/456",
    theme: {
      brand: "#1F4AFF",
      brandSoft: "#E6F0FF",
      text: "#0A0A0B",
      cardBg: "#FFFFFF",
      radius: 20,
      tileStyle: "filled",
      stepperStyle: "dots",
      density: "cozy",
    },
    copy: {
      heroTitle: "Get your estimate in 30 seconds",
      sub: "Answer 3 quick questions to see your ballpark price.",
      step1Title: "Select your home type",
      step1Hint: "Select Type",
    },
    services: ELECTRICIAN_CONFIG.steps[0].choices
  },
  {
    slug: "nexgen",
    name: "NexGen Electric",
    logoUrl: "/logos/nexgen.svg",
    theme: {
      brand: "#059669",
      brandSoft: "#D1FAE5",
      text: "#0A0A0B",
      cardBg: "#FFFFFF",
      radius: 28,
      tileStyle: "outline",
      stepperStyle: "pills",
      density: "spacious",
    },
    copy: {
      heroTitle: "Get your estimate in 30 seconds",
      sub: "Answer 3 quick questions to see your ballpark price.",
      step1Title: "What electrical work do you need?",
      step1Hint: "Choose Service",
    },
    services: ELECTRICIAN_CONFIG.steps[0].choices
  }
];

export const getClient = (slug: string) => CLIENTS.find(c => c.slug === slug);
