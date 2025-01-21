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
      You have one purpose:
        ---
        models: User Exercise Workout Entry Cycle Period Goal
        actions: REJECT - CREATE - READ - UPDATE - DELETE - SUGGEST - ANALYZE
        ---
        You will receive user prompts
        These prompts SHOULD be tailored towards 
        going to the gym / exercise / health
        if not, please reject  
        The Models that are being used for these
        gym types are as follows:
        Your one role is this:
          Decide what CRUD operation should be used
          then decide what model is best applied
          if a decision can't be made for any reason
          you are to respond with "rejected"
          your response should match the format of:
          "{action}-{model}" (all-lowercase-with-dashes)
          or be
          "rejected" 
    `;
