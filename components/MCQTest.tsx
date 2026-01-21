"use client";

import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

type Props = {
  questions: Question[];
};

export default function MCQTest({ questions }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleNext = () => {
    if (selected === questions[current].correctAnswer) {
      setScore(score + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mt-6 text-center">
        <h2 className="text-2xl font-bold">Test Completed 🎉</h2>
        <p className="mt-4 text-lg">
          Score: <strong>{score} / {questions.length}</strong>
        </p>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mt-6">
      <p className="text-sm text-gray-500 mb-2">
        Question {current + 1} / {questions.length}
      </p>

      <p className="text-xs text-gray-500">
  Question {current + 1} of {questions.length}
</p>

<div className="w-full bg-gray-200 h-2 rounded mt-2 mb-4">
  <div
    className="bg-blue-600 h-2 rounded"
    style={{
      width: `${((current + 1) / questions.length) * 100}%`,
    }}
  />
</div>

<h3 className="font-semibold mb-4">{q.question}</h3>





      <h3 className="font-semibold mb-4">{q.question}</h3>

      <div className="space-y-2">
        {q.options.map((opt, idx) => (
          <label
            key={idx}
            className={`block border p-2 rounded cursor-pointer ${
              selected === idx
                ? "bg-blue-100 border-blue-500"
                : ""
            }`}
          >
            <input
              type="radio"
              name="option"
              className="mr-2"
              checked={selected === idx}
              onChange={() => setSelected(idx)}
            />
            {opt}
          </label>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={selected === null}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-300"
      >
        {current + 1 === questions.length
          ? "Submit Test"
          : "Next"}
      </button>
    </div>
  );
}
