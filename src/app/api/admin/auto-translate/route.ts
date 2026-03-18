import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Google API key not configured" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { mode, texts, json } = body as {
    mode: "fields" | "json";
    texts?: Record<string, string>;
    json?: Record<string, unknown>;
  };

  if (mode === "fields" && texts) {
    const translated = await translateFields(texts, apiKey);
    return NextResponse.json({ translated });
  }

  if (mode === "json" && json) {
    const translated = await translateJson(json, apiKey);
    return NextResponse.json({ translated });
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

async function callGemini(prompt: string, apiKey: string): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
}

async function translateFields(
  texts: Record<string, string>,
  apiKey: string
): Promise<Record<string, string>> {
  const prompt = `Translate the following Greek text fields to English. Return a JSON object with the same keys but English values. Keep proper names, company name "ΑΛΚΑΤΕΡ" as "ALKATER", and technical terms accurate. Do not add any extra keys.

Input:
${JSON.stringify(texts, null, 2)}`;

  const raw = await callGemini(prompt, apiKey);
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function translateJson(
  json: Record<string, unknown>,
  apiKey: string
): Promise<Record<string, unknown>> {
  const prompt = `Translate all Greek text values in this JSON structure to English. Keep the exact same structure and keys. Only translate string values that contain Greek text. Keep proper names, company name "ΑΛΚΑΤΕΡ" as "ALKATER", numbers, URLs, icon names unchanged. Return valid JSON with the same structure.

Input:
${JSON.stringify(json, null, 2)}`;

  const raw = await callGemini(prompt, apiKey);
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
