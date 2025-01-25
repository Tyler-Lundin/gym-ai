import Workouts from "@/app/(components)/workouts";
import LocalEntries from "../components/local-entries";
import TextBox from "../components/textbox";

export default function DashboardHome() {
  return (
    <>
      <Workouts />
      <LocalEntries />
      <div id="CHATBOX_CONTAINER" className="fixed right-0 bottom-0 left-0">
        <TextBox />
      </div>
    </>
  );
}
