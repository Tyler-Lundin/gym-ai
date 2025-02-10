"use server";
import { prisma } from "@/libs/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function sendPrompt({ prompt }: { prompt: string }) {
  const user = await currentUser();
  if (!user) return;
  const newEntry = await prisma.entry.create({
    data: {
      prompt,
    },
  });

  return newEntry;
}
