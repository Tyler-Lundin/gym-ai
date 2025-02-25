import { createProfileState } from "@/app/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function useStepDirection() {
  const [{ currentStep, lastStep }] = useAtom(createProfileState);
  const [reversed, setReversed] = useState(currentStep < lastStep);

  useEffect(() => {
    if (currentStep !== lastStep) {
      setReversed(currentStep < lastStep);
    }
  }, [currentStep, lastStep]);

  return reversed;
}
