import { prisma } from "@/libs/prisma";

export default async function incrementWorkoutStats({
  workoutId,
  reps,
  weight,
}: {
  workoutId: string;
  reps: number | null;
  weight: number | null;
}) {
  if (weight || reps) {
    let previousTotalReps = workout.totalReps || 0;
    let incrementReps = e && e.reps ? e.reps : undefined;

    let previousTotalWeight = workout.totalWeight || 0;
    let incrementWeight = e && e.weight ? e.weight * e.reps : undefined;

    if (incrementReps && incrementWeight) {
      const updatedStats = await prisma.workout.update({
        where: { id: workout.id },
        data: {
          totalReps: previousTotalReps + incrementReps,
        },
      });
    }
  }
}
