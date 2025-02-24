import { UnitSystem } from "@prisma/client";

export interface StepControlProps {
  handleNextAction: () => void;
  handlePrevAction: () => void;
}

export type ExperienceLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type Preferences = "HYPERTROPHY" | "STRENGTH" | "BOTH";
export type Readiness = "FATIGUED" | "FRESH" | "NORMAL" | "INJURED" | "TIRED";

export interface Strength {
  squat: number;
  bench: number;
  deadlift: number;
}

export interface BodyMetrics {
  weight: { kg: number; lb: number };
  height: { ft: number; in: number; cm: number };
}

export interface Availability {
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
}

export interface CreateProfileState {
  currentStep: number;
  username: string | null;
  experience: ExperienceLevel;
  strength: Strength;
  bodyMetrics: BodyMetrics;
  availability: Availability;
  pattern: boolean[];
  preferences: Preferences | null;
  readiness: Readiness | null;
  unitSystem: UnitSystem | null;
}
