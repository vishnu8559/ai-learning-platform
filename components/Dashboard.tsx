"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ TEMP TOPIC SELECTION (replace later with checkbox state)
  const selectedTopics = ["Arrays", "Strings", "Core Java"];

  const startTest = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topics: selectedTopics }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      localStorage.setItem("quizQuestions", JSON.stringify(data.questions));
      router.push("/quiz");
    } catch (err) {
      console.error(err);
      setError("Failed to load AI test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        Personalized AI Dashboard
      </h2>

      <p className="text-gray-600 mb-6">
        Topics selected:{" "}
        <span className="font-medium">
          {selectedTopics.join(", ")}
        </span>
      </p>

      <button
        onClick={startTest}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
      >
        {loading ? "Preparing Test..." : "Start Test"}
      </button>

      {error && (
        <p className="text-red-600 mt-4 text-sm">{error}</p>
      )}
    </div>
  );
}
