"use server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "./(components)/landing-page";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";
import Dashboard from "./dashboard/page";

export default async function Index() {
  const authUser = await currentUser();
  const user = await prisma.user.findFirst({
    where: { authId: authUser?.id || "" },
  });
  if (authUser && !user) redirect("/register");
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </>
  );
}
