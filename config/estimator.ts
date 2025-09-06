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
        { value: 'condo',      label: 'Townhome/Condo' },
        { value: 'apartment',  label: 'Apartment' },
        { value: 'mobile',     label: 'Mobile home' }
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
      apartment:  { small:{min:2500, max:4500},  medium:{min:5000,  max:8000},  large:{min:8000,  max:14000} },
      mobile:     { small:{min:2000, max:4000},  medium:{min:4000,  max:7000},  large:{min:7000,  max:12000} }
    },
    panel: {
      single:     { small:{min:900,  max:1500},  medium:{min:1600,  max:2400},  large:{min:2500,  max:3800} },
      condo:      { small:{min:850,  max:1400},  medium:{min:1500,  max:2200},  large:{min:2400,  max:3600} },
      apartment:  { small:{min:700,  max:1200},  medium:{min:1200,  max:1800},  large:{min:1800,  max:2800} },
      mobile:     { small:{min:600,  max:1000},  medium:{min:1000,  max:1500},  large:{min:1500,  max:2200} }
    },
    ev: {
      single:     { small:{min:700,  max:1200},  medium:{min:1300,  max:1800},  large:{min:1800,  max:2500} },
      condo:      { small:{min:800,  max:1400},  medium:{min:1500,  max:2200},  large:{min:2200,  max:3200} },
      apartment:  { small:{min:600,  max:1000},  medium:{min:1000,  max:1500},  large:{min:1500,  max:2000} },
      mobile:     { small:{min:500,  max:800},   medium:{min:800,   max:1200},  large:{min:1200,  max:1600} }
    }
  },
  disclaimer: 'This is a non-binding ballpark. Final pricing after site review.'
};
