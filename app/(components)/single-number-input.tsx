import { useEffect, useRef, useState } from "react";
import { NumberInputProps } from "./number-input";

export default function SingleNumberInput({
  value,
  onChangeAction,
}: NumberInputProps) {
  const [digit, setDigit] = useState<number>(Number(value) || 0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Sync local state with parent when `value` changes
  useEffect(() => {
    setDigit((prev) => (prev !== Number(value) ? Number(value) : prev));
  }, [value]);

  const updateDigit = (newDigit: number) => {
    setDigit(newDigit);
    onChangeAction(newDigit); // Fix stale state issue
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!Number.isInteger(newValue) || newValue < 0 || newValue > 9) return;
    updateDigit(newValue);
  };

  return (
    <div
      className="flex gap-2 font-mono text-5xl cursor-pointer h-fit w-fit"
      onClick={() => inputRef.current?.focus()} // Click anywhere to focus input
    >
      <span
        className={`p-4 w-16 text-center bg-transparent rounded-lg border border-black/50 dark:border-white/50 ${isFocused && "dark:border-green-500 outline outline-green-500"}`}
      >
        {digit}
      </span>
      {/* Hidden input for typing */}
      <input
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="absolute w-16 opacity-0 pointer-events-none"
        value={digit}
        onChange={handleChange}
      />
    </div>
  );
}
