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

  const { topic, language = "el" } = await request.json();

  if (!topic) {
    return NextResponse.json({ error: "Θέμα απαιτείται" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Google API key not configured" },
      { status: 500 }
    );
  }

  const systemPrompt =
    language === "el"
      ? `Είσαι ειδικός copywriter για κατασκευαστική εταιρεία οδοποιίας και ασφαλτόστρωσης (ΑΛΚΑΤΕΡ Α.Ε.). Γράψε ένα επαγγελματικό άρθρο blog σε μορφή Markdown. Απάντησε ΜΟΝΟ σε JSON χωρίς markdown blocks.`
      : `You are a professional copywriter for a road construction and asphalt company (ALKATER S.A.). Write a professional blog article in Markdown format. Respond ONLY in JSON without markdown blocks.`;

  const userPrompt =
    language === "el"
      ? `Γράψε ένα άρθρο blog για το θέμα: "${topic}"

Απάντησε σε JSON με αυτή τη δομή:
{
  "title": "τίτλος άρθρου",
  "excerpt": "σύντομη περίληψη 1-2 προτάσεις",
  "content": "το πλήρες άρθρο σε Markdown (## υποτίτλοι, **bold**, λίστες, παράγραφοι, 4-6 ενότητες). Μην βάζεις # τίτλο στην αρχή γιατί εμφανίζεται ξεχωριστά.",
  "imagePrompt": "μια αγγλική περιγραφή εικόνας που ταιριάζει στο άρθρο, φωτορεαλιστικό στυλ, κατασκευαστικά έργα"
}`
      : `Write a blog article about: "${topic}"

Respond in JSON with this structure:
{
  "title": "article title",
  "excerpt": "short summary 1-2 sentences",
  "content": "full article in Markdown (## subheadings, **bold**, lists, paragraphs, 4-6 sections). Do not include a # title at the start as it is shown separately.",
  "imagePrompt": "an English image description that fits the article, photorealistic style, construction works"
}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: systemPrompt + "\n\n" + userPrompt }] },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING", description: "Article title" },
                excerpt: { type: "STRING", description: "Short summary 1-2 sentences" },
                content: { type: "STRING", description: "Full article in Markdown with ## subheadings, **bold**, lists, paragraphs" },
                imagePrompt: { type: "STRING", description: "English image description, photorealistic style, construction works" },
              },
              required: ["title", "excerpt", "content", "imagePrompt"],
            },
            thinkingConfig: {
              thinkingBudget: 1024,
            },
          },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json(
        { error: `Gemini API error: ${err}` },
        { status: 500 }
      );
    }

    const data = await res.json();
    const parts = data.candidates?.[0]?.content?.parts ?? [];
    const text = parts.filter((p: { text?: string }) => p.text).pop()?.text ?? "";

    const article = JSON.parse(text);

    return NextResponse.json({ article });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to generate article: ${err}` },
      { status: 500 }
    );
  }
}
