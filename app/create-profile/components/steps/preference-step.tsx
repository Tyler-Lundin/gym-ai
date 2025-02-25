"use client";

import { createProfileState } from "@/app/atoms";
import { useAtom } from "jotai";
import { Bebas_Neue } from "next/font/google";
import { motion } from "framer-motion";
import useStepDirection from "../../hooks/useStepDirection";

const font = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function PreferenceStep() {
  const [{ preference }, setState] = useAtom(createProfileState);
  const reversed = useStepDirection();

  function setPreference(prefers: typeof preference) {
    setState((state) => ({ ...state, preference: prefers }));
  }

  return (
    <motion.div
      initial={{ opacity: 0, translateX: reversed ? -200 : 200 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: reversed ? 200 : -200 }}
      className="flex flex-col gap-6 items-center p-6 text-white rounded-2xl shadow-xl md:p-10 bg-[#0a0a0a]/80 backdrop-blur-lg"
      style={{ ...font.style }}
    >
      <h2 className="text-3xl font-thin tracking-wide text-center">
        What is your main focus?
      </h2>

      <div className="grid gap-4 w-full">
        <PreferenceButton
          onClick={() => setPreference("STRENGTH")}
          active={preference === "STRENGTH"}
        >
          Strength
        </PreferenceButton>
        <PreferenceButton
          onClick={() => setPreference("HYPERTROPHY")}
          active={preference === "HYPERTROPHY"}
        >
          Hypertrophy
        </PreferenceButton>
        <PreferenceButton
          onClick={() => setPreference("BOTH")}
          active={preference === "BOTH"}
        >
          Both
        </PreferenceButton>
      </div>
    </motion.div>
  );
}

/* 🟢 Custom Button Component */
function PreferenceButton({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg text-2xl border-2 ${active ? "border-green-500 focus:outline-none dark:border-green-500 text-green-500" : "border-black dark:border-white/50"}`}
    >
      {children}
    </button>
  );
}
