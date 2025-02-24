import { createProfileState } from "@/app/atoms";
import { useAtom } from "jotai";

export default function useBodyMetricsStatus(): boolean {
  const [{ bodyMetrics }] = useAtom(createProfileState);
  return (
    (bodyMetrics.weight.lb > 0 && bodyMetrics.weight.lb < 999) ||
    (bodyMetrics.weight.kg > 0 && bodyMetrics.weight.kg < 999)
  );
}
