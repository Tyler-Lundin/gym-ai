"use client";
import TextBox from "./(components)/textbox";
import Workouts from "../(components)/workouts";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import LocalEntries from "./(components)/local-entries";
import useDashboard from "./(hooks)/useDashboard";
const queryClient = new QueryClient();

export default function Dashboard() {
  useDashboard(); // data handled in here
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
