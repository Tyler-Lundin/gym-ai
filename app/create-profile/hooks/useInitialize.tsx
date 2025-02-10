"use client";
import { useState } from "react";
import { InitializeReturn } from "@/app/api/initialize/route";
import ProfileSetup from "../components/steps/profile-setup";
import { InitialUserData } from "../components/Initialize";
import { useRouter } from "next/navigation";
import useNotification from "@/app/(hooks)/useNotification";

const Steps = [{ component: ProfileSetup, title: "Set Up Your Profile" }];

export default function useInitialize() {
  const [step, setStep] = useState<number>(0);
  const { push } = useRouter();
  const [userData, setUserData] = useState<InitialUserData>({
    username: "",
    height: { feet: 0, inches: 0 },
    units: "IMPERIAL",
    weight: 0,
  });
  const [status, setStatus] = useState<
    InitializeReturn["s"] | "LOADING" | null
  >(null);
  const [message, setMessage] = useState<InitializeReturn["m"] | null>(null);

  const StepComponent = Steps[step]?.component;
  const { sendNotification } = useNotification();
  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => Math.max(prev - 1, 0));
  const handleClearStatus = () => {
    setStatus(null);
    setMessage(null);
  };
  const handleSubmit = async () => {
    try {
      setStatus("LOADING");
      const response = await fetch("/api/initialize", {
        method: "POST",
        body: JSON.stringify({ userData }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Initialization failed");

      const body = await response.json();
      const { s, m, redirect, user } = body as InitializeReturn;

      if (redirect && user) {
        setStatus(s);
        setMessage(m);
        if (s === "ERROR") {
          sendNotification("An error occurred during initialization", "ERROR");
        } else if (s === "SUCCESS") {
          sendNotification("Initialization successful", "SUCCESS");
        }

        if (s === "SUCCESS" && m === "PROFILE CREATED") {
          push("/");
        }
      }
    } catch (error) {
      console.error("Error initializing user:", error);
      sendNotification("Failed to initialize user", "ERROR");
    }
  };

  return {
    steps: Steps,
    step,
    StepComponent,
    userData,
    setUserData,
    handleNext,
    handleSubmit,
    handlePrevious,
    status,
    message,
    handleClearStatus,
  };
}
