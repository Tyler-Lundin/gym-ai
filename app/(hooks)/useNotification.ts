import { useAtom } from "jotai";
import { appState } from "../atoms";
import { v4 as uuid } from "uuid";
import { NotificationTypes, Notification } from "../(components)/notification";

export default function useNotification() {
  const [{ notifications }, setNotifications] = useAtom(appState);

  const sendNotification = (message: string, type: NotificationTypes) => {
    const newNotification: Notification = {
      id: uuid(),
      message,
      type,
    };

    setNotifications((prevState) => ({
      ...prevState,
      notifications: [...prevState.notifications, newNotification],
    }));
  };

  return { sendNotification };
}
