"use server";

import { prisma } from "@/libs/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function isUsernameTaken(username: string): Promise<boolean> {
  const auth = await currentUser();
  if (!auth) return false;

  const { id: authId, primaryEmailAddress } = auth;
  const email = primaryEmailAddress?.emailAddress;
  if (!email) return false;

  const user = await prisma.user.findFirst({ where: { username } });
  return user ? true : false;
}
