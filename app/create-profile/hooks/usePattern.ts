import { createProfileState } from "@/app/atoms";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

export default function usePattern() {
  const [{ pattern }, setState] = useAtom(createProfileState);
  const [fullPattern, setFullPattern] = useState<boolean[]>([]);
  const pressedKeys = useRef(new Set<string>()); // Track pressed keys for hold actions

  function addDay(active: boolean) {
    if (pattern.length >= 30) return;
    setState((prev) => ({
      ...prev,
      pattern: [...prev.pattern, active],
    }));
  }

  function removeLastDay() {
    if (pattern.length === 0) return;
    setState((prev) => ({
      ...prev,
      pattern: prev.pattern.slice(0, -1),
    }));
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (pressedKeys.current.has(e.key) && e.key !== "Backspace") return; // Allow Backspace always
      pressedKeys.current.add(e.key);

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
      pressedKeys.current.delete(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pattern]); // Dependency ensures `removeLastDay` works with fresh state

  useEffect(() => {
    setFullPattern(
      Array(31)
        .fill(null)
        .map((_, i) => pattern[i % pattern.length]),
    );
  }, [pattern]);

  return {
    pattern,
    fullPattern,
    addTrain: () => addDay(true),
    addRest: () => addDay(false),
    undo: removeLastDay,
  };
}
