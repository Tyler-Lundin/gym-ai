"use client";
import ChatEntries from "./entries";
import TextBox from "./textbox";
import { Entry } from "@prisma/client";
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

  if (!isOpen)
    return (
      <AnimatePresence>
        <motion.button
          initial={{ opacity: 0, translateY: 25, translateX: "-50%" }}
          animate={{ opacity: 100, translateY: 0, translateX: "-50%" }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0, translateY: 25 }}
          onClick={() => setState((state) => ({ ...state, isOpen: true }))}
          className="grid absolute bottom-8 left-1/2 place-content-center h-16 rounded-full z-[500] aspect-square"
        >
          <motion.div className="rounded-full border border-green-700 shadow transition-all dark:border-green-400 dark:shadow-none hover:scale-125 shadow-black backdrop-blur-sm w-fit h-fit group">
            <IoIosAdd className="text-6xl text-green-700 rounded-full transition-all dark:text-green-400 group-hover:scale-125" />
          </motion.div>
        </motion.button>
      </AnimatePresence>
    );
  return (
    <div className="flex fixed top-0 right-0 bottom-0 left-0 z-40 flex-col pt-24 w-screen h-dvh bg-neutral-200 backdrop-blur-sm dark:bg-black/45">
      <ChatEntries />
      <AnimatePresence>
        <TextBox />
      </AnimatePresence>
    </div>
  );
}
