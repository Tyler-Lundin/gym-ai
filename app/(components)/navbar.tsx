"use client";
import { UserButton } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { messagesAtom } from "../atoms";
import { IoIosClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./logo";

export default function Navbar() {
  const [{ isOpen: isMessagesOpen }, setMessages] = useAtom(messagesAtom);

  const closeMessages = () =>
    setMessages((state) => ({ ...state, isOpen: false }));

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -25 }}
      animate={{ opacity: 100, translateY: 0 }}
      transition={{ duration: 1 }}
      id="NAV_BAR"
      className="grid overflow-hidden h-14 bg-gradient-to-l rounded-lg rounded-b-none border border-black/25 via-black/70 from-green-950/80 to-black/65 backdrop-blur-sm z-[500] dark:border-white/25"
    >
      <CloseMessagesButton
        isOpen={isMessagesOpen}
        handleClick={closeMessages}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Logo />
      </div>

      <div className="grid absolute right-8 top-1/2 place-content-center bg-green-400 rounded-full shadow scale-125 -translate-y-1/2 p-[2px] shadow-green-700 aspect-square">
        <UserButton />
      </div>
    </motion.div>
  );
}

function CloseMessagesButton({
  isOpen,
  handleClick,
}: {
  isOpen: boolean;
  handleClick: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.button
          initial={{ opacity: 0, translateX: -25 }}
          animate={{ opacity: 100, translateX: 0 }}
          exit={{ opacity: 0, translateX: -25 }}
          onClick={handleClick}
          className="grid absolute top-0 bottom-0 left-0 place-content-center w-20 text-white bg-red-700"
        >
          <IoIosClose className="text-4xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
