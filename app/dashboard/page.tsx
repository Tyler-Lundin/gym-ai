"use client";
import NotificationProvider from "../(components)/notification";
import { UserButton } from "@clerk/nextjs";
import Messages from "./components/messages";
import Navbar from "../(components)/navbar";

export default function Dashboard() {
  return (
    <main className="grid overflow-hidden gap-2 p-4 w-screen h-screen rounded-lg bg-neutral-300 dark:bg-neutral-800">
      <Navbar />
      <Messages />
      <NotificationProvider />
    </main>
  );
}
