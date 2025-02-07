import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { TypeOf, z } from "zod";
import {
  processInputPrompt as system,
  actions,
} from "../(prompts)/process-input-prompt";

const exerciseSchema = z.object({
  name: z.string(),
  categories: z.array(z.string()).optional(),
  description: z.string().optional(),
  musclesTargeted: z.array(z.string()).optional(),
  equipment: z.array(z.string()).optional(),
  weight: z.number().optional(),

  reps: z.number().optional(),
  intensity: z.number().min(0).max(10).optional(),
  rir: z.number().optional(),
  duration: z.number().optional(),
  restTime: z.number().optional(),
  notes: z.string().optional(),
});

export const processInputSchema = z.object({
  exercise: exerciseSchema.optional(),
  period: z.object({}).optional(),
  cycle: z.object({}).optional(),
  goal: z.object({}).optional(),
  user: z.object({}).optional(),
});

interface ProcessedOutput {
  exercise?: z.infer<typeof exerciseSchema>;
  error?: string;
}

export async function processInput(
  prompt: string | null,
): Promise<ProcessedOutput> {
  if (!prompt) {
    return { error: "no prompt" };
  }

  console.log({ prompt });

  try {
    const { object } = await generateObject({
      model: openai("gpt-4"),
      system,
      prompt,
      schema: processInputSchema,
    });

    processInputSchema.parse(object);
    console.log("Object:", object);

    return { ...object } as ProcessedOutput;
  } catch (err) {
    console.error("Error generating or validating object:", err);
    return { error: "Failed to generate or validate object" };
  }
}
