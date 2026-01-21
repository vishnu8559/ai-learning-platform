import { NextResponse } from "next/server";

/**
 * Topic-wise question bank
 */
const QUESTION_BANK: Record<string, any[]> = {
  Arrays: [
    {
      question: "What is the index of the first element in an array?",
      options: ["0", "1", "-1", "Depends on language"],
      correctAnswer: 0,
    },
    {
      question: "Which data structure uses contiguous memory?",
      options: ["Array", "Linked List", "Stack", "Tree"],
      correctAnswer: 0,
    },
  ],

  Strings: [
    {
      question: "Strings in Java are?",
      options: ["Mutable", "Immutable", "Both", "None"],
      correctAnswer: 1,
    },
    {
      question: "Which method compares string values in Java?",
      options: ["==", "equals()", "compare()", "match()"],
      correctAnswer: 1,
    },
  ],

  Stack: [
    {
      question: "Stack follows which principle?",
      options: ["FIFO", "LIFO", "FILO", "LILO"],
      correctAnswer: 1,
    },
  ],

  Queue: [
    {
      question: "Queue follows which principle?",
      options: ["FIFO", "LIFO", "FILO", "LILO"],
      correctAnswer: 0,
    },
  ],

  "Core Java": [
    {
      question: "Which keyword is used to inherit a class in Java?",
      options: ["implements", "inherits", "extends", "super"],
      correctAnswer: 2,
    },
    {
      question: "Which collection does not allow duplicates?",
      options: ["List", "Set", "Map", "ArrayList"],
      correctAnswer: 1,
    },
  ],
};

// 🔀 Shuffle helper
function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export async function POST(req: Request) {
  try {
    const { topics } = await req.json(); // ✅ selected topics from frontend

    let collected: any[] = [];

    // Collect questions only from selected topics
    topics.forEach((topic: string) => {
      if (QUESTION_BANK[topic]) {
        collected.push(...QUESTION_BANK[topic]);
      }
    });

    if (collected.length === 0) {
      return NextResponse.json(
        { error: "No questions for selected topics" },
        { status: 400 }
      );
    }

    // Randomize & limit questions
    const questions = shuffle(collected).slice(0, 5);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json(
      { error: "Failed to generate test" },
      { status: 500 }
    );
  }
}
