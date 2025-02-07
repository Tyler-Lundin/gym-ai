"use client";
import { useEffect } from "react";
import ChatEntries from "./entries";
import TextBox from "./textbox";
import { Entry } from "@prisma/client";
import { getLocalSentPrompts } from "@/utils/localStorage";
import { IoIosText } from "react-icons/io";
import { useAtom } from "jotai";
import { messagesAtom } from "@/app/atoms";
import { AnimatePresence, motion } from "framer-motion";

export type MessagesState = {
  entries: Entry[];
  sentPrompts: SentPrompt[];
  responses: Response[];
  isOpen: boolean;
};

export interface SentPrompt {
  prompt: string;
  timestamp: Date;
  id: string | number;
}

export default function Messages() {
  const [{ isOpen }, setState] = useAtom<MessagesState>(messagesAtom);
  useEffect(() => {
    const localSentPrompts = getLocalSentPrompts();
    setState((state) => ({
      ...state,
      sentPrompts: [...state.sentPrompts, ...localSentPrompts],
    }));
  }, []);

  if (!isOpen)
    return (
      <AnimatePresence>
        <motion.button
          initial={{ opacity: 0, translateX: 25 }}
          animate={{ opacity: 100, translateX: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0, translateX: 25 }}
          onClick={() => setState((state) => ({ ...state, isOpen: true }))}
          className="grid absolute right-8 bottom-8 place-content-center h-16 bg-blue-600 rounded-full z-[500] aspect-square"
        >
          <IoIosText className="text-4xl" />
        </motion.button>
      </AnimatePresence>
    );
  return (
    <>
      <ChatEntries />
      <AnimatePresence>
        <TextBox />
      </AnimatePresence>
    </>
  );
}
