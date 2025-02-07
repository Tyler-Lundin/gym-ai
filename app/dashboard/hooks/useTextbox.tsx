import { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { format } from "date-fns";

export default function useTextbox() {
  const [{ inputValue, timestamp, isFocused }, setState] = useState({
    inputValue: null as string | null,
    timestamp: null as Date | null,
    isOpen: false as boolean,
    isFocused: false as boolean,
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineHeight, setLineHeight] = useState(32);

  const calculateLines = useCallback(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const computedStyle = window.getComputedStyle(textarea);

      const lineHeightValue = parseFloat(computedStyle.lineHeight);
      if (lineHeightValue !== lineHeight) {
        setLineHeight(lineHeightValue);
      }

      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [lineHeight]);

  useEffect(() => {
    const updateTimestamp = () => {
      setState((state) => ({ ...state, timestamp: new Date() }));
    };

    updateTimestamp();
    const intervalId = setInterval(updateTimestamp, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (inputValue && inputValue.length > 329)
      setState((state) => ({
        ...state,
        inputValue: inputValue?.slice(0, 329) || inputValue,
      }));
  }, [inputValue]);

  return {
    inputValue: inputValue || "",
    isFocused: isFocused || "",
    timestamp: timestamp || new Date(),
    setState,
    calculateLines,
    textareaRef,
  };
}
