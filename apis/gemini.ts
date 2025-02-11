"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import "@/lib/envConfig";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function getMovieRecommendations(
  query: string
): Promise<string[]> {
  try {
    const prompt = `As a movie expert, recommend 3 movies based on this request: "${query}"

Important: Only return the movie titles in a valid JSON array format.
Rules:
- Exactly 3 movies
- Use official movie titles
- Only return the array, no explanations
- Make sure it's valid JSON

Example response:
["The Dark Knight", "Inception", "Interstellar"]`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    try {
      const parsed = JSON.parse(response.trim());

      if (
        !Array.isArray(parsed) ||
        parsed.length !== 3 ||
        !parsed.every((item) => typeof item === "string")
      ) {
        throw new Error("Invalid response format from AI");
      }

      return parsed;
    } catch {
      console.error("Failed to parse AI response:", response);
      throw new Error("Failed to parse movie recommendations");
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to get recommendations from AI");
  }
}
