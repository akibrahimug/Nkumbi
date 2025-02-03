import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

// Initialize the Hugging Face Inference client with your API token
const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN || "");

export async function POST(req: NextRequest) {
  try {
    // Expect a JSON body with a "prompt" field
    const { prompt } = (await req.json()) as { prompt: string };
    console.log("Received prompt:", req.json());
    // Call the text-generation endpoint on your chosen model (e.g., "gpt2")
    const result = await hf.textGeneration({
      model: "gpt2",
      inputs: prompt,
      parameters: {
        max_new_tokens: 50,
        temperature: 0.7,
      },
    });

    // Return the generated result
    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Error in HuggingFace inference:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
