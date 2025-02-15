// import NotificationProvider from "../(components)/notification";
import Messages from "./components/messages";
import Navbar from "../(components)/navbar";
import Background from "../(components)/background";
import DateSelector from "./components/date-selector";
import { prisma } from "@/libs/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ClientDataLoader from "../(components)/client-data-loader";
import UserStats from "./components/user-stats";

export default async function Dashboard() {
  const auth = await currentUser();
  const authId = auth?.id;
  if (!auth || !authId) redirect("/create-profile");
  const user = await prisma.user.findFirst({ where: { authId } });
  if (!user) redirect("/create-profile");
  const serializedUser = JSON.stringify(user);
  return (
    <Background>
      <ClientDataLoader serializedUser={serializedUser} />
      <main className="grid overflow-hidden gap-2 p-1 w-screen rounded-lg md:p-3 h-dvh">
        <span className="grid h-min">
          <Navbar />
          <DateSelector />
        </span>
        <Messages />
        <UserStats user={user} />
      </main>
    </Background>
  );
}
