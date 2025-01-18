// app/(actions)/workout-actions.ts
"use server";

import { prisma } from "@/libs/prisma";
import { Prisma, Workout } from "@prisma/client";

interface CreateWorkoutPayload extends Prisma.WorkoutCreateInput {}
export async function createWorkout(data: CreateWorkoutPayload) {
  const workout = await prisma.workout.create({ data });
  return workout;
}

export async function getWorkout(
  userId: string,
  date: Date | null,
): Promise<Workout | null> {
  if (!date) return null;
  const workouts = await prisma.workout.findFirst({
    where: {
      userId,
      date,
    },
  });
  return workouts;
}

export async function getWorkouts(userId: string): Promise<Workout[] | null> {
  const workouts = await prisma.workout.findMany({
    where: {
      userId,
    },
  });

  return workouts;
}
