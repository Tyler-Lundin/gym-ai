"use client";
import Workout from "./workout";
import { useQuery } from "react-query";
import { getWorkouts } from "../(actions)/workout-actions";
import { useAuth } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { dashboardState } from "../atoms";

export default function Workouts() {
  const [{ date }] = useAtom(dashboardState);
  const { userId } = useAuth();

  const {
    data: workouts,
    isLoading,
    isError,
  } = useQuery(["userId", userId], () => getWorkouts(userId || "", date));

  if (isLoading) return <h1>LOADING . . .</h1>;
  if (isError) return <h1>ERROR OCCURED!</h1>;
  return (
    <div>
      {workouts && workouts.map((w, i) => <Workout key={w.id} workout={w} />)}
    </div>
  );
}
