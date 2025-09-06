export type VerticalKey = 'electrician';

type Range = { min: number; max: number };
type Choice = { value: string; label: string };

export type EstimatorConfig = {
  vertical: VerticalKey;
  brandName: string;
  currency: string;
  steps: Array<{ key: 'service'|'property'|'scope'; label: string; choices: Choice[] }>;
  priceMap: Record<string, Record<string, Record<string, Range>>>;
  disclaimer?: string;
};

export const ELECTRICIAN_CONFIG: EstimatorConfig = {
  vertical: 'electrician',
  brandName: 'NexGen',
  currency: '$',
  steps: [
    {
      key: 'service',
      label: 'What service do you need?',
      choices: [
        { value: 'generator', label: 'Generator install' },
        { value: 'panel',     label: 'Panel upgrade' },
        { value: 'ev',        label: 'EV charger install' }
      ]
    },
    {
      key: 'property',
      label: 'What type of property?',
      choices: [
        { value: 'single',     label: 'Single-family' },
        { value: 'condo',      label: 'Condo/Townhome' },
        { value: 'commercial', label: 'Commercial' }
      ]
    },
    {
      key: 'scope',
      label: 'How big is the job?',
      choices: [
        { value: 'small',  label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large',  label: 'Large' }
      ]
    }
  ],
  // Simple ballparks. Tweak as needed per region.
  priceMap: {
    generator: {
      single:     { small:{min:3500, max:6500},  medium:{min:7000,  max:11000}, large:{min:12000, max:20000} },
      condo:      { small:{min:3000, max:5500},  medium:{min:6000,  max:9500},  large:{min:10000, max:17000} },
      commercial: { small:{min:8000, max:15000}, medium:{min:15000, max:30000}, large:{min:30000, max:60000} }
    },
    panel: {
      single:     { small:{min:900,  max:1500},  medium:{min:1600,  max:2400},  large:{min:2500,  max:3800} },
      condo:      { small:{min:850,  max:1400},  medium:{min:1500,  max:2200},  large:{min:2400,  max:3600} },
      commercial: { small:{min:1500, max:3000},  medium:{min:3000,  max:6000},  large:{min:6000,  max:12000} }
    },
    ev: {
      single:     { small:{min:700,  max:1200},  medium:{min:1300,  max:1800},  large:{min:1800,  max:2500} },
      condo:      { small:{min:800,  max:1400},  medium:{min:1500,  max:2200},  large:{min:2200,  max:3200} },
      commercial: { small:{min:900,  max:2000},  medium:{min:2000,  max:3500},  large:{min:3500,  max:6000} }
    }
  },
  disclaimer: 'This is a non-binding ballpark. Final pricing after site review.'
};
