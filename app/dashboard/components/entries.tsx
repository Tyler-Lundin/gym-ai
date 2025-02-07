"use client";
import { getEntries } from "@/app/(actions)/entryActions";
import { compareAsc, format } from "date-fns";
import useSWR from "swr";
import { SentPrompt } from "./messages";
import { v4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Entry } from "@prisma/client";
import { useAtom } from "jotai";
import { messagesAtom } from "@/app/atoms";
import { IoIosTrash, IoMdCreate } from "react-icons/io";

const fetcher = () => getEntries();

export default function ChatEntries() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: dbEntries, mutate } = useSWR("chatEntries", fetcher, {
    refreshInterval: 5000, // Polling for updates (adjust as needed)
  });
  const [openEntry, setOpenEntry] = useState<string | null>(null);
  const [{ entries: localEntries, sentPrompts, responses }, setMessages] =
    useAtom(messagesAtom);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [localEntries, sentPrompts, responses]); // Empty dependency array to run only once on mount

  type AllEntries = (Partial<SentPrompt> & Partial<Entry>)[];
  const getAllEntries = () => {
    if (!dbEntries) return [...sentPrompts] as AllEntries;
    return [...dbEntries, ...sentPrompts] as AllEntries;
  };

  const sorted = getAllEntries().sort((e1, e2) =>
    compareAsc(
      new Date(e1.createdAt || e1.timestamp || ""),
      new Date(e2.createdAt || e2.timestamp || ""),
    ),
  );

  const handleOpen = (id: string) => setOpenEntry(id);
  const handleClose = () => setOpenEntry(null);

  const handleDelete = (id: string) => {
    setMessages((state) => {
      const updatedEntries = state.entries.filter((e) => e.id !== id);
      const updatedSentPrompts = state.sentPrompts.filter((e) => e.id !== id);
      localStorage.removeItem(`sent-prompt-${id}`);
      return {
        ...state,
        entries: updatedEntries,
        sentPrompts: updatedSentPrompts,
      };
    });
  };

  console.log({ dbEntries, sentPrompts });

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto space-y-4 h-full no-scrollbar"
    >
      {sorted.map((entry) => {
        const entryId = entry.id || v4();
        if (entry.prompt)
          return (
            <motion.div
              initial={{
                opacity: 0.0,
              }}
              onClick={() => {
                if (openEntry === entryId) handleClose();
                else handleOpen(entryId);
              }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75 }}
              key={entryId}
              className="overflow-hidden relative p-8 text-left text-black bg-gradient-to-b via-white rounded-md border border-white shadow dark:text-white dark:via-black dark:border-black from-white/75 to-white/75 dark:from-black/75 dark:to-black/75"
            >
              <p className="text-2xl">{entry.prompt}</p>
              <span className="text-sm text-gray-500">
                {format(
                  new Date(entry.timestamp || entry.createdAt || ""),
                  "hh:mm",
                )}
              </span>
              <AnimatePresence>
                {openEntry === entryId && (
                  <div className="grid absolute top-0 right-0 bottom-0 place-content-center">
                    <span className="flex gap-4 p-4">
                      <motion.button
                        initial={{ opacity: 0, translateY: -10 }}
                        animate={{ opacity: 100, translateY: 0 }}
                        exit={{ opacity: 0, translateY: -10 }}
                        className="p-4 text-2xl font-black text-black bg-yellow-400 rounded-full border-black aspect-square h-min"
                        onClick={() => console.log(`EDIT ${entryId}`)}
                      >
                        <IoMdCreate />
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, translateY: -10 }}
                        animate={{ opacity: 100, translateY: 0 }}
                        exit={{ opacity: 0, translateY: -10 }}
                        className="p-4 text-2xl font-black text-black bg-red-400 rounded-full border-black aspect-square h-min"
                        onClick={() => handleDelete(entryId)}
                      >
                        <IoIosTrash />
                      </motion.button>
                    </span>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          );
      })}
    </div>
  );
}
