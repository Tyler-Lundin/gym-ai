import { InitialUserData } from "@/app/create-profile/components/Initialize";
import { prisma } from "@/libs/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type Status = "ERROR" | "SUCCESS";
export type InitializeStatus = Status;
type Message =
  | "USERNAME INVALID"
  | "PROFILE CREATED"
  | "USERID INVALID"
  | "AUTH INVALID"
  | "CREATE FAILED"
  | "EMAIL INVALID";
export type InitializeMessage = Message;

export interface InitializeReturn {
  s: Status;
  m: Message;
  user: User | undefined;
  redirect: boolean;
}

const newReturn = (s: Status, m: Message, user?: User, redirect?: boolean) =>
  NextResponse.json({ s, m, user: user || null, redirect });

export async function POST(req: NextRequest) {
  const { userData } = await req.json();
  const { username, height, weight, units } = userData as InitialUserData;
  console.log({ userData });
  const user = await currentUser();

  /* Guards */
  if (!user) return newReturn("ERROR", "AUTH INVALID");

  if (!user.id) return newReturn("ERROR", "USERID INVALID");
  if (!user.primaryEmailAddress) return newReturn("ERROR", "EMAIL INVALID");

  /* Check for Current User */
  const existingUser = await prisma.user.findFirst({
    where: { username },
  });

  //TODO: Filter username for things here (profanity, etc)
  if (existingUser) return newReturn("ERROR", "USERNAME INVALID");

  const newUser = await prisma.user.create({
    data: {
      authId: user.id,
      username,
      units,
      email: user.primaryEmailAddress.emailAddress,
      isInit: true,
      height_ft: height.feet || 0,
      height_in: height.inches || 0,
      height_cm: height.centimeters || 0,
      weight: weight || 0,
    },
  });

  if (!newUser) return newReturn("ERROR", "CREATE FAILED");

  console.log({ newUser, redirecting: true });
  return newReturn("SUCCESS", "PROFILE CREATED", newUser, true);
}
