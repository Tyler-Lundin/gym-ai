"use client";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { Roboto } from "next/font/google";
import useCreateProfileSteps from "../hooks/useCreateProfileSteps";
import useUsernameStatus from "../hooks/useUsernameStatus";
import { BarLoader } from "react-spinners";
import { motion } from "framer-motion";
import { useEffect } from "react";

const font = Roboto({ subsets: ["latin"], weight: "700" });

export default function StepButtons({
  handlePrevAction,
  handleNextAction,
}: {
  handlePrevAction: () => void;
  handleNextAction: () => void;
}) {
  const { stepStatus, currentStep, steps } = useCreateProfileSteps();
  const { isLoading } = useUsernameStatus();
  const isLastStep = currentStep === steps.length - 1;
  useEffect(() => {
    const pressedKeys = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (pressedKeys.has(e.key)) return; // Prevent multiple triggers on hold
      pressedKeys.add(e.key);

      if (["Enter", "Escape"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "Enter":
          handleNextAction();
          break;
        case "Escape":
          handlePrevAction();
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
  }, []);

  return (
    <div className="grid absolute right-0 left-0 bottom-4 grid-cols-2 gap-2 justify-between py-2 px-4">
      <button
        style={{ ...font.style }}
        onClick={handlePrevAction}
        disabled={currentStep === 0}
        className="flex z-10 justify-between justify-self-start place-content-center py-3 px-4 rounded-full border border-black dark:border-white disabled:opacity-0 bg-white/75 backdrop-blur-lg dark:bg-black/75"
      >
        <IoMdArrowBack className="text-2xl" />
        PREV
      </button>

      <button
        className={`${isLastStep && "opacity-0"} flex z-10 justify-between justify-self-end items-center place-content-center py-3 px-4 text-center text-green-500 rounded-full border border-green-500 disabled:text-red-500 disabled:border-red-500 bg-white/75 dark:bg-black/75`}
        onClick={handleNextAction}
        disabled={stepStatus || isLastStep}
      >
        {isLoading ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0 }}
            className="grid place-content-center w-full"
          >
            <BarLoader color="rgb(180,40,50)" width={50} />
          </motion.span>
        ) : (
          <>
            NEXT
            <IoMdArrowForward className="justify-self-center text-2xl" />
          </>
        )}
      </button>
    </div>
  );
}
