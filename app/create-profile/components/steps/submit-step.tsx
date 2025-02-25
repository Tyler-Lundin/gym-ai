"use client";
import { createProfileState } from "@/app/atoms";
import { useAtom } from "jotai";
import { Bebas_Neue } from "next/font/google";
import ProfileCard from "../profile-card";
import { motion } from "framer-motion";
import useStepDirection from "../../hooks/useStepDirection";
import { createUserProfile } from "@/app/(actions)/profileActions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const font = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function SubmitStep() {
  const router = useRouter();
  const auth = useUser();
  const [state] = useAtom(createProfileState);
  const reversed = useStepDirection();
  async function handleSubmit() {
    const authId = auth?.user?.id;
    const email = auth?.user?.primaryEmailAddress?.emailAddress;
    if (!authId || !email) return;
    const { success } = await createUserProfile({ state, authId, email });
    if (success) router.push("/dashboard");
  }
  return (
    <motion.div
      initial={{ opacity: 0, translateX: reversed ? -200 : 200 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: reversed ? 200 : -200 }}
      className="flex flex-col gap-6 items-center p-6 text-white rounded-2xl shadow-xl md:p-10 bg-[#0a0a0a]/80"
      style={{ ...font.style }}
    >
      <ProfileCard />
      <button
        style={font.style}
        onClick={handleSubmit}
        className="p-4 text-4xl text-black bg-green-500 rounded-lg"
      >
        COMPLETE
      </button>
    </motion.div>
  );
}
