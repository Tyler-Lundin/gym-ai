import { prisma } from "@/libs/prisma";
import { ExerciseEntry, Prisma } from "@prisma/client";

export async function postExerciseEntry(
  eE: Prisma.ExerciseEntryCreateInput,
): Promise<ExerciseEntry | null> {
  let exerciseEntry;

  if (eE && eE.id) {
    exerciseEntry = await prisma.exerciseEntry.findFirst({
      where: { id: eE.id },
    });
    if (exerciseEntry) return exerciseEntry;
  }

  if (!exerciseEntry) {
    exerciseEntry = await prisma.exerciseEntry.create({
      data: eE,
    });
    return exerciseEntry;
  }
  return null;
}
