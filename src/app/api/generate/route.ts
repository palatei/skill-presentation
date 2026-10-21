import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

import { buildPresentationPrompt } from "@/lib/prompt";
import type { ApiErrorBody, GenerateResponseBody } from "@/lib/types";
import { parseGenerateBody } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ApiErrorBody>(
      { error: "Не удалось прочитать JSON." },
      { status: 400 },
    );
  }

  const parsed = parseGenerateBody(body);
  if (!parsed.ok) {
    return NextResponse.json<ApiErrorBody>(
      { error: parsed.error },
      { status: 400 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json<ApiErrorBody>(
      {
        error:
          "На сервере не настроен GEMINI_API_KEY. Добавьте переменную в .env.local или в Vercel.",
      },
      { status: 500 },
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction:
        "Ты пишешь продающие презентации экспертов на русском языке. Следуй структуре и тону из запроса пользователя.",
    });

    const result = await model.generateContent(
      buildPresentationPrompt(parsed.data),
    );
    const text = result.response.text()?.trim();

    if (!text) {
      return NextResponse.json<ApiErrorBody>(
        { error: "Модель вернула пустой ответ. Попробуйте ещё раз." },
        { status: 502 },
      );
    }

    return NextResponse.json<GenerateResponseBody>({ presentation: text });
  } catch (err) {
    console.error("[generate]", err);
    const message =
      err instanceof Error ? err.message : "Неизвестная ошибка генерации.";
    return NextResponse.json<ApiErrorBody>(
      {
        error: `Ошибка при обращении к Gemini: ${message}`,
      },
      { status: 502 },
    );
  }
}
