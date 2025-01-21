// app/(actions)/entry-actions.ts
"use server";

import { prisma } from "@/libs/prisma";
import { Entry, Prisma } from "@prisma/client";

interface ExerciseEntryPayload extends Prisma.EntryCreateInput { }
export async function createExerciseEntry(data: ExerciseEntryPayload) {
  const exerciseEntry = await prisma.entry.create({ data });
  return exerciseEntry;
}
