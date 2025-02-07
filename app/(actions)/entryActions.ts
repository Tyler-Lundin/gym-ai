"use server";
import { prisma } from "@/libs/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { getWorkout } from "./workoutActions";

export async function getEntries() {
  const todaysDate = new Date();
  const user = await currentUser();
  if (!user) return [];
  const workout = await getWorkout(user.id, todaysDate, null);
  if (!workout) return [];
  return prisma.entry.findMany({
    where: { workoutId: workout.id },
  });
}
