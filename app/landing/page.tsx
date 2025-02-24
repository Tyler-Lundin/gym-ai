"use server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";
import LandingPage from "../(components)/landing-page";

export default async function LandingIndex() {
  const authUser = await currentUser();
  const user = await prisma.user.findFirst({
    where: { authId: authUser?.id || "" },
  });
  const isSignedIn = authUser && user;
  if (!isSignedIn) return <LandingPage />;
  if (isSignedIn && !user) redirect("/create-profile");
  if (isSignedIn && user) redirect("/dashboard");
}
