"use client";

import { CreateProfileStepProps } from "@/types/create-profile-state";

export default function ReadinessStep({
  state,
  setStateAction,
}: CreateProfileStepProps) {
  return (
    <div>
      <h2>How do you feel right now?</h2>
      <button onClick={() => console.log("Fresh")}>Fresh & Ready</button>
      <button onClick={() => console.log("Normal")}>Normal</button>
      <button onClick={() => console.log("Fatigued")}>Fatigued</button>
    </div>
  );
}
