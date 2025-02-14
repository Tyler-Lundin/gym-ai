import NotificationProvider from "../(components)/notification";
import Messages from "./components/messages";
import Navbar from "../(components)/navbar";
import Background from "../(components)/background";
import DateSelector from "./components/date-selector";

export default async function Dashboard() {
  return (
    <Background>
      <main className="grid overflow-hidden gap-2 p-4 w-screen rounded-lg h-dvh">
        <span className="grid h-min">
          <Navbar />
          <DateSelector />
        </span>
        <Messages />
        <NotificationProvider />
      </main>
    </Background>
  );
}
