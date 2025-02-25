import { useAtom } from "jotai";
import { createProfileState } from "@/app/atoms";
import SubmitStep from "../components/steps/submit-step";
import UsernameStep from "../components/steps/username-step";
import ExperienceLevelStep from "../components/steps/experience-step";
import StrengthLevelsStep from "../components/steps/strength-step";
import BodyMetricsStep from "../components/steps/body-metrics-step";
import PatternStep from "../components/steps/pattern-step";
import UnitsStep from "../components/steps/units-step";
import PreferenceStep from "../components/steps/preference-step";

export const STEPS = [
  { component: UsernameStep, title: "Username" },
  { component: UnitsStep, title: "Units" },
  { component: ExperienceLevelStep, title: "Experience" },
  { component: StrengthLevelsStep, title: "Strength" },
  { component: BodyMetricsStep, title: "Body Metrics" },
  { component: PatternStep, title: "Pattern" },
  { component: PreferenceStep, title: "Focus" },
  { component: SubmitStep, title: "Submit" },
];

export default function useCreateProfileSteps() {
  const [{ currentStep }] = useAtom(createProfileState);

  return {
    steps: STEPS,
    currentStep,
  };
}
