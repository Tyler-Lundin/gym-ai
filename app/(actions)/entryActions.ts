"use server";
import { prisma } from "@/libs/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { getWorkout } from "./workoutActions";
import { getUserProfile } from "./profileActions";
import { Entry } from "@prisma/client";

export async function getEntries(): Promise<Entry[] | null> {
  try {
    const todaysDate = new Date();
    const auth = await currentUser();
    if (!auth) return null;
    const { id: authId, primaryEmailAddress } = auth;
    const email = primaryEmailAddress?.emailAddress;
    if (!email) return null;
    const user = await getUserProfile({ authId, email });
    if (!user) return null;
    const userId = user.id;

    const startOfDay = new Date(todaysDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(todaysDate.setHours(23, 59, 59, 999));

    const entries = await prisma.entry.findMany({
      where: {
        userId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    return entries;
  } catch {
    return null;
  }
}

export async function DeleteEntry({ id }: { id: string }) {
  const user = await currentUser();
  if (!user) return;
  const deletedEntry = await prisma.entry.delete({
    where: {
      id,
    },
  });
  return deletedEntry;
}
