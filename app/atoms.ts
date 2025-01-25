import { atom } from "jotai";
import { DashboardState } from "./(dashboard)/hooks/useDashboard";

export const dashboardState = atom<DashboardState>({
  date: null,
  workoutId: null,
  localEntries: [],
  entryKey: null,
  currentComponent: "HOME",
});

export const appState = atom({});
