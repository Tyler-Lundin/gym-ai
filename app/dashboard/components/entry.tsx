import { v4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { IoIosTrash, IoMdClose, IoMdCreate } from "react-icons/io";
import { Prisma, UnitSystem } from "@prisma/client";
import { Roboto } from "next/font/google";
import { useAtom } from "jotai";
import { appState } from "@/app/atoms";
import getUnits from "../util/getUnits";
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
  return (
    <motion.div
      initial={{ opacity: 0, translateX: "-50%" }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.25, delay: index * 0.1 }}
      onClick={() => handleClick(entryId)}
      style={font.style}
      key={entryId}
      className="grid overflow-hidden relative gap-4 p-2 w-full text-left text-black dark:text-white border-y bg-black/50 dark:border-white/25"
    >
      {/* Date & Time */}
      <div className="flex justify-between pb-2 text-sm text-gray-300 border-b border-white/50">
        <h6 className="font-thin uppercase">
          {format(new Date(entry.createdAt || ""), "MM/dd/yy")}
        </h6>
        <h6 className="font-thin uppercase">
          {format(new Date(entry.createdAt || ""), "hh:mm aa")}
        </h6>
      </div>

      {/* Exercise Info (if available) */}
      {hasExercise && (
        <div className="flex flex-col gap-2 px-1">
          <div className="flex gap-2 items-center">
            <p className="text-2xl">{entry?.exercise?.name}</p>
            {entry.weight && (
              <p className="p-2 text-right rounded-md border border-white text-md">
                {entry.weight}
                <small>{getUnits({ units }).weight}</small>
              </p>
            )}
            {entry.reps && (
              <>
                <IoMdClose />
                <p className="p-2 text-right rounded-md border border-white text-md">
                  {entry.reps}
                  <small>reps</small>
                </p>
              </>
            )}
          </div>

          {/* Muscles Targeted */}
          {entry?.exercise?.musclesTargeted &&
            entry?.exercise?.musclesTargeted?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <h6 className="font-semibold">Muscles:</h6>
                {entry?.exercise.musclesTargeted.map((muscle) => (
                  <span
                    key={v4()}
                    className="px-2 text-sm rounded-lg border border-white"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            )}

          {/* Exercise Categories */}
          {entry?.exercise?.categories &&
            entry.exercise.categories?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <h6 className="font-semibold">Categories:</h6>
                {entry.exercise.categories.map((category) => (
                  <span
                    key={v4()}
                    className="px-2 text-sm rounded-lg border border-white"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
        </div>
      )}

      {/* Prompt (if available) */}
      {entry.prompt && (
        <div className="px-1 pl-2 text-sm italic border-l-2 border-gray-400 opacity-75">
          &quot;{entry.prompt}&quot;
        </div>
      )}

      {/* Entry Settings (Only show if entry is open) */}
      <AnimatePresence>
        {openEntry === entryId && (
          <EntrySettings
            entryId={entryId}
            handleOpen={() => handleClick(entryId)}
            handleDelete={() => handleDelete(entryId)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function EntrySettings({
  entryId,
  handleOpen,
  handleDelete,
}: {
  entryId: string | null;
  handleOpen: () => void;
  handleDelete: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 100, translateY: 0 }}
      exit={{ opacity: 0, translateY: 50 }}
      onClick={handleOpen}
      className="grid absolute top-0 right-0 bottom-0 left-0 z-50 place-content-center bg-white/90 dark:bg-black/80"
    >
      <span className="flex gap-4 p-4">
        <motion.button
          initial={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 100, translateY: 0 }}
          exit={{ opacity: 0, translateY: -10 }}
          className="flex items-center py-1 px-4 text-2xl font-black text-black bg-yellow-400 rounded-lg border-black hover:opacity-75 h-min"
          onClick={() => console.log(`EDIT ${entryId}`)}
        >
          EDIT
          <IoMdCreate />
        </motion.button>
        <motion.button
          initial={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 100, translateY: 0 }}
          exit={{ opacity: 0, translateY: -10 }}
          className="flex items-center py-1 px-4 text-2xl font-black text-black bg-red-400 rounded-lg border-black hover:opacity-75 h-min"
          onClick={handleDelete}
        >
          DELETE
          <IoIosTrash />
        </motion.button>
      </span>
    </motion.div>
  );
}
