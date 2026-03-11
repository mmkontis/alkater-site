import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const NANO_BANANA_HOST =
  "https://humanlike-node-production.up.railway.app";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json(
      { error: "Image prompt is required" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${NANO_BANANA_HOST}/studio/media/generate-image`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          model: "nano-banana-2",
          resolution: "1K",
          aspectRatio: "16:9",
          count: 1,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json(
        { error: `Image generation failed: ${err}` },
        { status: 500 }
      );
    }

    const data = await res.json();

    if (!data.success || !data.imageUrls?.length) {
      return NextResponse.json(
        { error: "No image was generated" },
        { status: 500 }
      );
    }

    const imageUrl = data.imageUrls[0];

    // Download the image and upload to Supabase storage server-side
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) {
      return NextResponse.json(
        { error: "Failed to download generated image" },
        { status: 500 }
      );
    }
    const imgBlob = await imgRes.blob();
    const imgBuffer = Buffer.from(await imgBlob.arrayBuffer());
    const fileName = `blog/${Date.now()}-ai-cover.png`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(fileName, imgBuffer, {
        upsert: false,
        contentType: imgBlob.type || "image/png",
      });

    if (uploadError) {
      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    const { data: { publicUrl } } = supabase.storage
      .from("media")
      .getPublicUrl(fileName);

    return NextResponse.json({
      imageUrl: publicUrl,
      timing: data.timing,
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Image generation error: ${err}` },
      { status: 500 }
    );
  }
}
