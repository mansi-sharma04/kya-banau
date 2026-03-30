import ResultClient from "./ResultClient";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 to-orange-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
        📅 Weekly Meal Plan
      </h1>

      {/* ✅ FIX: Wrap in Suspense */}
      <Suspense fallback={<p className="text-center">Loading...</p>}>
        <ResultClient />
      </Suspense>
    </main>
  );
}