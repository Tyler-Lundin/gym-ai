import useSWR, { mutate } from "swr";
import { useState, useEffect, useRef } from "react";
import { getEntries } from "@/app/(actions)/entryActions";
import { Entry } from "@prisma/client";

const fetcher = getEntries;

export default function useEntries() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: entries, mutate: refreshEntries } = useSWR(
    "chatEntries",
    fetcher,
    {
      refreshInterval: 5000, // Polling for updates (adjust as needed)
    },
  );

  const [openEntry, setOpenEntry] = useState<string | null>(null);

  // Scroll to bottom when new entries are added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [entries]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/entries/${id}`, { method: "DELETE" });

    // Optimistic update: remove the deleted entry from cache
    mutate(
      "chatEntries",
      (entries: Entry[] | undefined) =>
        entries?.filter((e) => e.id !== id) ?? [],
      false,
    );
  };

  function handleClick(entryId: string) {
    setOpenEntry(openEntry === entryId ? null : entryId);
  }

  return {
    containerRef,
    entries,
    handleDelete,
    handleClick,
    openEntry,
    refreshEntries,
  };
}
