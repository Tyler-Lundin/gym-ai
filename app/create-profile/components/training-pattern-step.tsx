import { createProfileState } from "@/app/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { IoIosUndo } from "react-icons/io";

export default function TrainingPatternStep() {
  const [state, setState] = useAtom(createProfileState);
  const [calendarPreview, setCalendarPreview] = useState<boolean[]>([]);

  function addDay(active: boolean) {
    if (state.pattern.length > 30) return;
    setState((prev) => ({
      ...prev,
      pattern: [...prev.pattern, active],
    }));
  }

  function removeLastDay() {
    if (state.pattern.length === 0) return;
    setState((prev) => ({
      ...prev,
      pattern: prev.pattern.slice(0, -1),
    }));
  }

  useEffect(() => {
    const pressedKeys = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (pressedKeys.has(e.key)) return; // Prevent multiple triggers on hold
      pressedKeys.add(e.key);

      if (["t", "r", "Backspace"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "t":
          addDay(true);
          break;
        case "r":
          addDay(false);
          break;
        case "Backspace":
          removeLastDay();
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

  useEffect(() => {
    setCalendarPreview(
      Array(31)
        .fill(null)
        .map((_, i) => state.pattern[i % state.pattern.length]),
    );
  }, [state.pattern]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-thin tracking-wide text-center">
        Train / Rest Pattern
      </h2>

      <div className="flex gap-4 text-2xl">
        <PatternButton onClick={() => addDay(true)} color="bg-green-400">
          TRAIN
        </PatternButton>
        <PatternButton onClick={() => addDay(false)} color="bg-red-400">
          REST
        </PatternButton>
        <PatternButton onClick={removeLastDay} color="bg-blue-300">
          <span className="flex gap-2 items-center">
            UNDO <IoIosUndo />
          </span>
        </PatternButton>
      </div>

      <div className="grid gap-2 justify-items-center items-center p-1 rounded-lg bg-white/50 dark:bg-black/50">
        <h2 className="font-bold">Training Pattern</h2>
        <PatternDisplay pattern={state.pattern} />
      </div>
      <CalendarPreview pattern={calendarPreview} />
    </div>
  );
}

function PatternButton({
  onClick,
  color,
  children,
}: {
  onClick: () => void;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`px-4 font-bold text-black rounded-lg ${color}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function PatternDisplay({ pattern }: { pattern: boolean[] }) {
  return (
    <Grid>
      {pattern.map((active, i) => (
        <DayIndicator key={i} active={active} size="w-6" />
      ))}
    </Grid>
  );
}

function CalendarPreview({ pattern }: { pattern: boolean[] }) {
  return (
    <Grid>
      {pattern.map((active, i) => (
        <DayIndicator key={i} active={active} size="w-4" />
      ))}
    </Grid>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-7 gap-4 place-items-center max-w-md">
      <DayLetters />
      {children}
    </div>
  );
}

function DayIndicator({ active, size }: { active: boolean; size: string }) {
  return (
    <div
      className={`aspect-square ${size} rounded-full ${active ? "bg-green-400" : "bg-red-400"}`}
    ></div>
  );
}

function DayLetters() {
  return (
    <>
      {["S", "M", "T", "W", "T", "F", "S"].map((letter, i) => (
        <span
          className="justify-self-center"
          key={`${letter}-${Math.random()}`}
        >
          {letter}
        </span>
      ))}
    </>
  );
}
