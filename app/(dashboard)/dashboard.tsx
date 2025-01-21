"use client";
import TextBox from "./(components)/textbox";
import Workouts from "../(components)/workouts";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import LocalEntries from "./(components)/local-entries";
import { getWorkouts } from "../(actions)/workout-actions";
import { SignedOut, useAuth } from "@clerk/nextjs";
import { Entry } from "@prisma/client";
import { dashboardState } from "../atoms";
const queryClient = new QueryClient();

export interface DashboardState {
  date: Date | null;
  workoutId: string | null;
  localEntries: LocalEntry[];
}

export type LocalEntry = { rawInput: string; timestamp: Date };

export const prefix = "local-entry--";

export default function Dashboard() {
  const [{ localEntries, workoutId }, setState] = useAtom(dashboardState);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      date: new Date(),
    }));
  }, []);

  useEffect(() => {
    let allKeys = Object.keys(localStorage);
    let localEntries = [];

    for (let key of allKeys) {
      if (key.includes(prefix)) {
        const savedEntry = localStorage.getItem(key);
        if (!savedEntry) continue;
        localEntries.push(JSON.parse(savedEntry));
      }
    }

    setState((prev) => ({ ...prev, localEntries }));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="overflow-hidden p-4 w-screen h-screen rounded-lg bg-neutral-300">
        <Workouts />
        <LocalEntries />
        <div id="CHATBOX_CONTAINER" className="fixed right-0 bottom-0 left-0">
          <TextBox />
        </div>
      </main>
    </QueryClientProvider>
  );
}
