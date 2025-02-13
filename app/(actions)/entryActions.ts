"use server";
import { prisma } from "@/libs/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Entry } from "@prisma/client";
import { getUserId } from "./userActions";

export async function getEntries(): Promise<Entry[] | null> {
  try {
    // const todaysDate = new Date();
    const userId = await getUserId();
    if (!userId) return null;

    // Ensure startOfDay and endOfDay are new Date objects
    // const startOfDay = new Date(
    //   todaysDate.getFullYear(),
    //   todaysDate.getMonth(),
    //   todaysDate.getDate(),
    //   0,
    //   0,
    //   0,
    //   0,
    // );
    // const endOfDay = new Date(
    //   todaysDate.getFullYear(),
    //   todaysDate.getMonth(),
    //   todaysDate.getDate(),
    //   23,
    //   59,
    //   59,
    //   999,
    // );

    const entries = await prisma.entry.findMany({
      where: {
        userId,
      },
      include: {
        exercise: true,
      },
      take: 10,
    });
    console.log({ entries });
    return entries;
  } catch (error) {
    console.error("Error fetching entries:", error);
    return null;
  }
}

export async function DeleteEntry({ id }: { id: string }) {
  const user = await currentUser();
  if (!user) return null;

  try {
    const deletedEntry = await prisma.entry.delete({
      where: {
        id,
      },
    });
    return deletedEntry;
  } catch (error) {
    console.error("Error deleting entry:", error);
    return null;
  }
}
