import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

/**
 * This function generates a REAL MCQ TEST in JSON format
 * based on student performance and covered topics.
 */
export async function analyzeProgress(data: {
  dsa: number;
  java: number;
  time: number;
  topics?: {
    dsa: string[];
    java: string[];
  };
}) {


    const prompt = `
You are an API that ONLY returns valid JSON.

DO NOT add explanations.
DO NOT add markdown.
DO NOT add comments.
DO NOT add trailing commas.

Return STRICT JSON in the format below.

FORMAT:
{
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": 0
    }
  ]
}

Generate EXACTLY 5 questions.
Each question must have exactly 4 options.
correctAnswer must be a NUMBER (0–3).
`;


    

  const result = await generateText({
    model: groq("llama-3.1-8b-instant"),
    prompt,
  });

  return result.text;
}
