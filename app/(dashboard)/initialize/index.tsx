"use client";
import { useState } from "react";
import ProfileSetup from "./steps/profile-setup";
import GoalsSetup from "./steps/goals-setup";
// import PeriodSetup from "./steps/period-setup";
import CyclesSetup from "./steps/cycles-setup";
// import WorkoutsSetup from "./steps/workouts-setup";

export type InitialUserData = {
  username: string;
  height: { feet: number; inches: number };
  weight: number | "";
  notes: string[];
  goals: { description: string; targetDate: string }[];
  periods: {
    name: string;
    startDate: string;
    endDate?: string;
    cycles: any[];
  }[];
};

export interface InitializeComponentProps {
  userData: InitialUserData;
  setUserData: React.Dispatch<React.SetStateAction<InitialUserData>>;
  onNext: () => void;
  onPrevious: () => void;
}

const Steps = [
  { component: ProfileSetup, title: "Set Up Your Profile" },
  { component: GoalsSetup, title: "Set Up Your Goals" },
  // { component: PeriodSetup, title: "Define Your Period" },
  { component: CyclesSetup, title: "Create Cycles" },
  // { component: WorkoutsSetup, title: "Plan Workouts" },
];

export default function DashboardInitialize() {
  const [step, setStep] = useState<number>(0);
  const [userData, setUserData] = useState<InitialUserData>({
    username: "",
    height: { feet: 0, inches: 0 },
    weight: 0,
    notes: [],
    goals: [],
    periods: [],
  });

  const StepComponent = Steps[step]?.component;

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/initialize", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Initialization failed");
      // Redirect to the dashboard or show success message
    } catch (error) {
      console.error("Error initializing user:", error);
    }
  };

  return (
    <div className="grid relative place-content-center w-full h-full text-black">
      <h1>{Steps[step]?.title}</h1>
      {StepComponent && (
        <StepComponent
          userData={userData}
          setUserData={setUserData}
          onNext={step < Steps.length - 1 ? handleNext : handleSubmit}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
}
