// app/api/GeminiAi/route.js
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { prompt, inputValue, fileContent } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }
    const mainPrompt = `
You are an expert cover letter writer, career consultant, and language-sensitive assistant with professional HR experience.

Your goal is to write a highly customized and impactful cover letter based on the applicant’s CV, the job description, and any personal instructions.

💡 Language Rule:
If the user's additional input or the job/company description is written in **Slovenian**, write the full cover letter in **Slovenian**.
Otherwise, write the cover letter in **English**.

Instructions:
- Carefully analyze the applicant's CV to highlight relevant skills, strengths, and achievements.
- Use the job description to tailor the tone, focus, and structure of the letter.
- Mirror the style and values of the company whenever possible.
- Make the letter sound human, engaging, and professional. Avoid clichés and boilerplate text.
- Keep the letter concise, ideally within 350–450 words.
- Ensure the letter is ready to send — no placeholders, no templates.
- Maintain a clear structure: Introduction, Body (Value Match), and Strong Closing.

You are expected to produce output of the highest quality.

Below is the content to use:
`;

    const fullPrompt = `
${mainPrompt.trim()}

---

📄 CV of the Applicant:
${fileContent || "[CV not provided]"}

---

💼 Job & Company Description:
${prompt || "[Job description not provided]"}

---

📝 User's Additional Instructions (tone, personalization, etc.):
${inputValue || "[No additional input]"}

---

✍️ Now, generate the complete, final version of the cover letter, applying all the rules above.
`.trim();

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
