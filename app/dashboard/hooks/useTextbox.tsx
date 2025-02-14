import { useState, useEffect, useRef, useCallback } from "react";
import useTimestamp from "./useTimestamp";

export default function useTextbox() {
  const [{ inputValue, isFocused }, setState] = useState({
    inputValue: null as string | null,
    isOpen: false as boolean,
    isFocused: false as boolean,
  });

  const timestamp = useTimestamp();
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
    if (inputValue && inputValue.length > 329)
      setState((state) => ({
        ...state,
        inputValue: inputValue?.slice(0, 329) || inputValue,
      }));
  }, [inputValue]);

  return {
    inputValue: inputValue || "",
    isFocused: isFocused || "",
    timestamp,
    setState,
    calculateLines,
    textareaRef,
  };
}
