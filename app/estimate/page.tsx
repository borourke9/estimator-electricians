import Estimator from '@/components/Estimator';

export default function Page(){
  return (
    <main className="min-h-screen bg-zinc-50 py-10">
      <section className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Electrician Instant Estimate</h1>
        <p className="text-zinc-600 mb-6">Answer 3 quick questions. See a ballpark in seconds. Generator installs, panel upgrades, EV chargers.</p>
        <Estimator />
      </section>
    </main>
  );
}
