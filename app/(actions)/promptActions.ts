"use server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { EntrySchema, ExerciseSchema } from "@/types/zod-schema";
import { getUserId } from "./userActions";
import { processPrompt } from "./ai-actions";

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

  const newEntry = await prisma.entry.create({
    data: {
      prompt,
      userId,
      createdAt: timestamp,
    },
  });
  if (!newEntry)
    return { message: "Failure to create new entry!", status: "ERROR" };

  const processedPrompt = await processPrompt({ entry: newEntry });
  if (!processedPrompt) return newEntry;
  const { entry, exercise } = processedPrompt;

  const updatePromises = [];

  if (!entry) return newEntry;
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

  if (!exercise) return newEntry;
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

    if (parsedEntry.data) {
      const repIncrement = parsedEntry.data.reps;
      const weightIncrement = parsedEntry.data.weight;
      updatePromises.push(
        prisma.user.update({
          where: { id: userId },
          data: {
            totalReps: { increment: repIncrement || undefined },
            totalWeight: { increment: weightIncrement || undefined },
          },
        }),
      );
    }
  }

  // Execute all update or create operations in parallel
  const results = await Promise.all(updatePromises);
  console.log({ results });

  // Return the updated data
  return results;
}
