"use client";
import NumberInput from "@/app/(components)/number-input";
import { createProfileState } from "@/app/atoms";
import { StepControlProps } from "@/types/create-profile-state";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { Bebas_Neue } from "next/font/google";

const font = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function StrengthLevelsStep({
  handleNextAction,
}: StepControlProps) {
  const [state, setState] = useAtom(createProfileState);
  function handleBench(bench: number) {
    if (bench > 999 || bench < 0) return;
    setState((oldState) => ({
      ...oldState,
      strength: { ...oldState.strength, bench },
    }));
  }
  function handleSquat(squat: number) {
    if (squat > 999 || squat < 0) return;
    setState((oldState) => ({
      ...oldState,
      strength: { ...oldState.strength, squat },
    }));
  }
  function handleDeadlift(deadlift: number) {
    if (deadlift > 999 || deadlift < 0) return;
    setState((oldState) => ({
      ...oldState,
      strength: { ...oldState.strength, deadlift },
    }));
  }

  const input =
    "bg-white text-black border border-black/50 dark:border-white/50 dark:bg-black/50 dark:text-white text-3xl p-4 rounded-lg";

  const label = "";

  const container = "grid ";

  return (
    <motion.div
      onKeyDown={(e) => { }}
      initial={{ opacity: 0, translateX: 200 }}
      animate={{ opacity: 100, translateX: 0 }}
      exit={{ opacity: 0, translateX: -200 }}
      className="grid gap-4 justify-center p-3 md:p-8"
      style={{ ...font.style }}
    >
      <span id="BENCH">
        <label className="text-2xl font-thin tracking-wide text-left">
          Estimated Bench 1RM
        </label>
        <NumberInput
          value={state.strength.bench}
          onChangeAction={handleBench}
        />
      </span>
      <span id="SQUAT">
        <label className="text-2xl font-thin tracking-wide text-left">
          Estimated Squat 1RM
        </label>
        <NumberInput
          value={state.strength.squat}
          onChangeAction={handleSquat}
        />
      </span>
      <span id="DEADLIFT">
        <label className="text-2xl font-thin tracking-wide text-left">
          Estimated Deadlift 1RM
        </label>
        <NumberInput
          value={state.strength.deadlift}
          onChangeAction={handleDeadlift}
        />
      </span>
    </motion.div>
  );
}
