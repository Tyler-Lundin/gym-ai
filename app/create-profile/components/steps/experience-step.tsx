"use client";
import { createProfileState } from "@/app/atoms";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { Bebas_Neue } from "next/font/google";
import useStepDirection from "../../hooks/useStepDirection";

const font = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function ExperienceLevelStep() {
  const [state, setState] = useAtom(createProfileState);
  const isSelected = (val: string) => state.experience === val;
  const reversed = useStepDirection();
  return (
    <motion.div
      initial={{ opacity: 0, translateX: reversed ? -200 : 200 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: reversed ? 200 : -200 }}
      className="grid p-3 md:p-8"
      style={{ ...font.style }}
    >
      <label className="text-2xl font-thin tracking-wide text-left">
        What's your experience?
      </label>
      <span className="grid gap-8 text-4xl">
        <button
          className={`p-4 rounded-lg  border-2 ${isSelected("BEGINNER") ? "border-green-500 focus:outline-none dark:border-green-500 text-green-500" : "border-black dark:border-white/50"}`}
          onClick={() => setState((s) => ({ ...s, experience: "BEGINNER" }))}
        >
          Beginner
        </button>
        <button
          className={`p-4 rounded-lg border-2  ${isSelected("INTERMEDIATE") ? "border-green-500 focus:outline-none dark:border-green-500 text-green-500" : "border-black dark:border-white/50"}`}
          onClick={() =>
            setState((s) => ({ ...s, experience: "INTERMEDIATE" }))
          }
        >
          Intermediate
        </button>
        <button
          className={`p-4 rounded-lg border-2 ${isSelected("ADVANCED") ? "border-green-500 focus:outline-none dark:border-green-500 text-green-500" : "border-black dark:border-white/50"}`}
          onClick={() => setState((s) => ({ ...s, experience: "ADVANCED" }))}
        >
          Advanced
        </button>
      </span>
    </motion.div>
  );
}
