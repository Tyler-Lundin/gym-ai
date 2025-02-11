import { v4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { IoIosTrash, IoMdCreate } from "react-icons/io";
import { AllEntries } from "../hooks/useEntries";
import { useEffect } from "react";

export default function EntryComponent({
  entry,
  openEntry,
  handleClick,
  handleDelete,
}: {
  entry: AllEntries[number];
  handleClick: (entryId: string) => void;
  handleDelete: (entryId: string) => void;
  openEntry: string | null;
}) {
  const entryId = String(entry.id) || String(v4());
  if (!entry.prompt) return null;
  useEffect(() => {}, []);

  return (
    <motion.div
      initial={{
        opacity: 0.0,
      }}
      onClick={() => handleClick(entryId)}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
      key={entryId}
      className="overflow-hidden relative p-8 w-full text-left text-black dark:text-white"
    >
      <span className="flex justify-between w-full text-sm text-gray-500">
        <h6 className="font-thin text-black uppercase dark:text-white">
          {format(
            new Date(entry.timestamp || entry.createdAt || ""),
            "MM/dd/yy",
          )}
        </h6>

        <h6 className="font-thin text-black uppercase dark:text-white">
          {format(new Date(entry.timestamp || entry.createdAt || ""), "hh:mm")}
        </h6>
      </span>
      <p className="text-2xl">{entry.prompt}</p>
      <AnimatePresence>
        <EntrySettings
          openEntry={openEntry}
          entryId={entryId}
          handleOpen={() => handleClick(entryId)}
          handleDelete={() => handleDelete(entryId)}
        />
      </AnimatePresence>
    </motion.div>
  );
}

function EntrySettings({
  openEntry,
  entryId,
  handleOpen,
  handleDelete,
}: {
  openEntry: string | null;
  entryId: string | null;
  handleOpen: () => void;
  handleDelete: () => void;
}) {
  return (
    <>
      {openEntry === entryId && (
        <motion.div
          initial={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 100, translateY: 0 }}
          exit={{ opacity: 0, translateY: 50 }}
          onClick={handleOpen}
          className="grid absolute top-0 right-0 bottom-0 left-0 place-content-center backdrop-blur-md bg-black/50 dark:bg-white/50"
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
      )}
    </>
  );
}
