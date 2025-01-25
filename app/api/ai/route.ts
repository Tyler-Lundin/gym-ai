export const config = {
  runtime: "edge",
};

import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { processInput } from "./(actions)/processInput";
import getExercise from "./(actions)/getExercise";
import { postExerciseEntry } from "./(actions)/postExerciseEntry";
import { getWorkout } from "@/app/(actions)/workout-actions";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { prompt, workoutId, timestamp, entryKey } = await req.json();
    const { userId } = getAuth(req);

    // Validate required fields
    if (!prompt) {
      return NextResponse.json({ error: "No prompt provided!" });
    }

    // Process input and extract necessary data
    const processedOutput = await processInput(prompt);
    const { exercise: e, workout: w } = processedOutput;
    const createdAt = new Date(timestamp);

    // Validate exercise and workout details
    if (
      e?.exerciseName &&
      e.equipment &&
      e.musclesTargeted &&
      e.description &&
      w?.workoutName
    ) {
      // Fetch or create the exercise
      const exercise = await getExercise({
        exerciseName: e.exerciseName,
        category: e.category,
        musclesTargeted: e.musclesTargeted || [],
        createdAt,
      });

      if (!exercise) {
        return NextResponse.json({
          error: "Failed to retrieve exercise data.",
        });
      }

      // Ensure user is authenticated
      if (!userId) {
        return NextResponse.json({ error: "User authentication failed." });
      }

      // Fetch or create the workout
      const workout = await getWorkout(
        userId,
        createdAt,
        workoutId,
        w.workoutName,
        w.notes,
      );

      if (!workout) {
        return NextResponse.json({ error: "Failed to retrieve workout data." });
      }

      // Create the exercise entry
      const exerciseEntry = await postExerciseEntry({
        userId,
        entryKey,
        exercise: { connect: { id: exercise.id } },
        workout: { connect: { id: workout.id } },
      });

      if (!exerciseEntry) {
        return NextResponse.json({ error: "Failed to create exercise entry." });
      }

      return NextResponse.json({ entry: exerciseEntry });
    }

    // Handle case where processed data is incomplete
    return NextResponse.json({
      processedOutput,
      message: "Input processed, but required fields are missing.",
    });
  } catch (err) {
    console.error("Error in /api/ai POST handler:", err);
    return NextResponse.json({ error: "Internal server error." });
  }
}
