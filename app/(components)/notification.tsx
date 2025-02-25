"use client";
import { useAtom } from "jotai";
import { useEffect, useState, useCallback } from "react";
import { appState } from "../atoms";
import {
  MdError,
  MdCheckCircle,
  MdInfo,
  MdWarning,
  MdMessage,
} from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

import { Roboto } from "next/font/google";

const font = Roboto({ subsets: ["latin"], weight: "300" });

// Define notification types with associated styles/icons
const notificationTypes = {
  ERROR: { color: "bg-red-500/75", icon: <MdError /> },
  SUCCESS: { color: "bg-green-500/75", icon: <MdCheckCircle /> },
  INFO: { color: "bg-blue-500/75", icon: <MdInfo /> },
  WARNING: { color: "bg-yellow-500/75 ", icon: <MdWarning /> },
  MESSAGE: { color: "bg-black text-white/75", icon: <MdMessage /> },
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

const DEFAULT_NOTIFICATION_TIMER = 4500;

export default function Notifications() {
  const [{ notifications }] = useAtom(appState);
  const [notification, setNotification] = useState<Notification | null>(null);

  // Initialize notifications after mount to avoid hydration mismatch
  useEffect(() => {
    const len = notifications.length;
    const latestNotification = notifications[len - 1];
    setNotification(latestNotification || null);
  }, [notifications]);

  // Automatically remove notifications after a timeout
  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      setNotification(null);
    }, DEFAULT_NOTIFICATION_TIMER);

    return () => clearTimeout(notificationTimer);
  }, [notification]);

  // Handle dismissing notifications
  const dismissNotification = useCallback((id: string) => {
    setNotification(null);
  }, []);

  const n = notification;

  return (
    <div className="overflow-hidden absolute top-0 right-0 left-0 p-3 space-y-2 pointer-events-none z-[500]">
      <AnimatePresence>
        {n && (
          <NotificationComponent
            key={n.id}
            type={n.type}
            message={n.message}
            onClick={() => dismissNotification(n.id)}
          />
        )}
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
      className={` relative text-black py-1 rounded-lg w-full overflow-hidden justify-items-center ${color}`}
      onClick={onClick}
    >
      <span className="grid relative place-items-center m-2 text-3xl text-green-600 bg-black rounded-full aspect-square h-max">
        {icon}
      </span>
      <h1 style={font.style} className="text-2xl font-bold text-left">
        {message}
      </h1>
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
      transition={{ duration: 0.18 }}
      whileHover={{ scale: 1.01 }}
      className={`h-fit z-[101] ${className} pointer-events-auto cursor-pointer flex items-center gap-2`}
    >
      {children}
    </motion.div>
  );
}
