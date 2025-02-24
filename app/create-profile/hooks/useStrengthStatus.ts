import { createProfileState } from "@/app/atoms";
import { useAtom } from "jotai";

export default function useStrengthStatus(): boolean {
  const [{ strength }] = useAtom(createProfileState);
  return (
    strength.bench > 0 &&
    strength.bench < 999 &&
    strength.squat > 0 &&
    strength.squat < 999 &&
    strength.deadlift > 0 &&
    strength.deadlift < 999
  );
}
