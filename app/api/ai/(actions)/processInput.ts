import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { TypeOf, z } from "zod";
import {
  processInputPrompt as system,
  actions,
} from "../(prompts)/process-input-prompt";

const exerciseSchema = z.object({
  exerciseName: z.string(),
  category: z.string(),
  description: z.string(),
  musclesTargeted: z.array(z.string()),
  equipment: z.array(z.string()),
  weight: z.number().optional(),
  reps: z.number().optional(),
  intensity: z.number().min(0).max(10).optional(),
  rir: z.number().optional(),
  duration: z.number().optional(),
  restTime: z.number().optional(),
  notes: z.string().optional(),
});

const workoutSchema = z.object({
  workoutName: z.string(),
  date: z.date(),
  notes: z.string(),
});

export const processInputSchema = z.object({
  workout: workoutSchema,
  exercise: exerciseSchema,
  period: z.object({}).optional(),
  cycle: z.object({}).optional(),
  goal: z.object({}).optional(),
  user: z.object({}).optional(),
});

interface ProcessedOutput {
  modelKey?: string;
  actionKey?: string;
  exercise?: z.infer<typeof exerciseSchema>;
  workout?: z.infer<typeof workoutSchema>;
  error?: string;
}

export async function processInput(
  prompt: string | null,
): Promise<ProcessedOutput> {
  if (!prompt) {
    return { error: "no prompt" };
  }

  const { object } = await generateObject({
    model: openai("gpt-4"),
    system,
    prompt,
    schema: processInputSchema,
  });

  console.log("Object:", object);

  return { ...object } as ProcessedOutput;
}
