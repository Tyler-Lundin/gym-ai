"use client";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { useMutation } from "react-query";
import { dashboardState } from "@/app/atoms";
import { prefix } from "../(hooks)/useDashboard";

async function sendMessage({
  prompt,
  workoutId,
}: {
  prompt: string;
  workoutId: string;
}) {
  const response = await fetch("/api/ai", {
    method: "POST",
    body: JSON.stringify({ prompt, workoutId }),
  });
  const result = await response.json();
  return { response: result };
}

export default function TextBox() {
  const {
    state: { inputValue },
    timestamp,
    updateState,
    calculateLines,
    textareaRef,
  } = useTextbox();
  const [{ workoutId }, setDashboardState] = useAtom(dashboardState);
  const mutation = useMutation(sendMessage, {
    onSuccess: (data) => {
      console.log("mutation onSuccess ({data}): ", { data });
    },
    onError: (error) => {
      console.log("mutation onError ({error}): ", { error });
    },
  });

  function handleSend() {
    const timestamp = new Date();
    const entryKey = `${prefix}${timestamp.getTime()}`;
    const newEntry = { rawInput: inputValue, timestamp, entryKey };

    setDashboardState((prev) => ({
      ...prev,
      localEntries: [...prev.localEntries, newEntry],
    }));
    updateState("inputValue", "");
    localStorage.setItem(entryKey, JSON.stringify(newEntry));

    mutation.mutate({ prompt: inputValue, workoutId: workoutId || "" });
    console.log("SENDING: ", inputValue);
  }

  return (
    <div className="grid relative gap-2 py-4 px-4 pb-20 bg-gradient-to-br border shadow-md md:px-8 md:m-4 md:rounded-lg from-black/80 via-black/70 to-black/90">
      {/* Timestamp */}
      <h6 className="font-thin text-right text-white uppercase">
        {timestamp || "01-23-4567 89:10:11"}
      </h6>

      {/* Textarea */}
      <div className="flex">
        <textarea
          ref={textareaRef}
          style={{
            resize: "none",
            overflow: "hidden",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          rows={1}
          value={inputValue}
          onInput={calculateLines}
          onFocus={() => updateState("isFocused", true)}
          onBlur={() => updateState("isFocused", inputValue === "")}
          onChange={(e) => updateState("inputValue", e.target.value)}
          placeholder="Type here"
          className="relative z-10 p-2 w-full text-2xl bg-black rounded-l-lg border resize-none focus:outline-none text-white/100 placeholder-white/50 border-white/20 focus:border-white/30"
        />

        {/* Buttons */}
        <button
          onClick={handleSend}
          id="SAVE_BUTTON"
          className="py-1 px-8 font-bold text-black bg-green-400 rounded-r-lg border transition-transform transform hover:bg-green-300 focus:bg-green-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}

const useTextbox = () => {
  const [state, setInputState] = useState({
    inputValue: "",
    isFocused: false,
  });
  const [timestamp, setTimestamp] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineHeight, setLineHeight] = useState(32);

  // Update the input value or focus state
  const updateState = (
    key: "inputValue" | "isFocused",
    value: string | boolean,
  ) => setInputState((prev) => ({ ...prev, [key]: value }));

  const calculateLines = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const computedStyle = window.getComputedStyle(textarea);

      // Get line height and update it if necessary
      const lineHeightValue = parseFloat(computedStyle.lineHeight);
      if (lineHeightValue !== lineHeight) {
        setLineHeight(lineHeightValue);
      }

      // Reset height and adjust dynamically to fit content
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Initial setup
  useEffect(() => {
    const today = new Date();
    setTimestamp(format(today, "MM-dd-yyyy - hh:mm"));
    const intervalId = setInterval(() => {
      setTimestamp(format(new Date(), "MM-dd-yyyy - hh:mm"));
    }, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return {
    state,
    timestamp,
    updateState,
    calculateLines,
    textareaRef,
  };
};
