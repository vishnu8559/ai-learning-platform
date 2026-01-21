"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

export default function QuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("quiz");
    if (!stored) {
      router.push("/");
      return;
    }

    const parsed = JSON.parse(stored);
    setQuestions(parsed);
    setAnswers(new Array(parsed.length).fill(-1));
  }, [router]);

  if (questions.length === 0) return null;

  const q = questions[current];

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const submitTest = () => {
    localStorage.setItem(
      "quizResult",
      JSON.stringify({ questions, answers })
    );
    router.push("/result");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">
        
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          AI Assessment Test
        </h1>
        <p className="text-gray-600 mb-6">
          Question {current + 1} of {questions.length}
        </p>

        {/* Question */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {current + 1}. {q.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <label
              key={idx}
              className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer transition
                ${
                  answers[current] === idx
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
            >
              <input
                type="radio"
                className="mr-3"
                checked={answers[current] === idx}
                onChange={() => {
                  const copy = [...answers];
                  copy[current] = idx;
                  setAnswers(copy);
                }}
              />
              <span className="text-gray-900 text-lg">{opt}</span>
            </label>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prev}
            disabled={current === 0}
            className="px-6 py-2 rounded-lg border text-gray-700 font-medium disabled:opacity-40"
          >
            Previous
          </button>

          {current === questions.length - 1 ? (
            <button
              onClick={submitTest}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold text-lg"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={next}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
