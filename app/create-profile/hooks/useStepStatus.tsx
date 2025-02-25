import useUsernameStatus from "./useUsernameStatus";
import useExperienceStatus from "./useExperienceStatus";
import useStrengthStatus from "./useStrengthStatus";
import useBodyMetricsStatus from "./useBodyMetricsStatus";
import usePatternStatus from "./usePatternStatus";
import { useAtom } from "jotai";
import { createProfileState } from "@/app/atoms";
import { useEffect, useState } from "react";

export default function useStepStatus() {
  const [{ currentStep }] = useAtom(createProfileState);
  const [stepStatus, setStepStatus] = useState<boolean>(false);
  const [stepLoading] = useState<boolean>(false);
  const { status: usernameStatus } = useUsernameStatus();
  const experienceStatus = useExperienceStatus();
  const strengthStatus = useStrengthStatus();
  const bodyMetricsStatus = useBodyMetricsStatus();
  const patternStatus = usePatternStatus();

  useEffect(() => {
    switch (currentStep) {
      case 0:
        setStepStatus(usernameStatus);
        break;
      case 1:
        setStepStatus(true);
        break;
      case 2:
        setStepStatus(experienceStatus);
        break;
      case 3:
        setStepStatus(strengthStatus);
        break;
      case 4:
        setStepStatus(bodyMetricsStatus);
        break;
      case 5:
        setStepStatus(patternStatus);
        break;
      case 6:
        setStepStatus(true);
        break;
      default:
        setStepStatus(false);
        break;
    }
  }, [
    usernameStatus,
    experienceStatus,
    strengthStatus,
    bodyMetricsStatus,
    patternStatus,
    currentStep,
  ]);

  return { stepStatus, stepLoading };
}
