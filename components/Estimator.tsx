'use client';
import { useMemo, useState } from 'react';
import { ELECTRICIAN_CONFIG as cfg } from '@/config/estimator';
import { Card } from './ui/Card';
import { OptionTile } from './ui/OptionTile';
import { TextInput, PrimaryButton } from './ui/Field';
import { HomeIcon, BuildingIcon, ZapIcon, SettingsIcon, CarIcon, SizeIcon } from './ui/Icons';

export default function Estimator({
  brandName = 'NexGen',
  primaryVar = '#1976FF',
  accentVar = '#EAF2FF',
  clientSlug,
  webhookUrl,
  clientConfig,
  embedMode = false,
  onStepChange,
}: {
  brandName?: string;
  primaryVar?: string;
  accentVar?: string;
  clientSlug?: string;
  webhookUrl?: string;
  clientConfig?: any;
  embedMode?: boolean;
  onStepChange?: (step: number) => void;
} = {}) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string,string>>({
    service: cfg.steps[0].choices[0].value,
    property: cfg.steps[1].choices[0].value,
    scope: cfg.steps[2].choices[0].value,
  });
  const [preview, setPreview] = useState<{min:number; max:number; monthly:number}|null>(null);
  const [locked, setLocked] = useState(true);
  const [lead, setLead] = useState({ name:'', email:'', phone:'' });
  const [sending, setSending] = useState(false);
  const summary = useMemo(()=>{
    const m = cfg.priceMap[answers.service]?.[answers.property]?.[answers.scope] ?? null;
    return m ? { min:m.min, max:m.max } : null;
  }, [answers]);

  const setAns = (k:string,v:string)=> setAnswers(p=>({...p,[k]:v}));
  
  const updateStep = (newStep: number) => {
    setStep(newStep);
    onStepChange?.(newStep);
  };

  async function fetchEstimate() {
    const res = await fetch('/api/estimate', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ service:answers.service, property:answers.property, scope:answers.scope })
    });
    const data = await res.json();
    if (data?.ok) setPreview({ min:data.min, max:data.max, monthly:data.monthly });
  }
  async function submitLead() {
    if (!lead.name || !lead.phone || !lead.email) return alert('Enter name, email, phone.');
    setSending(true);
    try {
      await fetch('/api/lead', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ vertical:cfg.vertical, brand:brandName, clientSlug, webhookUrl, ...answers, estimate:preview, ...lead, ts:Date.now() })
      });
      setLocked(false);
    } finally { setSending(false); }
  }

  const getServiceIcon = (service: string) => {
    switch(service) {
      case 'generator': return <ZapIcon className="h-8 w-8 md:h-9 md:w-9" />;
      case 'panel': return <SettingsIcon className="h-8 w-8 md:h-9 md:w-9" />;
      case 'ev': return <CarIcon className="h-8 w-8 md:h-9 md:w-9" />;
      default: return <ZapIcon className="h-8 w-8 md:h-9 md:w-9" />;
    }
  };

  const getPropertyIcon = (property: string) => {
    switch(property) {
      case 'single': return <HomeIcon className="h-8 w-8 md:h-9 md:w-9" />;
      case 'condo': return <BuildingIcon className="h-8 w-8 md:h-9 md:w-9" />;
      case 'apartment': return <BuildingIcon className="h-8 w-8 md:h-9 md:w-9" />;
      case 'mobile': return <HomeIcon className="h-8 w-8 md:h-9 md:w-9" />;
      default: return <HomeIcon className="h-8 w-8 md:h-9 md:w-9" />;
    }
  };

  const getScopeIcon = (scope: string) => {
    return <SizeIcon className="h-8 w-8 md:h-9 md:w-9" />;
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Service Selection */}
      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            {clientConfig?.copy?.step1Title || "What service do you need?"}
          </h2>
          {clientConfig?.copy?.step1Hint && (
            <p className="text-[13px] text-neutral-500 mt-1 leading-snug">{clientConfig.copy.step1Hint}</p>
          )}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {cfg.steps[0].choices.map(choice => (
              <OptionTile
                key={choice.value}
                selected={answers.service === choice.value}
                icon={getServiceIcon(choice.value)}
                label={choice.label}
                onClick={() => setAns('service', choice.value)}
              />
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <button 
              type="button" 
              onClick={() => updateStep(1)} 
              className="h-12 px-5 rounded-xl border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 transition"
            >
              Back
            </button>
            <button 
              type="button" 
              onClick={() => updateStep(2)}
              className="h-12 flex-1 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 active:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Property Type */}
      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            {clientConfig?.copy?.step1Title || "Select your home type"}
          </h2>
          <p className="text-[13px] text-neutral-500 mt-1 leading-snug">Select Type</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {cfg.steps[1].choices.map(choice => (
              <OptionTile
                key={choice.value}
                selected={answers.property === choice.value}
                icon={getPropertyIcon(choice.value)}
                label={choice.label}
                onClick={() => setAns('property', choice.value)}
              />
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <button 
              type="button" 
              onClick={() => updateStep(1)} 
              className="h-12 px-5 rounded-xl border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 transition"
            >
              Back
            </button>
            <button 
              type="button" 
              onClick={() => updateStep(3)}
              className="h-12 flex-1 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 active:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Scope */}
      {step === 3 && (
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">How big is the job?</h2>
          <p className="text-[13px] text-neutral-500 mt-1 leading-snug">Select Size</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {cfg.steps[2].choices.map(choice => (
              <OptionTile
                key={choice.value}
                selected={answers.scope === choice.value}
                icon={getScopeIcon(choice.value)}
                label={choice.label}
                onClick={() => setAns('scope', choice.value)}
              />
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <button 
              type="button" 
              onClick={() => updateStep(2)} 
              className="h-12 px-5 rounded-xl border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 transition"
            >
              Back
            </button>
            <button 
              type="button" 
              onClick={async () => { await fetchEstimate(); updateStep(4); }}
              className="h-12 flex-1 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 active:bg-blue-700 transition"
            >
              Get Estimate
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Your Estimate</h2>
            <p className="text-[13px] text-neutral-500 mt-1 leading-snug">Ballpark pricing</p>
            {preview ? (
              <div className="mt-5 rounded-xl border border-neutral-200 p-4 bg-white shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-neutral-500">Estimated Range</div>
                    <div className={`text-2xl font-semibold ${locked ? 'blur-[3px] select-none' : ''}`}>
                      ${preview.min.toLocaleString()} – ${preview.max.toLocaleString()}
                    </div>
                    <div className={`text-xs text-blue-600 mt-1 ${locked ? 'blur-[1px] select-none' : ''}`}>
                      ~${preview.monthly}/mo (sample financing)
                    </div>
                  </div>
                  {locked && (
                    <button 
                      onClick={() => setLocked(false)}
                      className="h-10 px-4 rounded-lg bg-blue-600 text-white font-medium"
                    >
                      Reveal & Continue
                    </button>
                  )}
                </div>
                <p className={`text-[11px] text-neutral-500 mt-2 ${locked ? 'blur-[1px] select-none' : ''}`}>
                  * Final price subject to site review
                </p>
              </div>
            ) : (
              <div className="text-center text-neutral-500 py-8">
                No estimate available for that combination.
              </div>
            )}
          </div>

          {locked ? (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">Get your full estimate</h2>
              <p className="text-[13px] text-neutral-500 mt-1 leading-snug">We'll send it to you</p>
              <div className="space-y-4 mt-4">
                <TextInput 
                  placeholder="Full name"
                  value={lead.name}
                  onChange={e => setLead(v => ({...v, name: e.target.value}))}
                />
                <TextInput 
                  placeholder="Email address"
                  type="email"
                  value={lead.email}
                  onChange={e => setLead(v => ({...v, email: e.target.value}))}
                />
                <TextInput 
                  placeholder="Phone number"
                  type="tel"
                  value={lead.phone}
                  onChange={e => setLead(v => ({...v, phone: e.target.value}))}
                />
              </div>
              <div className="mt-5 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => updateStep(3)} 
                  className="h-12 px-5 rounded-xl border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 transition"
                >
                  Back
                </button>
                <button 
                  type="button" 
                  onClick={submitLead} 
                  disabled={sending}
                  className="h-12 flex-1 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 active:bg-blue-700 transition disabled:opacity-50"
                >
                  {sending ? 'Sending…' : 'Send My Estimate'}
                </button>
              </div>
              <p className="text-[11px] text-neutral-500 mt-2 text-center">
                By continuing you agree to be contacted about your estimate.
              </p>
            </div>
          ) : (
            <div>
              <div 
                className="rounded-2xl border p-6 text-center"
                style={{ 
                  borderColor: accentVar + '40', 
                  backgroundColor: accentVar + '10', 
                  color: primaryVar 
                }}
              >
                <div className="text-lg font-semibold mb-2">Estimate Sent!</div>
                <p>Thanks! We've sent your estimate to {brandName} and will follow up shortly.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}