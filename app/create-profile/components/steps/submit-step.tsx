import { createProfileState } from "@/app/atoms";
import { useAtom } from "jotai";
import { Bebas_Neue } from "next/font/google";
import ProfileCard from "../profile-card";

const font = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function SubmitStep() {
  const [state] = useAtom(createProfileState);
  function handleSubmit() {
    console.log("CREATE USER and STATS:", { state });
  }
  return (
    <>
      <ProfileCard />
      <button
        style={font.style}
        onClick={handleSubmit}
        className="p-4 text-2xl text-black rounded-lg border border-black dark:text-white dark:border-white"
      >
        CREATE PROFILE
      </button>
    </>
  );
}
