import { createProfileState } from "@/app/atoms";
import { useAtom } from "jotai";

export default function usePatternStatus() {
  const [{ pattern }] = useAtom(createProfileState);
  let hasOn = false;
  let hasOff = false;

  for (const val of pattern) {
    if (val) hasOn = true;
    else hasOff = true;

    if (hasOn && hasOff) return true; // Exit early
  }

  return false;
}
