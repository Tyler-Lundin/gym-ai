"use client";
import { createProfileState } from "@/app/atoms";
import { StepControlProps } from "@/types/create-profile-state";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { Bebas_Neue } from "next/font/google";

const font = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function ExperienceLevelStep({
  handleNextAction,
}: StepControlProps) {
  const [state, setState] = useAtom(createProfileState);
  const isSelected = (val: string) => state.experience === val;
  return (
    <motion.div
      initial={{ opacity: 0, translateX: 200 }}
      animate={{ opacity: 100, translateX: 0 }}
      exit={{ opacity: 0, translateX: -200 }}
      className="grid p-3 md:p-8"
      style={{ ...font.style }}
    >
      <label className="text-2xl font-thin tracking-wide text-left">
        What's your experience?
      </label>
      <span className="grid gap-8 text-4xl">
        <button
          onKeyDown={(e) => e.key === "Enter" && handleNextAction()}
          className={`p-4 rounded-lg focus:outline-green-400 border ${isSelected("BEGINNER") ? "border-green-400 dark:border-green-400 text-green-400" : "border-black dark:border-white"}`}
          onClick={() => setState((s) => ({ ...s, experience: "BEGINNER" }))}
        >
          Beginner
        </button>
        <button
          className={`p-4 rounded-lg border focus:outline-green-400 ${isSelected("INTERMEDIATE") ? "border-green-400 dark:border-green-400 text-green-400" : "border-black dark:border-white"}`}
          onClick={() =>
            setState((s) => ({ ...s, experience: "INTERMEDIATE" }))
          }
        >
          Intermediate
        </button>
        <button
          className={`p-4 rounded-lg border focus:outline-green-400 ${isSelected("ADVANCED") ? "border-green-400 dark:border-green-400 text-green-400" : "border-black dark:border-white"}`}
          onClick={() => setState((s) => ({ ...s, experience: "ADVANCED" }))}
        >
          Advanced
        </button>
      </span>
    </motion.div>
  );
}
