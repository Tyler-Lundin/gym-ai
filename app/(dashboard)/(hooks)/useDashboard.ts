"use client";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { dashboardState } from "@/app/atoms";
import { LocalEntry } from "../(components)/local-entries";

export const prefix = "local-entry--";

export interface DashboardState {
  date: Date | null;
  workoutId: string | null;
  localEntries: LocalEntry[];
}

export default function useDashboard() {
  const [_, setState] = useAtom(dashboardState);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      date: new Date(),
    }));
  }, []);

  useEffect(() => {
    let allKeys = Object.keys(localStorage);
    let localEntries = [];

    // This Saves State in Local Storage
    for (let key of allKeys) {
      if (key.includes(prefix)) {
        const savedEntry = localStorage.getItem(key);
        if (!savedEntry) continue;
        localEntries.push(JSON.parse(savedEntry));
      }
    }

    // Retrieves Saved State on initial Load
    setState((prev) => ({ ...prev, localEntries }));
  }, []);
}
