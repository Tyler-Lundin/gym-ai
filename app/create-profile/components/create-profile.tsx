"use client";
import { UnitSystem } from "@prisma/client";
import {
  InitializeMessage,
  InitializeStatus,
} from "@/app/api/profile/create/route";
import useCreateProfile from "../hooks/useCreateProfile";
import Background from "@/app/(components)/background";
import StepButtons from "./step-buttons";
import { MoonLoader } from "react-spinners";
import useCreateProfileSteps from "../hooks/useCreateProfileSteps";

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

export default function CreateProfile() {
  const { state, setState, isLoaded } = useCreateProfile();
  const { steps } = useCreateProfileSteps();
  const CurrentStep = steps[state.currentStep].component;

  const handleNextAction = () =>
    setState((s: typeof state) => ({ ...s, currentStep: s.currentStep + 1 }));
  const handlePrevAction = () =>
    setState((s: typeof state) => ({ ...s, currentStep: s.currentStep - 1 }));

  const btnsProps = { handleNextAction, handlePrevAction };
  const stepProps = {
    handleNextAction,
    handlePrevAction,
  };

  return (
    <Background>
      {isLoaded ? (
        <>
          <div className="overflow-hidden fixed inset-0 z-50 w-screen h-screen">
            <div className="grid overflow-hidden gap-2 place-content-center w-full h-full">
              <CurrentStep {...stepProps} />
            </div>
            <StepButtons {...btnsProps} />
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
