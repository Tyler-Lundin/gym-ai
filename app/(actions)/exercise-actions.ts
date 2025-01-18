// app/(actions)/exercise-actions.ts
'use server';

import { ExerciseEntry, Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';

interface ExercisePayload extends Prisma.ExerciseCreateInput {}
export async function createExerciseEntry(data: ExercisePayload) {
  const exercise = await prisma.exercise.create({ data });
  return exercise;
}
