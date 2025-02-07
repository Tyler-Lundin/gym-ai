import { prisma } from "@/libs/prisma";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import { User, Workout } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type Status = "ERROR" | "SUCCESS";
export type Message =
  | "AUTH ERROR"
  | "EMAIL ERROR"
  | "USER NOT FOUND"
  | "WORKOUT NOT FOUND"
  | "WORKOUT FOUND"
  | "USER FOUND";

const newReturn = (
  s: Status,
  m: Message,
  user?: User | null,
  workout?: Workout | null,
) => NextResponse.json({ s, m, user: user || null, workout: workout || null });

export async function GET(req: NextRequest, res: NextResponse) {
  const { userId } = getAuth(req);
  const authUser = await currentUser();
  if (!userId) return newReturn("ERROR", "AUTH ERROR");
  const email = String(authUser?.primaryEmailAddress);
  if (!email) return newReturn("ERROR", "EMAIL ERROR");

  const targetDate = new Date();

  const user = await prisma.user.findUnique({
    where: { authId: userId, email },
  });

  const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

  if (user) {
    const workout = await prisma.workout.findFirst({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        userId,
      },
    });
    if (workout) return newReturn("SUCCESS", "WORKOUT FOUND", user, workout);
  } else return newReturn("ERROR", "WORKOUT NOT FOUND");
  return newReturn("ERROR", "USER NOT FOUND");
}

// async function findOrCreateUser(authId: string) {
//   const currentUser = await prisma.user.findUnique({
//     where: { authId },
//   });
// }
