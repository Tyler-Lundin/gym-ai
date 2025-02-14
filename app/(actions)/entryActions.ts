"use server";
import { prisma } from "@/libs/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Entry } from "@prisma/client";
import { getUserId } from "./userActions";
import { getUserProfile } from "./profileActions";

export async function getEntries(targetDate: Date): Promise<Entry[] | null> {
  try {
    const userId = await getUserId();
    if (!userId) return null;

    const date = new Date(targetDate);
    date.setHours(0, 0, 0, 0);

    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const entries = await prisma.entry.findMany({
      where: {
        userId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        exercise: true,
      },
      take: 10,
    });

    if (!entries || entries.length < 1) return null;
    console.log({ entries });
    return entries;
  } catch (error) {
    console.error("Error fetching entries:", error);
    return null;
  }
}

export async function deleteEntry({ id }: { id: string }) {
  const auth = await currentUser();
  if (!auth) return null;
  const authId = auth.id;
  const email = auth.primaryEmailAddress?.emailAddress;
  if (!email || !authId) return null;
  const user = await getUserProfile({ authId, email });

  try {
    const deletedEntry = await prisma.entry.delete({
      where: {
        id,
        userId: user?.id,
      },
    });
    return deletedEntry;
  } catch (error) {
    console.error("Error deleting entry:", error);
    return null;
  }
}
