import { motion } from "framer-motion";
import { IoIosTrash, IoMdCreate } from "react-icons/io";

export default function EntryMenu({
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
