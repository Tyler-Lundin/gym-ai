"use server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export default async function Index() {
  const authUser = await currentUser();
  const user = await prisma.user.findFirst({
    where: { authId: authUser?.id || "" },
  });
  const isSignedIn = authUser && user;
  if (!isSignedIn) redirect("/landing");
  if (isSignedIn && !user) redirect("/create-profile");
  if (isSignedIn && user) redirect("/dashboard");
}
