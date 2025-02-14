import { v4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { IoIosTrash, IoMdCreate } from "react-icons/io";
import { Prisma } from "@prisma/client";

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
  if (!entry.prompt) return null;
  return (
    <motion.div
      initial={{
        opacity: 0.0,
        translateX: "-50%",
      }}
      onClick={() => handleClick(entryId)}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.25, delay: index * 0.1 }}
      key={entryId}
      className="grid overflow-hidden relative gap-1 p-4 w-full text-left text-black dark:text-white"
    >
      <span className="flex justify-between px-1 w-full text-sm text-gray-500 rounded-lg border border-white/50">
        <h6 className="font-thin text-black uppercase dark:text-white">
          {format(new Date(entry.createdAt || ""), "MM/dd/yy")}
        </h6>

        <h6 className="font-thin text-black uppercase dark:text-white">
          {format(new Date(entry.createdAt || ""), "hh:mm aa")}
        </h6>
      </span>
      <div className="px-1">
        <span className="flex gap-2 items-center">
          <p className="text-2xl">{entry?.exercise?.name}</p>
          <p className="text-2xl">{entry.weight} lbs</p>
          <small className="text-small">X</small>
          <p className="text-2xl">{entry.reps} reps</p>
        </span>

        <ul className="flex gap-4">
          <h6>muscles:</h6>
          {entry?.exercise?.musclesTargeted.map((muscle) => (
            <li
              key={v4()}
              className="px-1 text-sm rounded-lg border border-white"
            >
              {muscle}
            </li>
          ))}
        </ul>

        <ul className="flex gap-4">
          <h6>categories:</h6>
          {entry?.exercise?.categories.map((category) => (
            <li
              key={v4()}
              className="px-1 text-sm rounded-lg border border-white"
            >
              {category}
            </li>
          ))}
        </ul>

        <span className="flex gap-4 opacity-75">
          <p className="text-xs italic">&quot;{entry.prompt}&quot;</p>
        </span>
        <AnimatePresence>
          {openEntry === entryId && (
            <EntrySettings
              entryId={entryId}
              handleOpen={() => handleClick(entryId)}
              handleDelete={() => handleDelete(entryId)}
            />
          )}
        </AnimatePresence>
      </div>
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
