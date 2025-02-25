"use client";
import getUnits from "@/app/dashboard/util/getUnits";
import { Bebas_Neue, Roboto } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import useCreateProfile from "../hooks/useCreateProfile";
import { Lifts } from "../hooks/useStrength";
import { CalendarPreview } from "./steps/pattern-step";
import usePattern from "../hooks/usePattern";
import Image from "next/image";

const smallFont = Roboto({
  subsets: ["latin"],
  weight: "300",
});
const font = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function ProfileCard() {
  const { isLoaded, isSignedIn, state, user } = useCreateProfile();
  const { fullPattern } = usePattern();
  const {
    experience,
    strength,
    pattern,
    bodyMetrics,
    currentStep,
    preference,
    username,
    unitSystem,
  } = state;

  const title =
    " flex justify-between gap-8 text-2xl border-b border-black dark:border-white text-white";
  const { weight: weightUnit, height: heightUnits } = getUnits({
    unitSystem: unitSystem,
  });

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 100, translateY: 0 }}
      exit={{ opacity: 100, translateX: 100 }}
      className="p-6 w-screen max-w-md text-white rounded-lg shadow-xl bg-[#0a0a0a]/80 backdrop-blur-lg"
    >
      <span className="flex overflow-hidden relative gap-4 items-center p-2 w-full rounded-full bg-white/50 dark:bg-black/50">
        {user?.imageUrl && (
          <>
            <Image
              alt="user"
              width={64}
              height={64}
              className="rounded-full"
              src={user?.imageUrl}
            />
            <Image
              alt="user"
              width={400}
              height={400}
              className="absolute w-full h-full blur-lg -z-10"
              src={user?.imageUrl}
            />
          </>
        )}
        <h1 className="text-3xl">
          {isLoaded && isSignedIn && user?.firstName}
        </h1>
      </span>
      <ul className="grid gap-6 p-4" style={font.style}>
        <li className="w-full">
          <h6 className={title}>
            Username
            <span style={smallFont.style} className="font-light">
              {username ? username : "-"}
            </span>
          </h6>
        </li>
        <li>
          <h6 className={title}>
            Experience
            <span className="text-lg font-light" style={smallFont.style}>
              {experience ? experience.toLowerCase() : "-"}
            </span>
          </h6>
        </li>

        {strength && (
          <li className="w-full">
            <h6 className={title}>Estimated Strength</h6>
            <div className="grid w-full" style={smallFont.style}>
              {["bench", "squat", "deadlift"].map((lift) => (
                <span
                  key={lift}
                  className="flex justify-between w-full font-light border-b border-black/25 dark:border-white/25"
                >
                  <div className="text-lg">
                    {lift.charAt(0).toUpperCase() + lift.slice(1)}:
                  </div>
                  <div className="text-lg">
                    {strength[lift as Lifts] && strength[lift as Lifts] > 0 ? (
                      <div>
                        {strength[lift as Lifts]}
                        <small>{weightUnit}</small>
                      </div>
                    ) : (
                      <>-</>
                    )}
                  </div>
                </span>
              ))}
            </div>
          </li>
        )}

        <li>
          <h6 className={title}>
            Bodyweight
            <span className="text-lg font-light" style={smallFont.style}>
              {bodyMetrics &&
                (bodyMetrics.weight.kg || bodyMetrics.weight.lb) ? (
                <>
                  {getUnits({ unitSystem }).weight === "kgs"
                    ? bodyMetrics.weight.kg
                    : bodyMetrics.weight.lb}
                  {weightUnit}
                </>
              ) : (
                <>-</>
              )}
            </span>
          </h6>
        </li>

        <li>
          <h6 className={title}>
            Preference
            <span className="text-lg font-light" style={smallFont.style}>
              {preference}
            </span>
          </h6>
        </li>

        <li>
          <CalendarPreview small={true} pattern={fullPattern} />
        </li>
      </ul>
    </motion.div>
  );
}
