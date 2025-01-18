"use client"; // TODO: MAKE THIS :)
import TextBox from "./(components)/textbox";
import Workouts from "../(components)/workouts";
import { QueryClientProvider, QueryClient } from "react-query";
import { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
const queryClient = new QueryClient();

interface DashboardState {
  date: Date | null;
  workoutId: string | null;
}

export const dashboardState = atom<DashboardState>({
  date: null,
  workoutId: null,
});

export default function Dashboard() {
  const [_, setState] = useAtom(dashboardState);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      date: new Date(),
    }));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="overflow-hidden p-4 w-screen h-screen rounded-lg bg-neutral-300">
        <Workouts />
        <div id="CHATBOX_CONTAINER" className="fixed right-0 bottom-0 left-0">
          <TextBox />
        </div>
      </main>
    </QueryClientProvider>
  );
}
