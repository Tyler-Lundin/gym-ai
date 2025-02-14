"use server";
import { prisma } from "@/libs/prisma";
import { openai } from "@ai-sdk/openai";
import { Prisma } from "@prisma/client";
import { generateObject } from "ai";
import { processInputPrompt as system } from "../api/ai/(prompts)/process-input-prompt";
import {
  EntrySchema,
  ExerciseSchema,
  ProcessPromptSchema,
  zProcessedPrompt,
} from "@/types/zod-schema";
import { getUserId } from "./userActions";

// Send the prompt and process it
export async function sendPrompt({
  prompt,
  timestamp,
}: {
  prompt: string;
  timestamp: Date;
}) {
  const userId = await getUserId();
  if (!userId) return null;

  // Create the entry in the database
  const newEntry = await prisma.entry.create({
    data: {
      prompt,
      userId,
      createdAt: timestamp,
    },
  });
  if (!newEntry) return null;

  // Process the prompt and extract data
  const processedPrompt = await processPrompt({ entry: newEntry });
  if (!processedPrompt) return newEntry;

  // Validate each part of the processed prompt and only create/update if valid
  const updatePromises = [];

  // Entry - Update or create only if data is valid
  const parsedEntry = EntrySchema.safeParse(processedPrompt.entry);
  if (parsedEntry.success) {
    updatePromises.push(
      prisma.entry.update({
        where: { id: newEntry.id },
        data: {
          ...parsedEntry.data,
        } as Prisma.EntryUpdateInput,
      }),
    );
  }

  const parsedExercise = ExerciseSchema.safeParse(processedPrompt.exercise);
  if (parsedExercise.success) {
    const {
      name: exerciseName,
      musclesTargeted,
      categories,
      description,
      equipment,
      // metadata,
    } = parsedExercise.data;

    // Try to find an existing exercise by name
    const existingExercise = await prisma.exercise.findFirst({
      where: { name: exerciseName },
    });

    let exerciseId: string;

    if (!existingExercise) {
      // If the exercise doesn't exist, create a new one
      const newExercise = await prisma.exercise.create({
        data: {
          name: exerciseName,
          musclesTargeted,
          categories,
          description,
          equipment,
        },
      });
      exerciseId = newExercise.id;
    } else {
      // If the exercise exists, use the existing exercise ID
      exerciseId = existingExercise.id;
    }

    // Now update the entry to include the exerciseId
    updatePromises.push(
      prisma.entry.update({
        where: { id: newEntry.id },
        data: {
          exerciseId, // Link the exerciseId to the entry
        },
      }),
    );
  }

  // Execute all update or create operations in parallel
  const results = await Promise.all(updatePromises);
  console.log({ results });

  // Return the updated data
  return results;
}

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
