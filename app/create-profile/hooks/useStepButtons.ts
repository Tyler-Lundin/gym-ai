import useCreateProfileSteps from "../hooks/useCreateProfileSteps";
import { useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { createProfileState } from "@/app/atoms";
import useStepStatus from "../hooks/useStepStatus";

export default function useStepButtons() {
  const { currentStep, steps } = useCreateProfileSteps();
  const { stepStatus, stepLoading } = useStepStatus();
  const [, setState] = useAtom(createProfileState);
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = useCallback(() => {
    setState((s) => ({
      ...s,
      currentStep: s.currentStep + 1,
      lastStep: s.currentStep,
    }));
  }, [setState]);

  const handlePrev = useCallback(() => {
    setState((s) => ({
      ...s,
      currentStep: s.currentStep - 1,
      lastStep: s.currentStep,
    }));
  }, [setState]);

  useEffect(() => {
    const pressedKeys = new Set<string>(); // Moved inside the effect

    const handleKeyDown = (e: KeyboardEvent) => {
      if (pressedKeys.has(e.key)) return; // Prevent multiple triggers on hold
      pressedKeys.add(e.key);

      if (["Enter", "Escape"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "Enter":
          if (stepStatus) handleNext();
          break;
        case "Escape":
          if (!isFirstStep) handlePrev();
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys.delete(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleNext, handlePrev, stepStatus, isFirstStep]); // Added dependencies

  return {
    isFirstStep,
    isLastStep,
    handlePrev,
    handleNext,
    stepStatus,
    stepLoading,
  };
}
