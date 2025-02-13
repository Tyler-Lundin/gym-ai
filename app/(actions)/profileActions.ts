"use server";
import { prisma } from "@/libs/prisma";
import { User } from "@prisma/client";

export async function getUserProfile({
  authId,
  email,
}: {
  authId: string;
  email: string;
}): Promise<User | null> {
  if (!authId) return null;
  const userProfile = await prisma.user.findUnique({
    where: {
      authId,
      email,
    },
  });

  console.log({ userProfile });

  return userProfile;
}
