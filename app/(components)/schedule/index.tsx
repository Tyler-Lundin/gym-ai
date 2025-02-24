import { Macrocycle, Mesocycle, Microcycle } from "@prisma/client";
import { useState } from "react";

interface ScheduleState {
  macro: Macrocycle;
  meso: Mesocycle;
  micro: Microcycle;
}

export default function Schedule() {
  const [schedule, setSchedule] = useState({
    macrocycle: null,
  });

  return <div></div>;
}
