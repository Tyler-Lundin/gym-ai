import { useAtom } from "jotai";
import { createProfileState } from "@/app/atoms";

export function useBodyMetrics() {
  const [state, setState] = useAtom(createProfileState);
  const isMetric = state.unitSystem === "METRIC";

  function setWeight(value: number) {
    setState((s) => ({
      ...s,
      bodyMetrics: {
        ...s.bodyMetrics,
        weight: isMetric
          ? { kg: value || 0, lb: s.bodyMetrics.weight.lb }
          : { kg: s.bodyMetrics.weight.kg, lb: value || 0 },
      },
    }));
  }

  function setHeight(value: number, type: "cm" | "ft" | "in") {
    setState((s) => ({
      ...s,
      bodyMetrics: {
        ...s.bodyMetrics,
        height: { ...s.bodyMetrics.height, [type]: value || 0 },
      },
    }));
  }

  return {
    bodyMetrics: state.bodyMetrics,
    isMetric,
    setWeight,
    setHeight,
  };
}
