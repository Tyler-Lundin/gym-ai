"use client";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { dashboardState } from "@/app/atoms";
import { User } from "@clerk/nextjs/server";
import { Entry, Workout } from "@prisma/client";

export const prefix = "local-entry--";

export interface DashboardState {
  targetDate: Date | null;
  currentWorkoutId: string | null;
  workoutIds: string[] | null;
  workouts: Workout[];
  entryIds: string[];
  entries: Entry[];
  rawEntries: string[];
}

export default function useDashboard() {
  const [, setState] = useAtom(dashboardState);
  useEffect(() => {
    async function getDashboardData() {
      const response = await fetch("/api/dashboard");
      console.log({ response });
      if (response.ok) {
        const { user, workout } = (await response.json()) as {
          user: User | null;
          workout: Workout | null;
        };
        console.log({ user, workout });
        setState((prev) => ({
          ...prev,
          currentWorkoutId: workout?.id || null,
        }));
      }
    }
    getDashboardData();
  }, [setState]);
}
