"use client";

import { dashboardState } from "@/app/atoms";
import { useAtom } from "jotai";
import { format } from "date-fns";
import { useState } from "react";
import ContextMenu from "@/app/(components)/context-menu";

export default function LocalEntries() {
  const [{ localEntries }] = useAtom(dashboardState);

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
  rawInput: string;
  timestamp: Date;
  entryKey: string;
};

function LocalEntry({ entry }: { entry: LocalEntry }) {
  const { entryKey, rawInput, timestamp } = entry;
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

  const handleCloseContextMenu = () => setVisible(false);

  return (
    <button
      onContextMenu={handleRightClick}
      onClick={() => {
        console.log(`Entry Key < ${entryKey} > Clicked!`);
      }}
      className="flex relative justify-between p-4 w-full rounded-lg border border-black/50"
    >
      <h5 className="text-2xl">{rawInput}</h5>
      <small className="text-xs">{format(timestamp, "hh:mm aa")}</small>
      <ContextMenu
        visible={visible}
        setVisible={handleCloseContextMenu}
        position={contextMenuPosition}
        context="local-entry"
      />
    </button>
  );
}
