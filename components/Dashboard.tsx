"use client";

import { useEffect, useState } from "react";
import MCQTest from "./MCQTest";

export type DashboardProps = {
  dsa: number;
  java: number;
  time: number;
};

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

export default function Dashboard({
  dsa,
  java,
  time,
}: DashboardProps) {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTest() {
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dsa, java, time }),
        });

        if (!res.ok) throw new Error("API error");

        const data = await res.json();

        if (!data.questions) {
          throw new Error("Invalid response");
        }

        setQuestions(data.questions);
      } catch (err) {
        console.error(err);
        setError("Failed to load AI test");
      } finally {
        setLoading(false);
      }
    }

    loadTest();
  }, [dsa, java, time]);

  if (loading) {
    return (
      <div className="bg-white mt-6 p-6 rounded-xl shadow-md">
        Preparing your personalized test…
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white mt-6 p-6 rounded-xl shadow-md text-red-600">
        {error}
      </div>
    );
  }

  return <MCQTest questions={questions} />;
}
