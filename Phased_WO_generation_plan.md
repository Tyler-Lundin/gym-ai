Plan for User Onboarding and Workout Generation

1. User Onboarding (Phase 1 Prompt)

Objective: Collect user data to create a profile.

Steps:

Prompt the user with the three Phase 1 questions:

Fitness goal (e.g., Build Muscle, Lose Weight, General Fitness).

Workout frequency (formatted as #dayson/#daysoff).

Workout limiters (e.g., injuries, equipment availability, time constraints).

Validate and structure the responses into a JSON format:

{
  "userProfile": {
    "goal": "Build Muscle",
    "workoutFrequency": "3/4",
    "limiters": ["Shoulder pain", "Access to dumbbells only", "30-minute duration"]
  }
}

Save the JSON data to the backend (e.g., Firebase, a database, or local storage).

2. Load User Profile for Phase 2 (Workout Generation)

Objective: Use saved user profile data to customize the workout generation prompt.

Steps:

Retrieve the saved JSON profile for the user from the backend.

Use the retrieved data to prefill the Phase 2 prompt dynamically. For example:

"Based on your goal to Build Muscle, a 3/4 workout schedule, and considerations for shoulder pain, we’ve prepared this preview."

3. Transition to Phase 2 (Workout Preview)

Objective: Generate a workout program based on the user's profile.

Steps:

Input the saved user profile data into the Phase 2 prompt for generating a workout preview.

Present the generated preview to the user for review and confirmation.

Once confirmed, convert the workout plan to JSON and save it.

4. Workflow Overview

Phase 1: Collect and save user profile as JSON on the backend.

Phase 2: Retrieve user profile, dynamically customize the workout preview prompt, and save the workout plan upon confirmation.