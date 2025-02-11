"use client";
import { useState } from "react";
import ProfileSetup from "../components/steps/profile-setup";
import { InitialUserData } from "../components/Initialize";
import { useRouter } from "next/navigation";
import useNotification from "@/app/(hooks)/useNotification";
import { InitializeReturn } from "@/app/api/profile/create/route";

const STEPS = [{ component: ProfileSetup, title: "Set Up Your Profile" }];

export default function useInitialize() {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<InitialUserData>({
    username: "",
    height: { feet: 0, inches: 0, centimeters: 0 },
    units: "IMPERIAL",
    weight: 0,
  });

  const [status, setStatus] = useState<
    InitializeReturn["s"] | "LOADING" | null
  >(null);
  const [message, setMessage] = useState<InitializeReturn["m"] | null>(null);

  const { push } = useRouter();
  const { sendNotification } = useNotification();
  const StepComponent = STEPS[step]?.component;

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => Math.max(prev - 1, 0));
  const handleClearStatus = () => {
    setStatus(null);
    setMessage(null);
  };

  /**
   * Submits user initialization data to the API.
   */
  const submitInitialization = async () => {
    setStatus("LOADING");

    try {
      const response = await fetch("/api/profile/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData }),
      });

      if (!response.ok) throw new Error("Initialization failed");

      const { s, m, redirect, user } =
        (await response.json()) as InitializeReturn;

      setStatus(s);
      setMessage(m);
      sendNotification(
        s === "ERROR"
          ? "An error occurred during initialization"
          : "Initialization successful",
        s,
      );

      if (s === "SUCCESS" && m === "PROFILE CREATED" && redirect && user) {
        push("/");
      }
    } catch (error) {
      console.error("Error initializing user:", error);
      setStatus("ERROR");
      sendNotification("Failed to initialize user", "ERROR");
    }
  };

  return {
    steps: STEPS,
    step,
    StepComponent,
    userData,
    setUserData,
    handleNext,
    handlePrevious,
    handleClearStatus,
    handleSubmit: submitInitialization,
    status,
    message,
  };
}
