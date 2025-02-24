"use client";
import { Bebas_Neue } from "next/font/google";
import { motion } from "framer-motion";
import NumberInput from "@/app/(components)/number-input";
import { useCallback } from "react";
import SingleNumberInput from "@/app/(components)/single-number-input";
import { StepControlProps } from "@/types/create-profile-state";
import { useAtom } from "jotai";
import { createProfileState } from "@/app/atoms";

const font = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function BodyMetricsStep({ }: StepControlProps) {
  const [state, setState] = useAtom(createProfileState);
  const handleWeightLb = useCallback(
    (value: number) => {
      setState((s) => ({
        ...s,
        bodyMetrics: {
          ...s.bodyMetrics,
          weight: { kg: s.bodyMetrics.weight.kg, lb: value },
        },
      }));
    },
    [setState],
  );

  const handleWeightKg = useCallback(
    (value: number) => {
      setState((s) => ({
        ...s,
        bodyMetrics: {
          ...s.bodyMetrics,
          weight: { lb: s.bodyMetrics.weight.lb, kg: value },
        },
      }));
    },
    [setState],
  );
  const handleHeightFt = useCallback(
    (value: number) => {
      setState((s) => ({
        ...s,
        bodyMetrics: {
          ...s.bodyMetrics,
          height: { ...s.bodyMetrics.height, ft: value },
        },
      }));
    },
    [setState],
  );

  const handleHeightIn = useCallback(
    (value: number) => {
      setState((s) => ({
        ...s,
        bodyMetrics: {
          ...s.bodyMetrics,
          height: { ...s.bodyMetrics.height, in: value },
        },
      }));
    },
    [setState],
  );

  const handleHeightCm = useCallback(
    (value: number) => {
      setState((s) => ({
        ...s,
        bodyMetrics: {
          ...s.bodyMetrics,
          height: { ...s.bodyMetrics.height, cm: value },
        },
      }));
    },
    [setState],
  );

  return (
    <motion.div
      initial={{ opacity: 0, translateX: 200 }}
      animate={{ opacity: 100, translateX: 0 }}
      exit={{ opacity: 0, translateX: -200 }}
      className="grid gap-4 justify-center p-3 md:p-8"
      style={{ ...font.style }}
    >
      <label className="text-2xl font-thin tracking-wide text-center">
        <h2>Body Weight</h2>
      </label>
      <span className="relative">
        <NumberInput
          value={state.bodyMetrics.weight.lb}
          onChangeAction={handleWeightLb}
        />
        <label className="absolute top-1 right-1 text-sm">lbs</label>
      </span>

      <span className="flex justify-around w-full">
        <span className="relative">
          <SingleNumberInput
            value={state.bodyMetrics.height.ft}
            onChangeAction={handleHeightFt}
          />
          <label className="absolute top-1 right-1 text-sm">ft</label>
        </span>
        <span className="relative">
          <SingleNumberInput
            value={state.bodyMetrics.height.in}
            onChangeAction={handleHeightIn}
          />
          <label className="absolute top-1 right-1 text-sm">in</label>
        </span>
      </span>
    </motion.div>
  );
}
