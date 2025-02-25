"use client";
import { IoIosUndo } from "react-icons/io";
import usePattern from "../../hooks/usePattern";
import { Bebas_Neue, Roboto } from "next/font/google";
import { motion } from "framer-motion";
import useStepDirection from "../../hooks/useStepDirection";

const font = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const smallFont = Roboto({ subsets: ["latin"], weight: "300" });

export default function PatternStep() {
  const { pattern, fullPattern, addTrain, addRest, undo } = usePattern();
  const reversed = useStepDirection();

  return (
    <motion.div
      initial={{ opacity: 0, translateX: reversed ? -200 : 200 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: reversed ? 200 : -200 }}
      className="grid p-6 space-y-6 text-white rounded-2xl shadow-xl md:p-10 bg-[#0a0a0a]/80 backdrop-blur-lg"
      style={{ ...font.style }}
    >
      {/* Header */}
      <h2 className="text-3xl font-thin tracking-wide text-center">
        Train / Rest Pattern
      </h2>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <PatternButton
          onClick={addTrain}
          color="border-green-500 text-green-400 hover:bg-green-500/20"
        >
          Add Training Day
        </PatternButton>
        <PatternButton
          onClick={addRest}
          color="border-red-400 text-red-400 hover:bg-red-500/20"
        >
          Add Rest Day
        </PatternButton>
        <PatternButton
          onClick={undo}
          color="border-blue-300 text-blue-300 hover:bg-blue-500/20"
        >
          <span className="flex gap-2 items-center">
            UNDO <IoIosUndo />
          </span>
        </PatternButton>
      </div>

      {/* Pattern Display */}
      <div className="grid gap-4 p-4 rounded-lg border border-gray-500 shadow-md bg-white/10">
        <h2 className="text-2xl text-center">Training Pattern</h2>
        <PatternDisplay pattern={pattern} />
      </div>

      {/* Calendar Preview */}
      <div className="justify-self-center">
        <CalendarPreview pattern={fullPattern} />
      </div>
    </motion.div>
  );
}

/* 🟢 Custom Button Component */
function PatternButton({
  onClick,
  color,
  children,
}: {
  onClick: () => void;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`px-6 py-3 text-3xl font-bold transition-all border rounded-lg shadow-md ${color} hover:shadow-[0_0_15px]`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

/* 🗓 Displays the Train/Rest Pattern */
function PatternDisplay({ pattern }: { pattern: boolean[] }) {
  return (
    <Grid>
      {pattern.map((active, i) => (
        <DayIndicator key={i} active={active} size="w-10" digit={i + 1} />
      ))}
    </Grid>
  );
}

/* 📆 Full Calendar Preview */
export function CalendarPreview({
  pattern,
  small,
}: {
  pattern: boolean[];
  small?: boolean;
}) {
  return (
    <Grid>
      <DayLetters />
      {pattern.map((active, i) => (
        <DayIndicator
          key={i}
          active={active}
          size={small ? "w-4" : "w-8"}
          digit={small ? null : i + 1}
        />
      ))}
    </Grid>
  );
}

/* 🟦 Grid Layout for Days */
function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-7 gap-3 place-items-center p-4 max-w-lg rounded-md bg-neutral-200 dark:bg-neutral-800">
      {children}
    </div>
  );
}

/* 🔵 Individual Day Display */
function DayIndicator({
  active,
  size,
  digit,
}: {
  active: boolean;
  size: string;
  digit: number | null;
}) {
  return (
    <div
      style={smallFont.style}
      className={`aspect-square text-black/75 text-lg font-bold grid place-content-center ${size} rounded-full transition-all shadow-md border-2 
        ${active ? "border-green-500 text-green-500 " : "border-red-500 text-red-500"}`}
    >
      {digit}
    </div>
  );
}

/* 🏷 Day Initials */
function DayLetters() {
  return (
    <>
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((letter, i) => (
        <span
          style={font.style}
          className="text-lg font-semibold text-gray-300"
          key={i}
        >
          {letter}
        </span>
      ))}
    </>
  );
}
