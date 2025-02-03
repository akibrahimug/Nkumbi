// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

// Define the expected JSON shape for the incoming request body
interface RequestBody {
  prompt: string;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = (await req.json()) as RequestBody;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/gpt2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 50,
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();

    // If the API returns an error, forward it
    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    // The Hugging Face API returns an array with generated text objects.
    // For GPT‑2, expect something like [{ generated_text: "..." }]
    return NextResponse.json({ result: data });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
