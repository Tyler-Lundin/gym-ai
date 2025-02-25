import { prisma } from "@/libs/prisma";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import { User, Workout } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type Status = "ERROR" | "SUCCESS";
export type Message =
  | "Not authorized"
  | "Invalid email"
  | "Account not found"
  | "Workout not found"
  | "Workout found"
  | "Account found";

type FinishWith = {
  s: Status;
  m: Message;
  user?: User | null;
  workout?: Workout | null;
};
const finishWith = ({
  s,
  m,
  user,
  workout,
}: FinishWith): NextResponse<FinishWith> =>
  NextResponse.json({ s, m, user: user || null, workout: workout || null });

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) return finishWith({ s: "ERROR", m: "Not authorized" });

  const authUser = await currentUser();
  if (!authUser) return finishWith({ s: "ERROR", m: "Not authorized" });
  const email = String(authUser?.primaryEmailAddress);
  if (!email) return finishWith({ s: "ERROR", m: "Invalid email" });

  const targetDate = new Date();
  const user = await prisma.user.findUnique({
    where: { authId: userId, email },
  });
  if (!user) return finishWith({ s: "ERROR", m: "Account not found" });

  const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

  const workout = await prisma.workout.findFirst({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
      userId,
    },
  });
  if (!workout) return finishWith({ s: "ERROR", m: "Workout not found" });
  else return finishWith({ s: "SUCCESS", m: "Workout found", user, workout });
}
