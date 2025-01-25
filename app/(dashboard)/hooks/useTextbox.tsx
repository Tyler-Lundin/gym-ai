import { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { useMutation } from "react-query";
import { dashboardState } from "@/app/atoms";
import { prefix } from "../hooks/useDashboard";
import sendPrompt from "@/app/(actions)/sendPrompt";
import { LocalEntry } from "../components/local-entries";

interface State {
  inputValue: string;
  isFocused: boolean;
}

type Action =
  | { type: "SET_INPUT_VALUE"; payload: string }
  | { type: "SET_FOCUS"; payload: boolean };

const initialState: State = {
  inputValue: "",
  isFocused: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_INPUT_VALUE":
      return { ...state, inputValue: action.payload };
    case "SET_FOCUS":
      return { ...state, isFocused: action.payload };
    default:
      return state;
  }
}

export default function useTextbox() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [timestamp, setTimestamp] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineHeight, setLineHeight] = useState(32);
  const [{ workoutId }, setDashboardState] = useAtom(dashboardState);

  const mutation = useMutation(sendPrompt, {
    onSuccess: (data) => {
      console.log("Mutation Success:", data);
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
    },
  });

  const handleSend = useCallback(() => {
    const timestamp = new Date();
    const entryKey = `${prefix}${timestamp.getTime()}`;
    const newEntry: LocalEntry = {
      prompt: state.inputValue,
      timestamp,
      entryKey,
      workoutId,
    };

    setDashboardState((prev) => ({
      ...prev,
      localEntries: [...prev.localEntries, newEntry],
    }));

    dispatch({ type: "SET_INPUT_VALUE", payload: "" });
    localStorage.setItem(entryKey, JSON.stringify(newEntry));

    mutation.mutate({
      entryKey,
      prompt: state.inputValue,
      workoutId: workoutId || "",
      timestamp: timestamp.toUTCString(),
    });

    console.log("SENDING:", state.inputValue);
  }, [state.inputValue, workoutId, setDashboardState, mutation]);

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
      setTimestamp(format(new Date(), "MM-dd-yyyy - hh:mm"));
    };

    updateTimestamp();
    const intervalId = setInterval(updateTimestamp, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return {
    inputValue: state.inputValue,
    isFocused: state.isFocused,
    timestamp,
    updateInputValue: (value: string) =>
      dispatch({ type: "SET_INPUT_VALUE", payload: value }),
    setFocus: (focus: boolean) =>
      dispatch({ type: "SET_FOCUS", payload: focus }),
    calculateLines,
    textareaRef,
    handleSend,
  };
}
