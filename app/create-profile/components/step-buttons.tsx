"use client";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { Roboto } from "next/font/google";
import { BarLoader } from "react-spinners";
import { motion } from "framer-motion";
import { Escape, Enter } from "@/app/(components)/kbd";
import useStepButtons from "../hooks/useStepButtons";

const font = Roboto({ subsets: ["latin"], weight: "700" });

export default function StepButtons() {
  const {
    isFirstStep,
    isLastStep,
    handlePrev,
    handleNext,
    stepStatus,
    stepLoading,
  } = useStepButtons();
  return (
    <div className="flex absolute right-0 left-0 bottom-4 grid-cols-2 gap-2 justify-between py-2 px-4">
      <span className="relative">
        <span
          className={` ${isFirstStep && "md:invisible"} absolute -top-4 left-1/2 invisible -translate-x-1/2 md:visible`}
        >
          <Escape />
        </span>
        <button
          style={{ ...font.style }}
          onClick={handlePrev}
          disabled={isFirstStep}
          className="flex z-10 justify-between justify-self-start items-center place-content-center py-3 px-4 w-24 h-10 rounded-full border border-black dark:border-white disabled:opacity-0 bg-white/75 backdrop-blur-lg dark:bg-black/75"
        >
          <IoMdArrowBack className="text-2xl" />
          PREV
        </button>
      </span>

      <span className="relative">
        <span
          className={` ${isLastStep && "md:invisible"} absolute -top-4 left-1/2 invisible -translate-x-1/2 md:visible`}
        >
          <Enter />
        </span>
        <button
          className={`${isLastStep && "opacity-0"} h-10 w-24 flex z-10 justify-between justify-self-end items-center place-content-center py-3 px-4 text-center text-green-500 rounded-full border border-green-500 disabled:text-red-500 disabled:border-red-500 bg-white/75 dark:bg-black/75`}
          onClick={handleNext}
          disabled={!stepStatus || isLastStep}
        >
          {stepLoading ? (
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
      </span>
    </div>
  );
}
