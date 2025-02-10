import { compareAsc } from "date-fns";
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { messagesAtom } from "@/app/atoms";

import { Entry } from "@prisma/client";
import { getEntries } from "@/app/(actions)/entryActions";
import { SentPrompt } from "../components/messages";

const fetcher = () => getEntries();

export type AllEntries = (Partial<SentPrompt> & Partial<Entry>)[];

export default function useEntries() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: dbEntries } = useSWR("chatEntries", fetcher, {
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

  function handleClick(entryId: string) {
    if (openEntry === entryId) handleClose();
    else handleOpen(entryId);
  }

  return { containerRef, sorted, handleDelete, handleClick, openEntry };
}
