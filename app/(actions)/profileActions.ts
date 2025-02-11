"use server";

import { prisma } from "@/libs/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";

export async function getUserProfile({
  authId,
  email,
}: {
  authId: string;
  email: string;
}): Promise<User | null> {
  if (!authId) return null;
  return await prisma.user.findUnique({
    where: {
      authId,
      email,
    },
  });
}
