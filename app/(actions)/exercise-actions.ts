// app/(actions)/exercise-actions.ts
"use server";

import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

interface ExercisePayload extends Prisma.ExerciseCreateInput { }
export async function createExerciseEntry(data: ExercisePayload) {
  const exercise = await prisma.exercise.create({ data });
  return exercise;
}
