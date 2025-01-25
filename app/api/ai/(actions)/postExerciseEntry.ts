import { prisma } from "@/libs/prisma";
import { Entry, Prisma } from "@prisma/client";

export async function postExerciseEntry(
  eE: Prisma.EntryCreateInput,
): Promise<Entry | null> {
  let exerciseEntry;

  if (eE && eE.id) {
    exerciseEntry = await prisma.entry.findFirst({
      where: { id: eE.id },
    });
    if (exerciseEntry) return exerciseEntry;
  }

  if (!exerciseEntry) {
    exerciseEntry = await prisma.entry.create({
      data: eE,
    });
    return exerciseEntry;
  }
  return null;
}
