import ResultClient from "./ResultClient";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 to-orange-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
        📅 Weekly Meal Plan
      </h1>

      <ResultClient />
    </main>
  );
}