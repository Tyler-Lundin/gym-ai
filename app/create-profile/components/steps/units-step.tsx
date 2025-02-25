import { createProfileState } from "@/app/atoms";
import { useAtom } from "jotai";
import { Bebas_Neue } from "next/font/google";
import { motion } from "framer-motion";
import useStepDirection from "../../hooks/useStepDirection";

const font = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function UnitsStep() {
  const [{ unitSystem }, setState] = useAtom(createProfileState);
  const reversed = useStepDirection();

  const units = [
    { label: "lb, ft, in", value: "IMPERIAL" },
    { label: "kg, cm", value: "METRIC" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, translateX: reversed ? -200 : 200 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: reversed ? 200 : -200 }}
      className="flex flex-col items-center p-6 space-y-6 rounded-2xl shadow-xl bg-[#0a0a0a]/80 backdrop-blur-lg"
      style={{ ...font.style }}
    >
      <h2 className="text-2xl font-bold tracking-wide text-white">
        What Unit System?
      </h2>
      <div className="flex space-x-4">
        {units.map(({ label, value }) => {
          const isActive = unitSystem === value;
          return (
            <button
              key={value}
              onClick={() =>
                setState((state) => ({
                  ...state,
                  unitSystem: value as "METRIC" | "IMPERIAL",
                }))
              }
              className={`relative px-6 py-3 text-lg font-semibold transition-all 
              rounded-lg border-2 border-gray-500 bg-white/30 dark:bg-black/30  
                
              ${isActive ? "border-green-500 text-green-500 " : "text-gray-400"
                }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
