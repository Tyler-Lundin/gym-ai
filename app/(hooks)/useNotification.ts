import { useAtom } from "jotai";
import { appState } from "../atoms";
import { v4 as uuid } from "uuid";
import { NotificationTypes, Notification } from "../(components)/notification";
import { useCallback, useRef } from "react";

export default function useNotification() {
  const [, setNotifications] = useAtom(appState);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sendNotification = useCallback(
    (message: string, type: NotificationTypes) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        const newNotification: Notification = {
          id: uuid(),
          message,
          type,
        };
        console.log({ message, type });

        setNotifications((prevState) => ({
          ...prevState,
          notifications: [...prevState.notifications, newNotification],
        }));
      }, 300); // Adjust debounce time as needed
    },
    [setNotifications],
  );

  return { sendNotification };
}
