import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export const processExerciseSchema = {
  exercisename: z.string(),
  id: z.string(),
  category: z.string(),
  description: z.string().optional(),
  musclesTargeted: z.array(z.string()).optional(),
  equipment: z.string(),
  createdAt: z.date(),
};

export async function processExercise() {
  const { object } = await generateObject({
    model: openai("gpt-4"),
    system: `
      You are here to convert the following users 
      prompt into useable and important information.
      Discard unecessary information, and only take in
      things that are confirmed, don't guess on data
      Your goal is to benefit the user's gym career.
      intensity is a scale from 0-10, (RIR) 

      for this object, you are processing it into the "ExerciseType"
      fill out concrete info, disregard info that doesn't apply
      format everything to be in lowercase
    `,
    schema: z.object(processExerciseSchema),
  });

  return object;
}
