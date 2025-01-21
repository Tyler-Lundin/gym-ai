import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import {
  processInputPrompt as system,
  actions,
} from "../(prompts)/process-input-prompt";

export const processInputSchema = z.object({
  modelKey: z.string().min(1, "Model is required"),
  actionKey: z.enum([
    "reject",
    "create",
    "read",
    "update",
    "delete",
    "suggest",
    "analyze",
  ]),
  workout: z
    .object({
      workoutName: z.string(),
      date: z.date(),
      notes: z.string(),
    })
    .optional(),
  exercise: z
    .object({
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
    })
    .optional(),
  period: z.object({}).optional(),
  cycle: z.object({}).optional(),
  goal: z.object({}).optional(),
  user: z.object({}).optional(),
});

export async function processInput(prompt: string | null) {
  if (!prompt) {
    return { result: undefined };
  }

  const { object } = await generateObject({
    model: openai("gpt-4"),
    system,
    prompt,
    schema: processInputSchema,
  });

  console.log("Object:", object);
}
