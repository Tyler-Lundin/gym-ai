"use client";
import { useEffect } from "react";
import ChatEntries from "./entries";
import TextBox from "./textbox";
import { Entry } from "@prisma/client";
import { getLocalSentPrompts } from "@/utils/localStorage";
import { IoIosAdd } from "react-icons/io";
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
  }, [setState]);

  if (!isOpen)
    return (
      <AnimatePresence>
        <motion.button
          initial={{ opacity: 0, translateX: 25 }}
          animate={{ opacity: 100, translateX: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0, translateX: 25 }}
          onClick={() => setState((state) => ({ ...state, isOpen: true }))}
          className="grid absolute right-8 bottom-8 place-content-center h-16 rounded-full z-[500] aspect-square"
        >
          <motion.div className="rounded-full border border-green-600 transition-all hover:scale-125 bg-black/50 backdrop-blur-sm w-fit h-fit group">
            <IoIosAdd className="text-6xl text-green-600 rounded-full transition-all group-hover:scale-125" />
          </motion.div>
        </motion.button>
      </AnimatePresence>
    );
  return (
    <div className="grid fixed top-0 right-0 bottom-0 left-0 z-40 grid-flow-row items-stretch pt-24 w-screen h-screen bg-black/45 backdrop-blur-sm">
      <ChatEntries />
      <AnimatePresence>
        <TextBox />
      </AnimatePresence>
    </div>
  );
}
