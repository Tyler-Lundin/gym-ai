"use client";
import NumberInput from "@/app/(components)/number-input";
import { motion } from "framer-motion";
import { Bebas_Neue, Roboto } from "next/font/google";
import useStrength, { Lifts } from "../../hooks/useStrength";
import useStepDirection from "../../hooks/useStepDirection";

const font = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const smallFont = Roboto({ subsets: ["latin"], weight: "300" });

export default function StrengthLevelsStep() {
  const { strength, isMetric, setStrength } = useStrength();
  const reversed = useStepDirection();

  return (
    <motion.div
      initial={{ opacity: 0, translateX: reversed ? -200 : 200 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: reversed ? 200 : -200 }}
      className="grid gap-6 p-6 rounded-2xl shadow-xl md:p-10 bg-[#0a0a0a]/80 backdrop-blur-lg"
      style={{ ...font.style }}
    >
      {["bench", "squat", "deadlift"].map((lift) => (
        <div key={lift} className="flex flex-col space-y-2">
          <label className="text-2xl font-thin tracking-wide text-center text-white">
            Estimated {lift.charAt(0).toUpperCase() + lift.slice(1)} 1RM
          </label>
          <span className="relative">
            <small
              style={smallFont.style}
              className="absolute -right-2 top-1/2 z-20 font-thin translate-x-full -translate-y-1/2"
            >
              {isMetric ? "kg" : "lbs"}
            </small>
            <NumberInput
              value={strength[lift as Lifts]}
              onChangeAction={(value) => setStrength(lift as any, value)}
            />
          </span>
        </div>
      ))}
    </motion.div>
  );
}
