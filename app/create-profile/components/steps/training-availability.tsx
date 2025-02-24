"use client";
import { createProfileState } from "@/app/atoms";
import { useAtom } from "jotai";
import { motion } from "framer-motion";
import { Bebas_Neue } from "next/font/google";

const font = Bebas_Neue({ subsets: ["latin"], weight: "400" });

const daysOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export default function TrainingAvailabilityStep() {
  const [state, setState] = useAtom(createProfileState);

  const toggle = (day: (typeof daysOfWeek)[number]) =>
    setState((s) => ({
      ...s,
      availability: { ...s.availability, [day]: !s.availability[day] },
    }));

  return (
    <motion.div
      initial={{ opacity: 0, translateX: 200 }}
      animate={{ opacity: 100, translateX: 0 }}
      exit={{ opacity: 0, translateX: -200 }}
      className="grid gap-4 justify-center p-3 md:p-8"
      style={{ ...font.style }}
    >
      <h2 className="text-2xl font-thin tracking-wide text-center">
        What days are available?
      </h2>
      <ol className="grid gap-4">
        {daysOfWeek.map((day) => (
          <li key={day}>
            <DayButton
              day={day}
              selected={state.availability[day]}
              onClick={() => toggle(day)}
            />
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

function DayButton({
  day,
  selected,
  onClick,
}: {
  day: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg border font-black w-full backdrop-blur-sm text-2xl bg-white/50 dark:bg-black/50
        ${selected ? "border-green-500 text-green-500" : "border-red-500 text-red-500"}`}
    >
      {day.toUpperCase()}
    </button>
  );
}
