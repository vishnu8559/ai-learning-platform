"use client";

import { useState } from "react";

type Props = {
  onStartTest: (topics: {
    dsa: string[];
    java: string[];
  }) => void;
};

const DSA_TOPICS = [
  "Arrays",
  "Strings",
  "Recursion",
  "Linked List",
  "Stack",
  "Queue",
];

const JAVA_TOPICS = [
  "OOP",
  "Inheritance",
  "Polymorphism",
  "Collections",
  "Exception Handling",
];

export default function TopicSelector({ onStartTest }: Props) {
  const [dsaTopics, setDsaTopics] = useState<string[]>([]);
  const [javaTopics, setJavaTopics] = useState<string[]>([]);

  const toggleTopic = (
    topic: string,
    selected: string[],
    setSelected: (v: string[]) => void
  ) => {
    setSelected(
      selected.includes(topic)
        ? selected.filter((t) => t !== topic)
        : [...selected, topic]
    );
  };

  return (
    <div className="bg-white mt-6 p-6 rounded-xl shadow-md w-full max-w-md">
      <h3 className="text-xl font-bold mb-4">
        Topics You Have Covered
      </h3>

      <p className="font-semibold">DSA Topics</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {DSA_TOPICS.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() =>
              toggleTopic(topic, dsaTopics, setDsaTopics)
            }
            className={`px-3 py-1 rounded border ${
              dsaTopics.includes(topic)
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      <p className="font-semibold">Core Java Topics</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {JAVA_TOPICS.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() =>
              toggleTopic(topic, javaTopics, setJavaTopics)
            }
            className={`px-3 py-1 rounded border ${
              javaTopics.includes(topic)
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      <button
        onClick={() =>
          onStartTest({
            dsa: dsaTopics,
            java: javaTopics,
          })
        }
        disabled={dsaTopics.length === 0 && javaTopics.length === 0}
        className="w-full bg-green-600 text-white py-2 rounded disabled:bg-gray-300"
      >
        Start Test
      </button>
    </div>
  );
}
