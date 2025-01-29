import { dashboardState } from "@/app/atoms";
import { useUser } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function useInitializeUser() {
  const [_, setState] = useAtom(dashboardState);

  const { user, isLoaded } = useUser();
  useEffect(() => {
    const initialSettings = {
      initialized: false,
    };

    if (!user?.id) return;
    const settingsKey = `local-settings-${user?.id}`;

    // Retrieve settings from localStorage
    const savedSettings = localStorage.getItem(settingsKey);

    if (!savedSettings) {
      // If no settings exist, initialize them in localStorage
      localStorage.setItem(settingsKey, JSON.stringify(initialSettings));
    } else {
      try {
        // Parse the saved settings if they exist
        const parsedSettings = JSON.parse(
          savedSettings,
        ) as typeof initialSettings;
        if (!parsedSettings?.initialized) {
          setState((prev) => ({ ...prev, currentComponent: "INITIALIZE" }));
        }
        // Perform any necessary validation or actions with `parsedSettings`
        console.log("Loaded settings:", parsedSettings);
      } catch (error) {
        console.error("Error parsing saved settings:", error);
      }
    }
  }, [user?.id]);
  return { isLoaded };
}
