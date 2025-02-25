import { createProfileState } from "@/app/atoms";
import { useAtom } from "jotai";

export default function useExperienceStatus() {
  const [{ experience }] = useAtom(createProfileState);
  switch (experience) {
    case "ADVANCED":
      return true;
    case "INTERMEDIATE":
      return true;
    case "BEGINNER":
      return true;
    default:
      return false;
  }
}
