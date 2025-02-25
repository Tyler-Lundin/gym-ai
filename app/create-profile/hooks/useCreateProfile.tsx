"use client";
import { useUser } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { createProfileState } from "@/app/atoms";
import { UnitSystem } from "@prisma/client";
import {
  InitializeMessage,
  InitializeStatus,
} from "@/app/api/profile/create/route";

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

export default function useCreateProfile() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [state, setState] = useAtom(createProfileState);

  return { state, setState, user, isSignedIn, isLoaded };
}
