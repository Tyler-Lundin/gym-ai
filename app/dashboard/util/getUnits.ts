import { UnitSystem } from "@prisma/client";

interface Imperial {
  weight: "lb";
  height: { foot: "ft"; inch: "in"; yard: "yd" };
}
interface Metric {
  weight: "kg";
  height: { centimeter: "cm"; meters: "m" };
}

export default function getUnits({
  units,
}: {
  units: UnitSystem;
}): Imperial | Metric {
  if (units === "METRIC")
    return {
      weight: "kg",
      height: { centimeter: "cm", meters: "m" },
    };

  //I M P E R I A L _ D E F A U L T
  return {
    weight: "lb",
    height: { foot: "ft", inch: "in", yard: "yd" },
  };
}
