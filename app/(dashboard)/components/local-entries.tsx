"use client";

import { dashboardState } from "@/app/atoms";
import { useAtom } from "jotai";
import { format } from "date-fns";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "react-query";
import { getExerciseEntry } from "@/app/(actions)/entry-actions";

export default function LocalEntries() {
  const [{ localEntries, workoutId }] = useAtom(dashboardState);

  return (
    <div className="grid gap-2 text-black">
      {localEntries &&
        localEntries.map((entry: LocalEntry, index: number) => (
          <LocalEntry key={`raw_entry_${index}`} entry={entry} />
        ))}
    </div>
  );
}

export type LocalEntry = {
  prompt: string;
  timestamp: Date;
  entryKey: string;
  workoutId: string | null;
};

function LocalEntry({ entry }: { entry: LocalEntry }) {
  const [{ date }] = useAtom(dashboardState);
  const { userId } = useAuth();
  const { entryKey, prompt, timestamp, workoutId } = entry;
  const [visible, setVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleRightClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setVisible(true);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const { data, isLoading, isError } = useQuery(
    ["get-processed-entry", timestamp],
    () => getExerciseEntry(userId, entryKey, workoutId, prompt),
  );

  if (isError) return <h1>ERROR OCCURED!</h1>;

  return (
    <button
      onContextMenu={handleRightClick}
      onClick={() => {
        console.log(`Entry Key < ${entryKey} > Clicked!`);
      }}
      className="flex relative justify-between p-4 w-full rounded-lg border border-black/50"
    >
      <h5 className="text-2xl">
        {isLoading ? <h6>loading</h6> : data && data.notes ? prompt : prompt}
      </h5>
      <small className="text-xs">{format(timestamp, "hh:mm aa")}</small>
    </button>
  );
}
