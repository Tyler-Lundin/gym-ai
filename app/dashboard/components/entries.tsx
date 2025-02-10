"use client";
import useEntries from "../hooks/useEntries";
import EntryComponent from "./entry";

export default function ChatEntries() {
  const { containerRef, sorted, handleDelete, handleClick, openEntry } =
    useEntries();

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto space-y-4 h-full no-scrollbar"
    >
      {sorted.map((entry, index) => (
        <span key={`entry-${index}`}>
          <EntryComponent
            entry={entry}
            handleDelete={handleDelete}
            handleClick={handleClick}
            openEntry={openEntry}
          />
          <hr className="w-full border-x border-black/15 dark:border-white/15" />
        </span>
      ))}
    </div>
  );
}
