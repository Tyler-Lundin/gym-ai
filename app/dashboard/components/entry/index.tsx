import { v4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import { Prisma, UnitSystem } from "@prisma/client";
import { Roboto } from "next/font/google";
import { useAtom } from "jotai";
import { appState } from "@/app/atoms";
import DateTimeInformation from "./date-time-info";
import ExerciseInfo from "./exercise-info";
import EntryMenu from "./entry-menu";
const font = Roboto({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function EntryComponent({
  index,
  entry,
  openEntry,
  handleClick,
  handleDelete,
}: {
  index: number;
  entry: Prisma.EntryGetPayload<{ include: { exercise: true } }>;
  handleClick: (entryId: string) => void;
  handleDelete: (entryId: string) => void;
  openEntry: string | null;
}) {
  const entryId = String(entry.id) || String(v4());
  const [{ user }] = useAtom(appState);
  if (!entry.prompt || !user) return null;
  const units = user.units as UnitSystem;
  const hasExercise = entry.exercise?.name;
  console.log({ entry });

  const exerciseInfoProps = {
    hasExercise: hasExercise ? true : false,
    entry,
    units,
  };

  const entryMenuProps = {
    entryId,
    handleOpen: () => handleClick(entryId),
    handleDelete: () => handleDelete(entryId),
  };

  // const yValue = index % 2 !== 0 ? 33 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, translateX: "-50%" }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.25, delay: index * 0.1 }}
      onClick={() => handleClick(entryId)}
      style={font.style}
      key={entryId}
      className="grid relative flex-row gap-4 p-2 pt-5 w-full text-left text-black rounded-lg border dark:text-white max-w-1/2 bg-black/50 h-min dark:border-white/25"
    >
      <DateTimeInformation createdAt={entry.createdAt} />
      <h1 id="MAIN_TITLE" className="text-2xl font-semibold">
        {hasExercise && entry?.exercise?.name}
      </h1>
      <ExerciseInfo {...exerciseInfoProps} />

      {entry.prompt && hasExercise ? (
        <div className="px-1 pl-2 text-sm italic border-l-2 border-gray-400 opacity-75">
          &quot;{entry.prompt}&quot;
        </div>
      ) : (
        <div>
          <p className="text-lg font-thin text-black dark:text-white">
            {entry.prompt}
          </p>
        </div>
      )}

      <AnimatePresence>
        {openEntry === entryId && (
          <>
            <EntryMenu {...entryMenuProps} />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
