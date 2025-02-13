import { EntrySchema, ExerciseSchema } from "@/types/zod-schema";

export const models = {
  USER: "user",
  WORKOUT: "workout",
  EXERCISE: "exercise",
  EXERCISE_ENTRY: "exerciseEntry",
  CYCLE: "cycle",
  PERIODIZATION: "periodization",
  GOAL: "goal",
};

export type ModelKey = keyof typeof models;

export const actions = {
  REJECT: "reject",
  CREATE: "create",
  READ: "read",
  UPDATE: "update",
  DELETE: "delete",
  SUGGEST: "suggest",
  ANALYZE: "analyze",
} as const;

export type ActionKey = keyof typeof actions;
export const processInputPrompt = `
  exercise model: ${JSON.stringify(ExerciseSchema)}
  and
  entry model: ${JSON.stringify(EntrySchema)}

  **IMPORTANT**: Please fill out all relevant fields in the Exercise schema as fully as possible based on the provided prompt. If a field is missing or partially available, infer the missing information using common knowledge of exercises. 

  Exercise Schema Inclusions:
  - **categories**: Inferred from the exercise type. For example, "Barbell overhead press" could be "upper body", "strength".
  - **description**: A brief, accurate description of the exercise.
  - **musclesTargeted**: For the "Barbell overhead press", you should infer muscles like "shoulders", "triceps", and "upper chest".
  - **equipment**: "Barbell" should be listed for "Barbell overhead press".

  - **Strict Instructions for Data**:
    - **Do NOT create fictional data**—use only concrete values from the input or known details.
    - If a value is partially available and can be logically inferred, fill it in.
    - **Strict adherence to the schema's types** (e.g., use numbers for sets, reps, weight, and arrays for musclesTargeted, categories).

  **Example for Barbell Overhead Press**:
  - **musclesTargeted**: ["shoulders", "triceps", "upper chest"]
  - **equipment**: ["barbell"]
  - **categories**: ["upper body", "strength"]
  - **description**: "A strength training exercise focused on shoulder and tricep development."
`;
