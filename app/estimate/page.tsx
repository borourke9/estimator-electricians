"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Stepper } from "@/components/ui/Stepper";
import Estimator from '@/components/Estimator';

export default function Page(){
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <main className="min-h-screen flex items-start justify-center bg-transparent px-4 py-8">
      <div className="w-full max-w-xl">
        <Card className="pb-16">
          {/* Hero */}
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900">
            Get your estimate in 30 seconds
          </h1>
          <p className="text-[13px] text-neutral-500 mt-1">Answer 3 quick questions to see your ballpark price.</p>

          {/* Stepper */}
          <div className="mt-4">
            <Stepper current={currentStep} total={3} style="pills" />
          </div>

          {/* Estimator component */}
          <div className="mt-5">
            <Estimator
              onStepChange={setCurrentStep}
            />
          </div>
        </Card>
      </div>
    </main>
  );
}
