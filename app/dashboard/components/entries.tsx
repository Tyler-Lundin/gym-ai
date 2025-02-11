"use client";
import useEntries from "../hooks/useEntries";
import EntryComponent from "./entry";

export default function ChatEntries() {
  const { containerRef, sorted, handleDelete, handleClick, openEntry } =
    useEntries();

  return (
    <div
      ref={containerRef}
      className="block overflow-y-auto flex-grow space-y-4 h-full basis-auto no-scrollbar border-y-black/25 dark:border-y-white/25"
    >
      {sorted.map((entry, index) => (
        <span key={`entry-${index}`}>
          <EntryComponent
            entry={entry}
            handleDelete={handleDelete}
            handleClick={handleClick}
            openEntry={openEntry}
          />
          {index !== sorted.length - 1 && (
            <hr className="w-full border-x border-black/15 dark:border-white/15" />
          )}
        </span>
      ))}
    </div>
  );
}
