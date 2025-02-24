import ExperienceLevelStep from "../components/steps/experience-level";
import StrengthLevelsStep from "../components/steps/strength-levels";
import BodyMetricsStep from "../components/steps/body-metrics";
import TrainingAvailabilityStep from "../components/steps/training-availability";
import TrainingPreferencesStep from "../components/steps/training-preferences";
import UsernameInput from "../components/steps/username";
import TrainingPatternStep from "../components/training-pattern-step";
import { useAtom } from "jotai";
import useUsernameStatus from "./useUsernameStatus";
import useExperienceStatus from "./useExperienceStatus";
import useStrengthStatus from "./useStrengthStatus";
import useBodyMetricsStatus from "./useBodyMetricsStatus";
import useAvailabilityStatus from "./useAvailabilityStatus";
import usePatternStatus from "./usePatternStatus";
import { createProfileState } from "@/app/atoms";
import SubmitStep from "../components/steps/submit-step";

export const STEPS = [
  { component: UsernameInput, title: "Username" }, //0
  { component: ExperienceLevelStep, title: "Experience" }, //1
  { component: StrengthLevelsStep, title: "Strength" }, //2
  { component: BodyMetricsStep, title: "Body Metrics" }, //3
  { component: TrainingAvailabilityStep, title: "Availability" }, //4
  {
    component: TrainingPatternStep,
    title: "Pattern",
  },
  { component: TrainingPreferencesStep, title: "Focus" }, //6
  { component: SubmitStep, title: "Submit" }, //7
];

export default function useCreateProfileSteps() {
  const [{ currentStep }] = useAtom(createProfileState);
  const { status: usernameStatus } = useUsernameStatus();
  const experienceStatus = useExperienceStatus();
  const strengthStatus = useStrengthStatus();
  const bodyMetricsStatus = useBodyMetricsStatus();
  const availabilityStatus = useAvailabilityStatus();
  const patternStatus = usePatternStatus();

  function isDisabled() {
    switch (currentStep) {
      case 0:
        console.log({ usernameStatus, experienceStatus });
        return !usernameStatus;
      case 1:
        return !experienceStatus;
      case 2:
        return !strengthStatus;
      case 3:
        return !bodyMetricsStatus;
      case 4:
        return !availabilityStatus;
      case 5:
        return !patternStatus;
      case 6:
        return false;
      default:
        return true;
    }
  }

  return {
    steps: STEPS,
    stepStatus: isDisabled(),
    currentStep,
  };
}
