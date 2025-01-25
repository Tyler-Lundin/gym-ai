"use client";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { dashboardState } from "@/app/atoms";
import { LocalEntry } from "../components/local-entries";
import { useUser } from "@clerk/nextjs";

export const prefix = "local-entry--";

export interface DashboardState {
  date: Date | null;
  workoutId: string | null;
  localEntries: LocalEntry[];
  entryKey: string | null;
  currentComponent:
    | "HOME"
    | "AUTH"
    | "INITIALIZE"
    | "SCHEDULE"
    | "GOALS"
    | "PROFILE";
}

export default function useDashboard() {
  const [{ currentComponent }, setState] = useAtom(dashboardState);
  const { user } = useUser();

  // Load date on mount
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      date: new Date(),
    }));
  }, [setState]);

  // Load local entries from localStorage on mount
  useEffect(() => {
    const loadLocalEntries = () => {
      const localStorageKeys = Object.keys(localStorage).filter((key) =>
        key.startsWith(prefix),
      );

      const localEntries: LocalEntry[] = [];

      for (const key of localStorageKeys) {
        try {
          const savedEntry = localStorage.getItem(key);
          if (savedEntry) {
            localEntries.push(JSON.parse(savedEntry));
          }
        } catch (error) {
          console.error(`Error parsing localStorage entry "${key}":`, error);
        }
      }

      return localEntries;
    };

    const localEntries = loadLocalEntries();

    setState((prev) => ({
      ...prev,
      localEntries,
    }));
  }, [setState]);

  useEffect(() => {
    const initialSettings = {
      initialized: false,
    };

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

  return { currentComponent };
}
