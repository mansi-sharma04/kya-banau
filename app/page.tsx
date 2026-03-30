"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Utensils } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const [form, setForm] = useState({
    age: "",
    weight: "",
    height: "",
    preference: "veg",
    region: "north_indian",
  });

  const [conditions, setConditions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (value: string) => {
    if (value === "none") {
      setConditions(["none"]);
    } else {
      setConditions((prev) => {
        const filtered = prev.filter((c) => c !== "none");
        return filtered.includes(value)
          ? filtered.filter((c) => c !== value)
          : [...filtered, value];
      });
    }
  };

  const generatePlan = async () => {
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        disease:
          conditions.includes("none") || conditions.length === 0
            ? "none"
            : conditions.join(", "),
      }),
    });

    const data = await res.json();

    try {
      const parsed = JSON.parse(data.result);

      router.push(
        `/result?data=${encodeURIComponent(JSON.stringify(parsed))}`
      );
    } catch {
      alert("Error generating plan");
    }

    setLoading(false);
  };

  const conditionOptions = [
    { value: "none", label: "None" },
    { value: "diabetes", label: "Diabetes" },
    { value: "high_bp", label: "High Blood Pressure" },
    { value: "thyroid", label: "Thyroid" },
    { value: "pcos", label: "PCOS" },
    { value: "cholesterol", label: "High Cholesterol" },
  ];

  return (
    <main
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md transition duration-300 hover:scale-[1.02]">

        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 flex items-center justify-center gap-2 animate-fade-in">
          <Utensils /> Kya Banau?
        </h1>

        <p className="text-center text-gray-800 mb-6">
          Aaj kya banau? Let AI decide for you.
        </p>

        <div className="space-y-4">

          <input name="age" placeholder="Age" onChange={handleChange}
            className="w-full p-2 border rounded-lg text-gray-900" />

          <input name="weight" placeholder="Weight (kg)" onChange={handleChange}
            className="w-full p-2 border rounded-lg text-gray-900" />

          <input name="height" placeholder="Height (cm)" onChange={handleChange}
            className="w-full p-2 border rounded-lg text-gray-900" />

          {/* CONDITIONS */}
          <div>
            <p className="font-semibold text-gray-900 mb-2">
              Health Conditions:
            </p>

            <div className="grid grid-cols-2 gap-2">
              {conditionOptions.map((cond) => (
                <label
                  key={cond.value}
                  className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg text-gray-900 hover:bg-green-200 transition"
                >
                  <input
                    type="checkbox"
                    checked={conditions.includes(cond.value)}
                    onChange={() => handleCheckbox(cond.value)}
                  />
                  {cond.label}
                </label>
              ))}
            </div>
          </div>

          <select name="preference" onChange={handleChange}
            className="w-full p-2 border rounded-lg text-gray-900">
            <option value="veg">Vegetarian</option>
            <option value="nonveg">Non-Veg</option>
          </select>

          <select name="region" onChange={handleChange}
            className="w-full p-2 border rounded-lg text-gray-900">
            <option value="north_indian">North Indian</option>
            <option value="south_indian">South Indian</option>
            <option value="gujarati">Gujarati</option>
            <option value="punjabi">Punjabi</option>
            <option value="maharashtrian">Maharashtrian</option>
          </select>

          <button
            onClick={generatePlan}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold transition hover:bg-green-700"
          >
            {loading ? "Generating..." : "Generate Meal Plan 🍽️"}
          </button>
        </div>
      </div>
    </main>
  );
}