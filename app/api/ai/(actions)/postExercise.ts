import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { Exercise } from "@prisma/client";

export default async function PostExercise(
  e: Prisma.ExerciseCreateInput,
): Promise<Exercise | null> {
  let exercise;

  if (e && e.id) {
    exercise = await prisma.exercise.findFirst({
      where: { id: e.id },
    });
    if (exercise) return exercise;
  }

  if (!exercise) {
    exercise = await prisma.exercise.create({
      data: e,
    });
    return exercise;
  }
  return null;
}
