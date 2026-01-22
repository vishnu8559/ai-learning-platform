import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 🔒 SAFETY: read raw body first
    const rawBody = await req.text();

    if (!rawBody) {
      return NextResponse.json(
        { error: "Empty request body" },
        { status: 400 }
      );
    }

    const body = JSON.parse(rawBody);

    // optional debug
    console.log("Analyze request:", body);

    // ✅ MOCK AI RESPONSE (stable for hackathon & Vercel)
    return NextResponse.json({
      questions: [
        {
          question: "What is the time complexity of binary search?",
          options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
          correctAnswer: 1,
          explanation:
            "Binary search halves the search space on each step, giving O(log n).",
        },
        {
          question: "Which keyword is used to inherit a class in Java?",
          options: ["implements", "inherits", "extends", "super"],
          correctAnswer: 2,
          explanation:
            "The 'extends' keyword is used for class inheritance in Java.",
        },
      ],
    });
  } catch (error) {
    console.error("Analyze API error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
