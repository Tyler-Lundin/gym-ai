"use client";
import StatusDot from "@/app/dashboard/components/status-dot";
import { motion } from "framer-motion";
import useUsernameStatus from "../../hooks/useUsernameStatus";

import { Bebas_Neue } from "next/font/google";
import { SyncLoader } from "react-spinners";
import { StepControlProps } from "@/types/create-profile-state";
import { useAtom } from "jotai";
import { createProfileState } from "@/app/atoms";

const font = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function UsernameInput({ handleNextAction }: StepControlProps) {
  const [state, setState] = useAtom(createProfileState);
  const { status } = useUsernameStatus();

  return (
    <motion.div
      initial={{ opacity: 0, translateX: 200 }}
      animate={{ opacity: 100, translateX: 0 }}
      exit={{ opacity: 0, translateX: -200 }}
      className="grid p-3 md:p-8"
      style={{ ...font.style }}
    >
      <label className="text-2xl font-thin tracking-wide text-left">
        USERNAME
      </label>
      <div className="relative">
        <input
          className="p-2 w-full text-2xl text-black bg-white rounded-lg border border-black dark:text-white dark:bg-black dark:border-white"
          value={state.username || ""}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleNextAction();
            }
          }}
          onChange={(e) => {
            if (e.target.value.length > 20) return;
            setState((s) => ({
              ...s,
              username: e.target.value.replace(" ", ""),
            }));
          }}
        />
        <StatusDot status={status} />
      </div>
    </motion.div>
  );
}
