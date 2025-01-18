// app/(actions)/entry-actions.ts
'use server';

import { ExerciseEntry, Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';

interface ExerciseEntryPayload extends Prisma.ExerciseEntryCreateInput {}
export async function createExerciseEntry(data: ExerciseEntryPayload) {
  const exerciseEntry = await prisma.exerciseEntry.create({ data });
  return exerciseEntry;
}
