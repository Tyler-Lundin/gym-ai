"use client";
import { UnitSystem } from "@prisma/client";
import {
  InitializeMessage,
  InitializeStatus,
} from "@/app/api/profile/create/route";
import useInitialize from "../hooks/useInitialize";

export interface InitialUserData {
  username: string;
  height: { feet: number; inches: number; centimeters: number };
  weight: number;
  units: UnitSystem;
}

export interface InitializeComponentProps {
  userData: InitialUserData;
  setUserData: React.Dispatch<React.SetStateAction<InitialUserData>>;
  onNext: () => void;
  status: InitializeStatus | "LOADING" | null;
  message: InitializeMessage | null;
  handleClearStatus: () => void;
}

export default function Initialize() {
  const {
    steps,
    step,
    StepComponent,
    userData,
    setUserData,
    handleNext,
    handleSubmit,
    status,
    message,
    handleClearStatus,
  } = useInitialize();
  return (
    <main className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-100">
      <div className="grid relative place-content-center w-screen h-screen text-black">
        <h1 className="absolute top-4 left-4 text-2xl font-thin">
          {steps[step]?.title}
        </h1>
        {StepComponent && (
          <StepComponent
            userData={userData}
            setUserData={setUserData}
            onNext={step < steps.length - 1 ? handleNext : handleSubmit}
            status={status}
            message={message}
            handleClearStatus={handleClearStatus}
          />
        )}
      </div>
    </main>
  );
}
