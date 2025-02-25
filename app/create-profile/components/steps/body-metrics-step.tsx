"use client";
import { Bebas_Neue, Roboto } from "next/font/google";
import { motion } from "framer-motion";
import NumberInput from "@/app/(components)/number-input";
import SingleNumberInput from "@/app/(components)/single-number-input";
import { useBodyMetrics } from "../../hooks/useBodyMetrics";
import useStepDirection from "../../hooks/useStepDirection";

const font = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const smallFont = Roboto({ subsets: ["latin"], weight: "300" });

export default function BodyMetricsStep() {
  const { bodyMetrics, isMetric, setWeight, setHeight } = useBodyMetrics();
  const reversed = useStepDirection();

  return (
    <motion.div
      initial={{ opacity: 0, translateX: reversed ? -200 : 200 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: reversed ? 200 : -200 }}
      className="grid gap-6 p-6 rounded-2xl shadow-xl md:p-10 bg-[#0a0a0a]/80 backdrop-blur-lg"
      style={{ ...font.style }}
    >
      {/* Body Weight */}
      <label className="text-2xl font-thin tracking-wide text-center text-white">
        Body Weight
      </label>
      <span className="relative">
        <small
          style={smallFont.style}
          className="absolute -right-2 top-1/2 z-20 font-thin translate-x-full -translate-y-1/2"
        >
          {isMetric ? "kg" : "lbs"}
        </small>
        <NumberInput
          value={isMetric ? bodyMetrics.weight.kg : bodyMetrics.weight.lb}
          onChangeAction={setWeight}
        />
      </span>

      {/* Height */}
      <label className="text-2xl font-thin tracking-wide text-center text-white">
        Height
      </label>
      {isMetric ? (
        // Metric Input (cm)
        <span className="relative">
          <small
            style={smallFont.style}
            className="absolute -right-2 top-1/2 z-20 font-thin translate-x-full -translate-y-1/2"
          >
            cm
          </small>
          <NumberInput
            value={bodyMetrics.height.cm}
            onChangeAction={(value) => setHeight(value, "cm")}
          />
        </span>
      ) : (
        // Imperial Inputs (ft/in)
        <span className="flex justify-around w-full">
          <span className="relative">
            <small
              style={smallFont.style}
              className="absolute -right-2 top-1/2 z-20 font-thin translate-x-full -translate-y-1/2"
            >
              ft
            </small>
            <SingleNumberInput
              value={bodyMetrics.height.ft}
              onChangeAction={(value) => setHeight(value, "ft")}
            />
          </span>
          <span className="relative">
            <small
              style={smallFont.style}
              className="absolute -right-2 top-1/2 z-20 font-thin translate-x-full -translate-y-1/2"
            >
              in
            </small>
            <SingleNumberInput
              value={bodyMetrics.height.in}
              onChangeAction={(value) => setHeight(value, "in")}
            />
          </span>
        </span>
      )}
    </motion.div>
  );
}
