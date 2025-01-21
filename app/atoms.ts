import { atom } from "jotai";
import { DashboardState } from "./(dashboard)/dashboard";

export const dashboardState = atom<DashboardState>({
  date: null,
  workoutId: null,
  localEntries: [],
});
