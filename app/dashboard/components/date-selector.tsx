"use client";
import { format } from "date-fns";
import useDateSelector from "../hooks/useDateSelector";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function DateSelector() {
  const { targetDate, handleNext, handlePrevious, timestamp } =
    useDateSelector();
  return (
    <div style={font.style} className="flex justify-between w-full">
      <div className="top-0 p-2 text-lg font-black text-center rounded-b-md border-b w-fit bg-black/50 backdrop-blur-sm border-x h-min text-blue-250 dark:border-white/25">
        {targetDate && format(targetDate, "MM-dd-yy")}
      </div>
      <div className="top-0 p-2 text-lg text-center rounded-b-md border-b w-fit bg-black/50 backdrop-blur-sm border-x h-min text-blue-250 dark:border-white/25">
        {timestamp && format(timestamp, "hh:mm aa")}
      </div>
    </div>
  );
}
