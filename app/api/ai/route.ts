import { getAuth } from "@clerk/nextjs/server";
import { Exercise, ExerciseEntry, Workout } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/* 0 - Process Workout
 * 1 - Process Exercise
 * 2 - Unused
 * 3 - Unused
 */
interface processedInput {
  case: number;
  exercise?: Exercise;
  exerciseEntry?: ExerciseEntry;
  workout?: Workout;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { input } = await req.json();
  const { userId } = getAuth(req);

  const processedInput = await processInput(input);

  switch (processedInput.case) {
    case 0:
      break;
    case 1:
      break;
    default:
      break;
  }
}
