import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

// Initialize the Hugging Face Inference client with your API token.
const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN || "");

export async function POST(req: NextRequest) {
  console.log("API route hit: /api/chat");

  try {
    if (!process.env.HUGGINGFACE_API_TOKEN) {
      console.error("HUGGINGFACE_API_TOKEN is not configured");
      throw new Error("HUGGINGFACE_API_TOKEN is not configured");
    }

    const body = await req.json();
    console.log("Received request body:", body);

    const prompt: string | undefined = body.prompt || body.inputs;
    if (!prompt) {
      console.error("Missing prompt in request body");
      return NextResponse.json(
        { error: "Missing 'prompt' field in request body" },
        { status: 400 }
      );
    }

    // Format the prompt in Llama 2's preferred chat format
    const formattedPrompt = `<s>[INST] You are a farming expert. Please provide a detailed and helpful answer to this farming question: ${prompt} [/INST]</s>`;

    try {
      const result = await hf.textGeneration({
        model: "meta-llama/Llama-2-7b-chat-hf",
        inputs: formattedPrompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.15,
          do_sample: true,
          return_full_text: false,
        },
      });

      if (!result || !result.generated_text) {
        throw new Error("No response generated from the model");
      }

      // Clean up the response
      let cleanedResponse = result.generated_text
        .replace(/\[\/INST\]|\[INST\]|<s>|<\/s>/g, "") // Remove Llama 2 formatting tokens
        .trim();

      // Post-process the response
      if (cleanedResponse.length === 0) {
        cleanedResponse =
          "I apologize, but I couldn't generate a clear response. Please try rephrasing your question about farming.";
      }

      // Ensure the response is properly formatted
      cleanedResponse = cleanedResponse
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .trim();

      if (!cleanedResponse.endsWith(".")) {
        cleanedResponse += ".";
      }

      return NextResponse.json({
        result: {
          generated_text: cleanedResponse,
        },
      });
    } catch (modelError: any) {
      console.error("Error calling HuggingFace API:", modelError);

      // If access to Llama 2 fails, try the smaller open source model
      try {
        console.log("Trying fallback model...");
        const fallbackResult = await hf.textGeneration({
          model: "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
          inputs: formattedPrompt,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
            top_p: 0.95,
            repetition_penalty: 1.15,
            do_sample: true,
          },
        });

        if (fallbackResult && fallbackResult.generated_text) {
          let fallbackResponse = fallbackResult.generated_text
            .replace(/\[\/INST\]|\[INST\]|<s>|<\/s>/g, "")
            .trim();

          if (!fallbackResponse.endsWith(".")) {
            fallbackResponse += ".";
          }

          return NextResponse.json({
            result: {
              generated_text: fallbackResponse,
            },
          });
        }
      } catch (fallbackError) {
        console.error("Fallback model also failed:", fallbackError);
      }

      throw new Error(`Model error: ${modelError.message}`);
    }
  } catch (error: any) {
    console.error("Error in API route:", error);
    const errorMessage = error.message || "Internal Server Error";
    const statusCode = error.status || 500;

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
