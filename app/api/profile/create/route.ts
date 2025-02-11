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
  user: User | null;
  redirect: boolean;
}

const newReturn = (s: Status, m: Message, user?: User, redirect?: boolean) =>
  NextResponse.json({ s, m, user: user || null, redirect: redirect ?? false });

/**
 * Validates user authentication and input data.
 */
const validateAuthData = async (username: string) => {
  const auth = await currentUser();
  if (!auth) return { error: newReturn("ERROR", "AUTH INVALID") };
  if (!auth.id) return { error: newReturn("ERROR", "USERID INVALID") };
  if (!auth.primaryEmailAddress)
    return { error: newReturn("ERROR", "EMAIL INVALID") };

  const existingUser = await prisma.user.findFirst({ where: { username } });

  // TODO: Add username filtering for profanity or reserved words.
  if (existingUser) return { error: newReturn("ERROR", "USERNAME INVALID") };

  return { auth };
};

/**
 * Creates a new user in the database.
 */
const createNewUser = async (
  userData: InitialUserData,
  authId: string,
  email: string,
) => {
  const { username, height, weight, units } = userData;

  return prisma.user.create({
    data: {
      authId,
      username,
      units,
      email,
      isInit: true,
      height_ft: height.feet || 0,
      height_in: height.inches || 0,
      height_cm: height.centimeters || 0,
      weight: weight || 0,
    },
  });
};

export async function POST(req: NextRequest) {
  try {
    const { userData } = await req.json();
    if (!userData) return newReturn("ERROR", "CREATE FAILED");

    console.log({ userData });

    // Validate user and username availability
    const validation = await validateAuthData(userData.username);
    if (validation.error) return validation.error;
    const { auth } = validation;
    const email = (auth && auth.primaryEmailAddress?.emailAddress) || "";
    // Create new user profile
    const newUser = await createNewUser(userData, auth.id, email);

    if (!newUser) return newReturn("ERROR", "CREATE FAILED");

    return newReturn("SUCCESS", "PROFILE CREATED", newUser, true);
  } catch (error) {
    console.error("User creation failed:", error);
    return newReturn("ERROR", "CREATE FAILED");
  }
}
