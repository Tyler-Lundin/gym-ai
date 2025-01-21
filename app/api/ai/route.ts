export const config = {
  runtime: "edge",
};

import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { processInput } from "./(actions)/processInput";
import { postExerciseEntry } from "./(actions)/postExerciseEntry";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { prompt, workoutId } = await req.json();
    const { userId } = getAuth(req);
    const output = await processInput(prompt || null);
    return NextResponse.json({ output, success: "/api/ai POST SUCCESS" });
  } catch (err) {
    return NextResponse.json({ error: "/api/ai POST FAILED" });
  }
}
