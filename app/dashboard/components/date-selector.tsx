"use client";
import { format } from "date-fns";
import useDateSelector from "../hooks/useDateSelector";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  IoMdArrowBack,
  IoMdArrowForward,
  IoMdCheckmark,
  IoMdRedo,
} from "react-icons/io";
import { motion } from "framer-motion";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function DateSelector() {
  const {
    targetDate,
    isOpen,
    handleNext,
    isToday,
    toggle,
    close,
    jumpToToday,
    handlePrevious,
    timestamp,
  } = useDateSelector();
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 100, translateY: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      style={font.style}
      className="flex justify-between w-full z-[400]"
    >
      {isOpen && (
        <div className="grid absolute top-0 right-0 bottom-0 left-0 place-content-center w-screen h-screen bg-black/50 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, translateX: "-50%", translateY: "-50%" }}
            animate={{ opacity: 100, translateX: "-50%", translateY: "-50%" }}
            className="flex relative top-1/2 left-1/2 p-4 w-full text-2xl border bg-black/50 border-white/25 translate-all"
          >
            <button
              onClick={jumpToToday}
              disabled={isToday}
              className="absolute left-2 -bottom-2 p-2 text-black bg-yellow-500 rounded-lg border border-white translate-x-full translate-y-full disabled:opacity-40"
            >
              <IoMdRedo />
            </button>
            <button
              onClick={close}
              className="absolute right-2 -bottom-2 p-2 text-black bg-green-500 rounded-lg border border-white -translate-x-full translate-y-full"
            >
              <IoMdCheckmark />
            </button>

            <button onClick={handlePrevious} className="px-8">
              <IoMdArrowBack />
            </button>
            {isToday ? " Today " : targetDate && format(targetDate, "MM-dd-yy")}
            <button
              disabled={isToday}
              onClick={handleNext}
              className="px-8 disabled:opacity-40"
            >
              <IoMdArrowForward />
            </button>
          </motion.div>
        </div>
      )}
      <button
        onClick={toggle}
        className="top-0 p-2 text-lg font-black text-center rounded-b-md border-b dark:text-green-500 w-fit backdrop-blur-sm border-x h-min dark:border-green-500/75"
      >
        {targetDate && format(targetDate, "MM-dd-yy")}
      </button>

      <div className="top-0 p-2 text-lg text-center rounded-b-md border-b w-fit bg-black/50 backdrop-blur-sm border-x h-min text-blue-250 dark:border-white/25">
        {timestamp && format(timestamp, "hh:mm aa")}
      </div>
    </motion.div>
  );
}
