"use client";
import useCreateProfile from "../hooks/useCreateProfile";
import Background from "@/app/(components)/background";
import StepButtons from "./step-buttons";
import { MoonLoader } from "react-spinners";
import useCreateProfileSteps from "../hooks/useCreateProfileSteps";

export default function CreateProfile() {
  const { state, isLoaded } = useCreateProfile();
  const { steps } = useCreateProfileSteps();
  const CurrentStep = steps[state.currentStep].component;

  return (
    <Background>
      {isLoaded ? (
        <>
          <div className="overflow-hidden fixed inset-0 z-50 w-screen h-screen">
            <div className="grid overflow-hidden gap-2 place-content-center w-full h-full">
              <CurrentStep />
            </div>
            <StepButtons />
          </div>
        </>
      ) : (
        <div className="grid absolute top-0 left-0 z-50 place-content-center w-screen h-screen">
          <MoonLoader speedMultiplier={0.7} color="yellow" />
        </div>
      )}
    </Background>
  );
}
