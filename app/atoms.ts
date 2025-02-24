import { atom } from "jotai";
import { Notification } from "./(components)/notification";
import { DashboardState } from "./dashboard/hooks/useDashboard";
import { MessagesState } from "./dashboard/components/messages";
import { User } from "@prisma/client";
import { CreateProfileState } from "@/types/create-profile-state";

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
  user: User | null;
}>({
  notifications: [],
  user: null,
});

export const createProfileState = atom<CreateProfileState>({
  currentStep: 0,
  username: "",
  unitSystem: "IMPERIAL",
  experience: "BEGINNER",
  bodyMetrics: { weight: { kg: 0, lb: 0 }, height: { ft: 0, in: 0, cm: 0 } },
  strength: { squat: 0, bench: 0, deadlift: 0 },
  availability: {
    sunday: true,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
  },
  pattern: [],
  preferences: null,
  readiness: null,
});
