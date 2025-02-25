import { useAtom } from "jotai";
import { createProfileState } from "@/app/atoms";

export type Lifts = "bench" | "squat" | "deadlift";

export default function useStrength() {
  const [state, setState] = useAtom(createProfileState);
  const isMetric = state.unitSystem === "METRIC";

  function setStrength(lift: Lifts, value: number) {
    if (value > 999 || value < 0) return;
    setState((prev) => ({
      ...prev,
      strength: { ...prev.strength, [lift]: value },
    }));
  }

  return {
    strength: state.strength,
    unitSystem: state.unitSystem,
    isMetric,
    setStrength,
  };
}
