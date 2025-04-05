// app/api/GeminiAi/route.js
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { prompt, inputValue } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const fullPrompt = `${prompt || ""}\n\n${inputValue || ""}`.trim();

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: fullPrompt,
    });
    console.log(result.candidates[0].content);
    return NextResponse.json({ response: result.text }, { status: 200 });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed  to generate response" },
      { status: 500 }
    );
  }
}
