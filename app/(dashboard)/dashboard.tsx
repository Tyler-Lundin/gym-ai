"use client";
import { QueryClientProvider, QueryClient } from "react-query";
import useDashboard from "./hooks/useDashboard";
import { ReactNode } from "react";
import DashboardHome from "./home";
import DashboardInitialize from "./initialize";
import useInitializeUser from "./hooks/useInitializeUser";
import { useUser } from "@clerk/nextjs";
const queryClient = new QueryClient();

export default function Dashboard() {
  const { currentComponent } = useDashboard(); // data handled in here
  const { isLoaded } = useInitializeUser();

  return (
    <main className="overflow-hidden p-4 w-screen h-screen rounded-lg bg-neutral-300">
      <Providers>
        {(isLoaded && currentComponent === "HOME" && <DashboardHome />) ||
          (currentComponent === "AUTH" && <>AUTH HERE</>)}
        {currentComponent === "INITIALIZE" && <DashboardInitialize />}
      </Providers>
    </main>
  );
}

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
