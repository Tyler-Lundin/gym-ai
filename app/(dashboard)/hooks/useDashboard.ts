"use client";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { dashboardState } from "@/app/atoms";
import { LocalEntry } from "../components/local-entries";

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

  return { currentComponent };
}
