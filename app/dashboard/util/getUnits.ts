import { UnitSystem } from "@prisma/client";

interface Imperial {
  weight: "lbs";
  height: { foot: "ft"; inch: "in"; yard: "yd" };
}
interface Metric {
  weight: "kgs";
  height: { centimeter: "cm"; meters: "m" };
}

export default function getUnits({
  unitSystem,
}: {
  unitSystem: UnitSystem | null;
}): Imperial | Metric {
  if (unitSystem === "METRIC")
    return {
      weight: "kgs",
      height: { centimeter: "cm", meters: "m" },
    };

  //I M P E R I A L _ D E F A U L T
  return {
    weight: "lbs",
    height: { foot: "ft", inch: "in", yard: "yd" },
  };
}
