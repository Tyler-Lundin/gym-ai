"use client";
import { useUser } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { createProfileState } from "@/app/atoms";

export default function useCreateProfile() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [state, setState] = useAtom(createProfileState);

  return { state, setState, user, isSignedIn, isLoaded };
}
