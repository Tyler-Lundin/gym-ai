"use client";
import getUnits from "@/app/dashboard/util/getUnits";
import { Roboto } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { createProfileState } from "@/app/atoms";
import useCreateProfile from "../hooks/useCreateProfile";

const font = Roboto({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});

export default function ProfileCard() {
  const { isLoaded, isSignedIn, state, user } = useCreateProfile();
  const {
    experience,
    strength,
    availability,
    bodyMetrics,
    currentStep,
    preferences,
    readiness,
    username,
    unitSystem,
  } = state;

  const title =
    "font-bold flex  justify-between gap-8 text-2xl border-b border-black dark:border-white";
  const { weight: weightUnit, height: heightUnits } = getUnits({
    unitSystem: unitSystem,
  });

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 100, translateY: 0 }}
      exit={{ opacity: 100, translateX: 100 }}
      className="p-2 w-full rounded-lg bg-white/50 dark:bg-black/50"
    >
      <ul className="grid gap-4 py-4" style={font.style}>
        <span className="flex gap-4 items-center w-full">
          <UserButton />
          <p>{isLoaded && isSignedIn && user?.firstName}</p>
        </span>

        <li className="w-full">
          <h6 className={title}>
            Username
            <span className="font-light">{username ? username : "-"}</span>
          </h6>
        </li>
        <li>
          <h6 className={title}>
            Experience
            <span className="text-lg font-light">
              {experience ? experience.toLowerCase() : "-"}
            </span>
          </h6>
        </li>
        {strength && (
          <li className="w-full">
            <h6 className={title}>Estimated Strength</h6>
            <div className="grid w-full">
              <span className="flex justify-between w-full font-light border-b border-black/25 dark:border-white/25">
                Bench:
                <div className="text-lg">
                  {strength.bench && strength.bench > 0 ? (
                    <div>
                      {strength.bench}
                      <small>{weightUnit}</small>
                    </div>
                  ) : (
                    <>-</>
                  )}
                </div>
              </span>
              <span className="flex justify-between w-full font-light border-b border-black/25 dark:border-white/25">
                Squat:
                <div className="text-lg">
                  {strength.squat && strength.squat > 0 ? (
                    <div>
                      {strength.squat}
                      <small>{weightUnit}</small>
                    </div>
                  ) : (
                    <>-</>
                  )}
                </div>
              </span>
              <span className="flex justify-between w-full font-light border-b border-black/25 dark:border-white/25">
                Deadlift:
                <div className="text-lg">
                  {strength.deadlift && strength.deadlift > 0 ? (
                    <div>
                      {strength.deadlift}
                      <small>{weightUnit}</small>
                    </div>
                  ) : (
                    <>-</>
                  )}
                </div>
              </span>
            </div>
          </li>
        )}

        <li>
          <h6 className={title}>
            Bodyweight
            <span className="text-lg font-light">
              <div>
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
              </div>
            </span>
          </h6>
        </li>
      </ul>
    </motion.div>
  );
}
