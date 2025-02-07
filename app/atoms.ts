import { atom } from "jotai";
import { Notification } from "./(components)/notification";
import { DashboardState } from "./dashboard/hooks/useDashboard";
import { MessagesState } from "./dashboard/components/messages";

export const dashboardState = atom<DashboardState>({
  targetDate: null,
  currentWorkoutId: null,
  workoutIds: [],
  workouts: [],
  entryIds: [],
  entries: [],
  rawEntries: [],
});

export const messagesAtom = atom<MessagesState>({
  entries: [],
  sentPrompts: [],
  responses: [],
  isOpen: false,
});

export const appState = atom<{
  notifications: Notification[];
}>({
  notifications: [],
});
