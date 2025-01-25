// app/(actions)/entry-actions.ts
"use server";

import { prisma } from "@/libs/prisma";
import { Entry, Prisma } from "@prisma/client";
import { generateObject } from "ai";

interface ExerciseEntryPayload extends Prisma.EntryCreateInput {}
export async function createExerciseEntry(data: ExerciseEntryPayload) {
  const exerciseEntry = await prisma.entry.create({ data });
  return exerciseEntry;
}
// (userId, entryKey, workoutId, prompt)
export async function getExerciseEntry(
  userId: string | null | undefined,
  entryKey: string | null,
  workoutId: string | null,
  prompt: string | null,
): Promise<Entry | null> {
  if (!userId || !entryKey || !workoutId) return null;
  const exerciseEntry = await prisma.entry.findFirst({
    where: { userId, entryKey, workoutId },
  });
  if (exerciseEntry) return exerciseEntry;
  return null;
}
