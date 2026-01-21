"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

export default function ResultPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("quizResult");
    if (!stored) {
      router.push("/");
      return;
    }

    const { questions, answers } = JSON.parse(stored);
    setQuestions(questions);
    setAnswers(answers);

    let s = 0;
    answers.forEach((a: number, i: number) => {
      if (a === questions[i].correctAnswer) s++;
    });
    setScore(s);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-4">Test Result</h1>

        <p className="text-xl font-semibold mb-6">
          Score: {score} / {questions.length}
        </p>

        {questions.map((q, i) => (
          <div key={i} className="mb-6 border-b pb-4">
            <p className="font-semibold">
              {i + 1}. {q.question}
            </p>

            <p className="mt-2">
              <span className="font-medium">Your Answer:</span>{" "}
              {answers[i] === -1
                ? "Not Answered"
                : q.options[answers[i]]}
            </p>

            <p className="mt-1 text-green-700">
              <span className="font-medium">Correct Answer:</span>{" "}
              {q.options[q.correctAnswer]}
            </p>

            <p className="mt-1 text-gray-600 italic">
              Explanation: This question tests core conceptual understanding
              relevant to competitive programming and interviews.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
