// export const config = {
//   runtime: "edge",
// };
//
// import { getAuth } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";
// import { processInput } from "./(actions)/processInput";
// import getExercise from "./(actions)/getExercise";
// import { postExerciseEntry } from "./(actions)/postExerciseEntry";
// import { prisma } from "@/libs/prisma";
// import { Entry, Workout } from "@prisma/client";
// import { getWorkout } from "@/app/(actions)/workoutActions";
//
// export interface AiReturn {
//   entry?: Entry;
//   workout?: Workout;
// }
//
// export async function POST(req: NextRequest) {
//   try {
//     // Parse request body
//     const { prompt, workoutId, timestamp } = await req.json();
//     const { userId } = getAuth(req);
//
//     // Validate required fields
//     if (!prompt) {
//       return NextResponse.json({ error: "No prompt provided!" });
//     }
//
//     // Process input and extract necessary data
//     const processedOutput = await processInput(prompt);
//     if (processedOutput.error) console.log("ERROR: ", processedOutput.error);
//     if (processedOutput.error) return NextResponse.error();
//     const { exercise: e } = processedOutput;
//     const createdAt = new Date(timestamp);
//
//     // Validate exercise and workout details
//     if (e?.name) {
//       // Fetch or create the exercise
//       const exercise = await getExercise({
//         name: e.name,
//         categories: e.categories,
//         musclesTargeted: e.musclesTargeted || [],
//         createdAt,
//       });
//
//       if (!exercise) {
//         return NextResponse.json({
//           error: "Failed to retrieve exercise data.",
//         });
//       }
//
//       // Ensure user is authenticated
//       if (!userId) {
//         return NextResponse.json({ error: "User authentication failed." });
//       }
//
//       // Fetch or create the workout
//       const workout = await getWorkout(userId, createdAt, workoutId);
//
//       if (!workout) {
//         return NextResponse.json({ error: "Failed to retrieve workout data." });
//       }
//
//       // Create the exercise entry
//
//       const entry = await prisma.entry.create({
//         data: {
//           weight: e.weight || null,
//           workout: { connect: { id: workout.id } },
//           exerciseId: exercise.id,
//           prompt,
//         },
//       });
//
//       if (!entry) {
//         return NextResponse.json({ error: "Failed to create exercise entry." });
//       }
//
//       if ((e && e.weight) || e.reps) {
//         let previousTotalReps = workout.totalReps || 0;
//         let incrementReps = e && e.reps ? e.reps : 0;
//
//         let previousTotalWeight = workout.totalWeight || 0;
//         let incrementWeight = e && e.weight && e.reps ? e.weight * e.reps : 0;
//
//         if (incrementReps && incrementWeight) {
//           const updatedStats = await prisma.workout.update({
//             where: { id: workout.id },
//             data: {
//               totalReps: previousTotalReps + incrementReps,
//             },
//           });
//
//           return NextResponse.json({ entry, workout: updatedStats });
//         }
//       }
//     }
//
//     // Handle case where processed data is incomplete
//     return NextResponse.json({
//       processedOutput,
//       message: "Input processed, but required fields are missing.",
//     });
//   } catch (err) {
//     console.error("Error in /api/ai POST handler:", err);
//     return NextResponse.json({ error: "Internal server error." });
//   }
// }
