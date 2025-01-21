"use client";
import { dashboardState } from "@/app/atoms";
import { Entry } from "@prisma/client";
import { useAtom } from "jotai";
import { LocalEntry } from "../dashboard";
import { format } from "date-fns";

export default function LocalEntries() {
  const [{ localEntries }, setState] = useAtom(dashboardState);

  return (
    <div className="grid gap-2 text-black">
      {localEntries &&
        localEntries.map((e: LocalEntry, i: number) => (
          <RawEntry key={`raw_entry_${i}`} entry={e} />
        ))}
    </div>
  );
}

function RawEntry({ entry }: { entry: LocalEntry }) {
  return (
    <div className="flex justify-between p-4 w-full rounded-lg border border-black/50">
      <h5 className="text-2xl">{entry.rawInput}</h5>
      <small className="text-xs">{format(entry.timestamp, "hh:mm aa")}</small>
    </div>
  );
}
