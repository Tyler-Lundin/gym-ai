"use client";
import { HashLoader } from "react-spinners";
import useEntries from "../hooks/useEntries";
import EntryComponent from "./entry/index";
import { Prisma } from "@prisma/client";

export default function ChatEntries() {
  const {
    containerRef,
    entries,
    handleDelete,
    handleClick,
    openEntry,
    isLoading,
  } = useEntries();

  console.log({ entries });

  return (
    <>
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <HashLoader color="white" />
        </div>
      )}
      <div
        ref={containerRef}
        className="flex overflow-y-auto flex-wrap gap-1 p-1 h-full basis-auto no-scrollbar border-y-black/25 dark:border-y-white/25"
      >
        {entries &&
          entries.map((entry, index) => {
            return (
              <EntryComponent
                index={index}
                key={`entry-${index}`}
                entry={
                  entry as Prisma.EntryGetPayload<{
                    include: { exercise: true };
                  }>
                }
                handleDelete={handleDelete}
                handleClick={handleClick}
                openEntry={openEntry}
              />
            );
          })}
      </div>
    </>
  );
}
