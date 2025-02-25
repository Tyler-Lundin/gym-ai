"use client";
import { useState, useRef, useEffect } from "react";

export interface NumberInputProps {
  value: number;
  onChangeAction: (newValue: number) => void;
}

export default function NumberInput({
  value,
  onChangeAction,
}: NumberInputProps) {
  const [digits, setDigits] = useState<string[]>(["0", "0", "0"]); // Hundreds, Tens, Ones
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Sync state with parent value
  useEffect(() => {
    const numStr = value.toString().padStart(3, "0").slice(-3);
    setDigits(numStr.split(""));
  }, [value]);

  const updateDigits = (newDigits: string[]) => {
    setDigits(newDigits);
    onChangeAction(parseInt(newDigits.join(""), 10)); // Convert array to number
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    const numStr = newValue.slice(-3).padStart(3, "0"); // Keep 3 digits
    updateDigits(numStr.split(""));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") inputRef.current?.blur();
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const change = e.key === "ArrowUp" ? 1 : -1;
      setDigits((prev) => {
        const newDigits = [...prev];
        let i = 2; // Start at ones place
        let carry = change;

        while (carry !== 0 && i >= 0) {
          const newValue = parseInt(newDigits[i]) + carry;
          if (newValue > 9) {
            newDigits[i] = "0";
            carry = 1;
          } else if (newValue < 0) {
            newDigits[i] = "9";
            carry = -1;
          } else {
            newDigits[i] = newValue.toString();
            carry = 0;
          }
          i--;
        }

        updateDigits(newDigits);
        return newDigits;
      });
    }
  };

  return (
    <div
      className="flex relative gap-2 font-mono text-5xl cursor-pointer"
      onClick={() => inputRef.current?.focus()} // Click anywhere to focus input
    >
      {digits.map((digit, index) => (
        <span
          key={index}
          className={`p-4 transition-all w-16 text-center backdrop-blur-sm bg-white/50 dark:bg-black/50 rounded-lg border border-black/50 dark:border-white/50 ${
            isFocused &&
            "dark:border-green-500 text-green-500 outline outline-green-500 bg-white dark:bg-black"
          }`}
        >
          {digit}
        </span>
      ))}
      {/* Hidden input for typing */}
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="absolute w-16 opacity-0 pointer-events-none"
        value={digits.join("")}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
