import { useMemo } from "react";

const useHeightWeightValidation = (
  feet: number,
  inches: number,
  weight: number,
) => {
  const isFeetValid = useMemo(() => feet > 0 && feet < 10, [feet]);
  const isInchesValid = useMemo(() => inches >= 0 && inches < 12, [inches]);
  const isHeightValid = useMemo(
    () => isFeetValid && isInchesValid,
    [isFeetValid, isInchesValid],
  );
  const isWeightValid = useMemo(() => weight >= 50 && weight <= 999, [weight]);

  return { isFeetValid, isInchesValid, isHeightValid, isWeightValid };
};

export default useHeightWeightValidation;
