"use server";
import { prisma } from "@/libs/prisma";
import { CreateProfileState } from "@/types/create-profile-state";
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

export async function createUserProfile({
  state,
  authId,
  email,
}: {
  state: CreateProfileState;
  authId: string;
  email: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const {
      bodyMetrics,
      username,
      unitSystem,
      preference,
      pattern,
      experience,
      strength,
    } = state;

    if (!username || !unitSystem || !pattern || !experience || !strength) {
      return { success: false, error: "Missing required fields" };
    }

    const user = await prisma.user.findUnique({
      where: { authId, email },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Run database writes as an atomic transaction
    await prisma.$transaction([
      prisma.userStats.create({
        data: {
          bodyweightKgs: bodyMetrics.weight.kg,
          bodyweightLbs: bodyMetrics.weight.lb,
          userId: user.id,
        },
      }),
      prisma.schedule.create({
        data: {
          userId: user.id,
          pattern,
          preference,
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { username, units: unitSystem },
      }),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Error creating user profile:", error);
    return { success: false, error: "Internal server error" };
  }
}
