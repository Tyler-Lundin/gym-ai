"use client";

import { createProfileState } from "@/app/atoms";
import { StepControlProps } from "@/types/create-profile-state";
import { useAtom } from "jotai";

export default function TrainingPreferencesStep({
  handlePrevAction,
  handleNextAction,
}: StepControlProps) {
  const [{ preferences }, setState] = useAtom(createProfileState);
  const button = "p-4 font-bold ";

  function setPreference(prefers: typeof preferences) {
    setState((state) => ({ ...state, preferences: prefers }));
  }

  return (
    <div>
      <label className="text-2xl font-thin tracking-wide text-center">
        <h2>What is your main focus?</h2>
      </label>
      <button
        className={`${button} ${preferences === "STRENGTH" ? "bg-green-400 text-black" : "bg-white dark:bg-black text-black dark:text-white"}`}
        onClick={() => setPreference("STRENGTH")}
      >
        Strength
      </button>
      <button
        className={`${button} ${preferences === "HYPERTROPHY" ? "bg-green-400 text-black" : "bg-white dark:bg-black text-black dark:text-white"}`}
        onClick={() => setPreference("HYPERTROPHY")}
      >
        Hypertrophy
      </button>
      <button
        className={`${button} ${preferences === "BOTH" ? "bg-green-400 text-black" : "bg-white dark:bg-black text-black dark:text-white"}`}
        onClick={() => setPreference("BOTH")}
      >
        Both
      </button>
    </div>
  );
}
