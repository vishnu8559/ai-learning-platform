"use client";

import { useState } from "react";
import Dashboard from "./Dashboard";
import TopicSelector from "./TopicSelector";

export default function ProgressForm() {
  const [dsa, setDsa] = useState<number | null>(null);
  const [java, setJava] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [topics, setTopics] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center">
          Daily Progress Log
        </h2>

        <input
          type="number"
          placeholder="DSA Questions Solved"
          onChange={(e) => setDsa(Number(e.target.value))}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Time Spent on Core Java (mins)"
          onChange={(e) => setJava(Number(e.target.value))}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Total Study Time (mins)"
          onChange={(e) => setTime(Number(e.target.value))}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Analyze Progress
        </button>
      </form>

      {submitted && dsa && java && time && (
        <>
          <Dashboard dsa={dsa} java={java} time={time} />

          <TopicSelector onStartTest={setTopics} />
        </>
      )}
    </div>
  );
}
