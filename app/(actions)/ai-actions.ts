import { ProcessPromptSchema, zProcessedPrompt } from "@/types/zod-schema";
import { openai } from "@ai-sdk/openai";
import { Prisma } from "@prisma/client";
import { processInputPrompt as system } from "../api/ai/(prompts)/process-input-prompt";
import { generateObject } from "ai";

// Function to process the prompt and get validated data
export async function processPrompt({
  entry,
}: {
  entry: Prisma.EntryGetPayload<object>;
}): Promise<zProcessedPrompt | null> {
  const { object } = await generateObject({
    model: openai("gpt-4"),
    system,
    prompt: entry.prompt,
    schema: ProcessPromptSchema,
  });

  console.log("Generated Object from processPrompt in promptActions:", object);

  const processed = ProcessPromptSchema.safeParse(object);
  if (!processed.success) return null;
  return processed.data;
}
