import { useUser } from "@clerk/nextjs";
import { atom } from "jotai";

const initializeAtom = atom({
  username: "",
  units: "METRIC",
  height: {
    ft: 0,
    in: 0,
    kg: 0,
  },
  weight: {
    lbs: 0,
    kg: 0,
  },
  days_available: [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ],
});

export default function useInitialize() {
  const { user } = useUser();
  if (!user) return;
}
