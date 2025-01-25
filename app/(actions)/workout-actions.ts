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
  workoutId: string | null,
  workoutName: string | null,
  notes: string | null,
): Promise<Workout | null> {
  if (!date || !userId || !workoutName) return null;

  if (workoutId) {
    const workout = await prisma.workout.findFirst({
      where: {
        userId,
        date,
        id: workoutId,
      },
    });

    if (workout) return workout;
  }

  const newWorkout = await prisma.workout.create({
    data: { userId, workoutName, notes },
  });

  return newWorkout;
}

export async function getWorkouts(
  userId: string,
  date: Date | null,
): Promise<Workout[] | null> {
  if (!date) {
    return await prisma.workout.findMany({
      where: {
        userId,
      },
    });
  }

  // Calculate ±6 hours range
  const startDate = new Date(date.getTime() - 6 * 60 * 60 * 1000); // 6 hours before
  const endDate = new Date(date.getTime() + 6 * 60 * 60 * 1000); // 6 hours after

  const workouts = await prisma.workout.findMany({
    where: {
      userId: userId, // Match the userId
      AND: [
        {
          date: {
            gte: startDate, // Greater than or equal to startDate
          },
        },
        {
          date: {
            lte: endDate, // Less than or equal to endDate
          },
        },
      ],
    },
  });

  return workouts;
}
