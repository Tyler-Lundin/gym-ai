"use server";

import { prisma } from "@/libs/prisma";
import { Prisma, Workout } from "@prisma/client";
import { format } from "date-fns";

type CreateWorkoutPayload = Prisma.WorkoutCreateInput;
export async function createWorkout(data: CreateWorkoutPayload) {
  const workout = await prisma.workout.create({ data });
  return workout;
}

export async function getWorkout(
  userId: string,
  date: Date | null,
  workoutId: string | null,
): Promise<Workout | null> {
  if (!date || !userId) return null;

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

  const initialName = format(new Date(date), "mm-dd-yyyy");

  const newWorkout = await prisma.workout.create({
    data: { userId, name: initialName, date },
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
