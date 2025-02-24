import { createProfileState } from "@/app/atoms";
import { useAtom } from "jotai";

export default function useAvailabilityStatus() {
  const [{ availability }] = useAtom(createProfileState);
  const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } =
    availability;
  return (
    sunday || monday || tuesday || wednesday || thursday || friday || saturday
  );
}
