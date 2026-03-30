"use client";

import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";

export default function ResultPage() {
  const params = useSearchParams();
  const data = params.get("data");

  if (!data) return <div>No data</div>;

  const result = JSON.parse(decodeURIComponent(data));

  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(16);
    doc.text("Kya Banau - Weekly Plan", 20, y);

    y += 10;

    Object.keys(result).forEach((day) => {
      doc.setFontSize(14);
      doc.text(day.toUpperCase(), 20, y);
      y += 6;

      ["breakfast", "lunch", "dinner", "snacks"].forEach((meal) => {
        doc.setFontSize(12);
        doc.text(
          `${meal}: ${result[day][meal].name}`,
          20,
          y
        );
        y += 6;
      });

      y += 6;
    });

    doc.save("weekly-meal-plan.pdf");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 to-orange-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
        📅 Weekly Meal Plan
      </h1>

      <div className="max-w-3xl mx-auto">

        <button
          onClick={downloadPDF}
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Download Weekly Plan 📄
        </button>

        <div className="space-y-6">

          {Object.keys(result).map((day) => (
            <div
              key={day}
              className="bg-white p-5 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-green-700 mb-3 capitalize">
                {day}
              </h2>

              {["breakfast", "lunch", "dinner", "snacks"].map((meal) => (
                <div key={meal} className="mb-2">
                  <p className="font-semibold text-gray-900">
                    {meal}:
                  </p>
                  <p className="text-gray-800">
                    {result[day][meal].name}
                  </p>
                </div>
              ))}

            </div>
          ))}

        </div>
      </div>
    </main>
  );
}