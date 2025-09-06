import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Electrician Instant Estimator</h1>
        <p className="text-zinc-600 mb-8">Get instant estimates for electrical work</p>
        <Link 
          href="/estimate" 
          className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
