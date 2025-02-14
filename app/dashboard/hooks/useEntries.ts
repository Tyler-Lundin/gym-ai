import useSWR, { mutate } from "swr";
import { useState, useEffect, useRef } from "react";
import { getEntries, deleteEntry } from "@/app/(actions)/entryActions";
import { Entry } from "@prisma/client";
import { useAtom } from "jotai";
import { dashboardState } from "@/app/atoms";

export default function useEntries() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [{ targetDate }] = useAtom(dashboardState);
  const {
    data: entries,
    mutate: refreshEntries,
    isLoading,
  } = useSWR(
    targetDate ? [targetDate, "entries"] : null,
    ([d]) => getEntries(d),
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
    await deleteEntry({ id });

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
    isLoading,
  };
}
