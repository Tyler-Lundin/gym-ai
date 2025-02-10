import NotificationProvider from "../(components)/notification";
import Messages from "./components/messages";
import Navbar from "../(components)/navbar";
import Background from "../(components)/background";

export default async function Dashboard() {
  return (
    <Background>
      <main className="grid overflow-hidden gap-2 p-4 w-screen h-screen rounded-lg">
        <Navbar />
        <Messages />
        <NotificationProvider />
      </main>
    </Background>
  );
}
