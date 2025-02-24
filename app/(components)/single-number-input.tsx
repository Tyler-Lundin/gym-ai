import { useEffect, useRef, useState } from "react";
import { NumberInputProps } from "./number-input";

export default function SingleNumberInput({
  value,
  onChangeAction,
}: NumberInputProps) {
  const [digit, setDigit] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Sync local state with parent when `value` changes
  useEffect(() => {
    setDigit(Number(value));
  }, [value]);

  const updateDigit = (newDigit: number) => {
    setDigit(newDigit);
    onChangeAction(Number(digit));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue > 9 || newValue < 0) return;
    updateDigit(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") inputRef.current?.blur();
  };

  return (
    <div
      className="flex gap-2 font-mono text-5xl cursor-pointer h-fit w-fit"
      onClick={() => inputRef.current?.focus()} // Click anywhere to focus input
    >
      <span
        className={`p-4 w-16 text-center bg-transparent rounded-lg border border-black/50 dark:border-white/50 ${isFocused && "dark:border-green-500 outline outline-green-400"}`}
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
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
