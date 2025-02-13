import { z } from "zod";

// Enums
export const UnitSystemSchema = z.enum(["METRIC", "IMPERIAL"]);

// User Model
export const UserSchema = z.object({
  id: z.string().cuid(),
  authId: z.string(),
  username: z.string(),
  email: z.string().email().nullable(),
  createdAt: z.date(),
  isInit: z.boolean(),
  units: UnitSystemSchema,
  height_ft: z.number().int().nullable(),
  height_in: z.number().int().nullable(),
  height_cm: z.number().int().nullable(),
  weight: z.number().int().nullable(),
  totalWorkouts: z.number().int().nullable(),
  totalWeight: z.number().nullable(),
  totalReps: z.number().int().nullable(),
  metadata: z.record(z.unknown()).nullable(),
});

// Exercise Model
export const ExerciseSchema = z.object({
  name: z.string(),
  categories: z.array(z.string()),
  description: z.string().nullable(),
  musclesTargeted: z.array(z.string()),
  equipment: z.array(z.string()),
  metadata: z.record(z.unknown()).nullable(),
});

// Workout Model
export const WorkoutSchema = z.object({
  name: z.string(),
  date: z.date(),
  notes: z.string().nullable(),
  totalWeight: z.number().nullable(),
  totalReps: z.number().int().nullable(),
  metadata: z.record(z.unknown()).nullable(),
});

// Entry Model
export const EntrySchema = z.object({
  sets: z.number().int().nullable(),
  reps: z.number().int().nullable(),
  weight: z.number().nullable(),
  duration: z.number().int().nullable(),
  restTime: z.number().int().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  prompt: z.string(),
});

// Macrocycle Model
export const MacrocycleSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  startDate: z.date(),
  endDate: z.date().nullable(),
  totalWeight: z.number().nullable(),
  totalReps: z.number().int().nullable(),
  metadata: z.record(z.unknown()).nullable(),
});

// Mesocycle Model
export const MesocycleSchema = z.object({
  name: z.string(),
  startDate: z.date(),
  endDate: z.date().nullable(),
  macroId: z.string().nullable(),
  notes: z.string().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  totalWeight: z.number().nullable(),
  totalReps: z.number().int().nullable(),
});

// Microcycle Model
export const MicrocycleSchema = z.object({
  startDate: z.date(),
  endDate: z.date().nullable(),
  totalWeight: z.number().nullable(),
  totalReps: z.number().int().nullable(),
});

// Goal Model
export const GoalSchema = z.object({
  description: z.string(),
  targetDate: z.date(),
  completed: z.boolean(),
  metadata: z.record(z.unknown()).nullable(),
});

// Note Model
export const NoteSchema = z.object({
  body: z.string(),
  metadata: z.record(z.unknown()).nullable(),
});

export const ProcessPromptSchema = z.object({
  exercise: ExerciseSchema,
  entry: EntrySchema,
});

// Infer TypeScript types
export type zUser = z.infer<typeof UserSchema>;
export type zExercise = z.infer<typeof ExerciseSchema>;
export type zWorkout = z.infer<typeof WorkoutSchema>;
export type zEntry = z.infer<typeof EntrySchema>;
export type zMacrocycle = z.infer<typeof MacrocycleSchema>;
export type zMesocycle = z.infer<typeof MesocycleSchema>;
export type zMicrocycle = z.infer<typeof MicrocycleSchema>;
export type zGoal = z.infer<typeof GoalSchema>;
export type zNote = z.infer<typeof NoteSchema>;
export type zProcessedPrompt = z.infer<typeof ProcessPromptSchema>;
