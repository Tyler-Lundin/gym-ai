"use client";
import useTextbox from "../hooks/useTextbox";
import { sendPrompt } from "@/app/(actions)/promptActions";
import { useSWRConfig } from "swr";
import { motion } from "framer-motion";

export async function sendPromptClient({
  prompt,
  timestamp,
}: {
  prompt: string;
  timestamp: Date;
}) {
  return sendPrompt({ prompt, timestamp }); // ✅ Calls the Server Action indirectly
}

export default function TextBox() {
  const { inputValue, timestamp, setState, calculateLines, textareaRef } =
    useTextbox();
  const { mutate } = useSWRConfig(); // Get mutate function

  const handleSend = () => {
    if (!inputValue.trim()) return;
    if (!timestamp) return;
    setState((state) => ({ ...state, inputValue: "" }));
    mutate("/api/prompt/send", sendPrompt({ prompt: inputValue, timestamp }), {
      throwOnError: true,
    });
    mutate("chatEntries");
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateX: -25 }}
      animate={{ opacity: 100, translateX: 0 }}
      exit={{ opacity: 0, translateX: -25 }}
      className="grid gap-2 p-4 pb-8 bg-white border-black shadow-md md:p-8 md:px-8 dark:text-white dark:bg-black border-y min-h-20 z-[400] backdrop-blur-md h-min"
    >
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
          className="relative z-10 p-2 w-full text-2xl text-black bg-white rounded-l-lg border border-black resize-none dark:text-white dark:bg-black focus:outline-none placeholder-black/50 dark:border-white/50 dark:placeholder-white/50"
        />

        {/* Buttons */}
        <button
          onClick={handleSend}
          id="send_btn"
          className="py-1 px-4 font-bold text-green-500 rounded-r-lg border border-green-500 transition-all transform hover:bg-green-300 focus:bg-green-300"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
}
