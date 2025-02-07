import { dashboardState } from "@/app/atoms";
import { useAuth } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { useEffect, useCallback } from "react";

const initialSettings = { initialized: false };

export default function useLocalSettings() {
  const { userId } = useAuth();
  const [, setState] = useAtom(dashboardState);
  const settingsKey = `local-settings-${userId}`;

  useEffect(() => {
    if (!userId) return;

    try {
      // Retrieve settings from localStorage once
      const savedSettings = localStorage.getItem(settingsKey);
      const parsedSettings = savedSettings
        ? (JSON.parse(savedSettings) as typeof initialSettings)
        : null;

      if (!parsedSettings) {
        // Initialize settings if they don't exist
        localStorage.setItem(settingsKey, JSON.stringify(initialSettings));
      } else if (!parsedSettings.initialized) {
        setState((prev) => ({ ...prev, currentComponent: "INITIALIZE" }));
      }

      console.log("Loaded settings:", parsedSettings);
    } catch (error) {
      console.error("Error reading/parsing local settings:", error);
    }
  }, [userId, setState, settingsKey]); // Ensure all dependencies are included

  const setInitialized = useCallback(() => {
    try {
      const newSettings = { initialized: true };
      localStorage.setItem(settingsKey, JSON.stringify(newSettings));

      // Update Jotai state to reflect initialization
      setState((prev) => ({ ...prev, currentComponent: "HOME" }));
    } catch (error) {
      console.error("Error updating local settings:", error);
    }
  }, [setState, settingsKey]);

  return { setInitialized };
}
