import { Workout as WorkoutType } from "@prisma/client";
import { format } from "date-fns";
import ExerciseEntries from "./exercise-entries";
import { useAtom } from "jotai";
import { dashboardState } from "../(dashboard)/dashboard";

export default function Workout({
  workout: { date, name, metadata, id },
}: {
  workout: WorkoutType;
}) {
  const [_, setState] = useAtom(dashboardState);

  const handleClick = () => {
    setState((prev) => ({ ...prev, workoutId: id }));
  };
  return (
    <button
      onClick={handleClick}
      className="relative p-4 m-4 rounded-lg border border-black"
    >
      <div
        id="HEADER"
        className="flex relative top-0 right-0 left-0 justify-between items-center pb-4 border-b border-b-black"
      >
        <h4 className="text-2xl font-bold"> {name} </h4>
        <small className="text-lg">
          {date && format(date, "MM-dd-yyyy - hh:mm aa")}
        </small>
      </div>
      <div className="relative gap-8 py-4"></div>
    </button>
  );
}
