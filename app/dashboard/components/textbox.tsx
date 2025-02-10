"use client";
import useTextbox from "../hooks/useTextbox";
import { sendPrompt } from "@/app/(actions)/promptActions";
import { format } from "date-fns";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { v4 } from "uuid";
import { motion } from "framer-motion";
import { messagesAtom } from "@/app/atoms";

export async function sendPromptClient({ prompt }: { prompt: string }) {
  return sendPrompt({ prompt }); // ✅ Calls the Server Action indirectly
}

export default function TextBox() {
  const [messages, setMessages] = useAtom(messagesAtom);
  const { inputValue, timestamp, setState, calculateLines, textareaRef } =
    useTextbox();
  const { mutate } = useSWRConfig(); // Get mutate function
  const [timeString, setTimeString] = useState("03:29:99 PM");
  const [dateString, setDateString] = useState("December 04 1998");

  useEffect(() => {
    setTimeString(format(timestamp, "hh:mm:ss aa"));
  }, [timestamp]);

  useEffect(() => {
    setDateString(format(timestamp, "MM/dd/yy"));
  }, [timestamp]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setState((state) => ({ ...state, inputValue: "" }));
    const sentPrompt = { prompt: inputValue, timestamp: new Date(), id: v4() };
    setMessages({
      ...messages,
      sentPrompts: [...messages.sentPrompts, sentPrompt],
    });
    localStorage.setItem(
      `sent-prompt-${sentPrompt.id}`,
      JSON.stringify(sentPrompt),
    );
    mutate("/api/prompt/send", sendPrompt({ prompt: inputValue }), {
      throwOnError: true,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateX: -25 }}
      animate={{ opacity: 100, translateX: 0 }}
      exit={{ opacity: 0, translateX: -25 }}
      className="grid gap-2 p-8 bg-white rounded-lg border border-black shadow-md md:px-8 dark:bg-black min-h-20 z-[400] backdrop-blur-md h-min"
    >
      {/* Timestamp */}
      <span className="flex justify-between">
        <h6 className="font-thin text-black uppercase dark:text-white">
          {dateString || "01-23-4567"}
        </h6>

        <h6 className="font-thin text-black uppercase dark:text-white">
          {timeString}
        </h6>
      </span>
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
          onChange={(e) => {
            if (e.target.value.length > 329) return;
            setState((state) => ({ ...state, inputValue: e.target.value }));
          }}
          placeholder="Type here"
          className="relative z-10 p-2 w-full text-2xl text-black rounded-l-lg border border-black resize-none focus:outline-none placeholder-black/50"
        />

        {/* Buttons */}
        <button
          onClick={handleSend}
          id="send_btn"
          className="py-1 px-8 font-bold text-black bg-blue-400 rounded-r-lg border border-blue-700 transition-all transform hover:bg-green-300 focus:bg-green-300"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
}
