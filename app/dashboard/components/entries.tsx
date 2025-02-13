"use client";
import { RingLoader } from "react-spinners";
import useEntries from "../hooks/useEntries";
import EntryComponent from "./entry";
import { Prisma } from "@prisma/client";

export default function ChatEntries() {
  const { containerRef, entries, handleDelete, handleClick, openEntry } =
    useEntries();

  console.log({ entries });

  return (
    <div
      ref={containerRef}
      className="block overflow-y-auto flex-grow space-y-4 h-full basis-auto no-scrollbar border-y-black/25 dark:border-y-white/25"
    >
      {entries ? (
        entries.map((entry, index) => (
          <span key={`entry-${index}`}>
            <EntryComponent
              entry={
                entry as Prisma.EntryGetPayload<{ include: { exercise: true } }>
              }
              handleDelete={handleDelete}
              handleClick={handleClick}
              openEntry={openEntry}
            />
            {index !== entries.length - 1 && (
              <hr className="w-full border-x border-black/15 dark:border-white/15" />
            )}
          </span>
        ))
      ) : (
        <RingLoader />
      )}
    </div>
  );
}
