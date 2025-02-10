"use client";
import { useAtom } from "jotai";
import { useEffect, useState, useCallback } from "react";
import { appState } from "../atoms";
import { v4 as uuid } from "uuid";
import {
  MdError,
  MdCheckCircle,
  MdInfo,
  MdWarning,
  MdMessage,
} from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

// Define notification types with associated styles/icons
const notificationTypes = {
  ERROR: { color: "bg-red-400", icon: <MdError /> },
  SUCCESS: { color: "bg-green-400", icon: <MdCheckCircle /> },
  INFO: { color: "bg-blue-400", icon: <MdInfo /> },
  WARNING: { color: "bg-yellow-400 ", icon: <MdWarning /> },
  MESSAGE: { color: "bg-black text-white", icon: <MdMessage /> },
};

export interface Notification {
  id: string;
  message: string;
  type: NotificationTypes;
}

export type NotificationTypes =
  | "ERROR"
  | "WARNING"
  | "SUCCESS"
  | "INFO"
  | "MESSAGE";

const DEFAULT_NOTIFICATION_TIMER = 9000;

export default function Notifications() {
  const [{ notifications }] = useAtom(appState);
  const [showing, setShowing] = useState<Notification[]>([]);

  // Initialize notifications after mount to avoid hydration mismatch
  useEffect(() => {
    setShowing([
      ...notifications.map((notif) => ({ ...notif, id: uuid() })), // Ensure unique IDs
    ]);
  }, [notifications]);

  // Automatically remove notifications after a timeout
  useEffect(() => {
    const timers = showing.map((notif, i) =>
      setTimeout(
        () => {
          setShowing((prev) => prev.filter((n) => n.id !== notif.id));
        },
        DEFAULT_NOTIFICATION_TIMER + 1000 * i,
      ),
    );

    return () => timers.forEach(clearTimeout);
  }, [showing]);

  // Handle dismissing notifications
  const dismissNotification = useCallback((id: string) => {
    setShowing((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  return (
    <div className="overflow-hidden absolute top-0 right-0 p-3 space-y-2 pointer-events-none z-[100]">
      <AnimatePresence>
        {[...showing].reverse().map((n) => (
          <NotificationComponent
            key={n.id}
            type={n.type}
            message={n.message}
            onClick={() => dismissNotification(n.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Notification component with motion animation
function NotificationComponent({
  type,
  message,
  onClick,
}: {
  type: NotificationTypes;
  message: string;
  onClick: () => void;
}) {
  const { color, icon } = notificationTypes[type];

  return (
    <Base
      className={`px-4 py-2 text-black rounded-lg w-fit ${color}`}
      onClick={onClick}
    >
      <h1>{message}</h1>
      {icon}
    </Base>
  );
}

// Base motion component for animation
function Base({
  className,
  children,
  onClick,
}: {
  className?: string;
  children?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      className={`h-12 z-[101] ${className} pointer-events-auto cursor-pointer flex items-center gap-2`}
    >
      {children}
    </motion.div>
  );
}
