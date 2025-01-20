MVP Plan: AI-Powered Workout App

Objective
Build a web-based app where users can chat with an AI to generate a personalized workout. Users can review and save the workout, which gets converted into a structured JSON. The app will then display the workout on a dedicated page, allowing users to log their progress (e.g., weights and reps).

**Macro Plan for Data Flow and Work Breakdown Structure (WBS)**

---

### **Data Flow Plan**
#### **1. User Input Phase**
- **Source**: Chatbox on the "Chat with AI" page.  
- **Data Captured**:
  - Fitness goals
  - Workout frequency
  - Workout limiters (e.g., equipment availability, injuries)
- **Process**:
  - User input is collected and sent to the backend for processing via OpenAI’s API.

#### **2. LLM Workout Generation Phase**
- **Source**: OpenAI API response.
- **Data Processed**:
  - Convert LLM response into structured JSON.
  - JSON Schema:  
    {
      "workoutName": "",
      "goal": "",
      "exercises": [
        {
          "name": "",
          "targetMuscleGroup": "",
          "sets": 0,
          "reps": 0,
          "weightRecommendation": "",
          "restPeriod": "",
          "instructions": ""
        }
      ]
    }
- **Storage**: Save JSON in localStorage.

#### **3. Display Phase**
- **Source**: Workout JSON data from localStorage.
- **Data Processed**:
  - Dynamically generate HTML for workout structure (days, exercises, etc.).
  - Include input fields for user progress logging (e.g., reps, weights, times).

#### **4. Logging Phase**
- **Source**: User-entered data in the input fields on the Workout Logging Page.
- **Process**:
  - Update the workout JSON with logged data (e.g., reps and weights).
  - Save updated JSON back to localStorage.

---

### **Work Breakdown Structure (WBS)**

#### **1. Frontend: Chatbox**
**Feature**: Create a chatbox UI for user interaction.  
**Tasks**:
- Design the input field for user prompts.
- Add a button to send the prompt to the LLM.
- Display LLM responses dynamically in the chatbox.
**Technologies**: HTML, CSS, JavaScript.

#### **2. LLM API Integration**
**Feature**: Connect the chatbox to OpenAI’s API.  
**Tasks**:
- Set up API requests using fetch() or axios.
- Process LLM responses, including validation and error handling.
- Implement sample prompts to ensure structured outputs.
**Technologies**: OpenAI GPT-3.5/4 API.

#### **3. Save Workout to JSON**
**Feature**: Convert the LLM response into structured JSON.  
**Tasks**:
- Design the JSON schema for workouts.
- Write a function to parse LLM responses into JSON.
- Validate JSON structure for required fields (e.g., "name," "sets," "reps").
- Save JSON to localStorage.
**Technologies**: JavaScript.

#### **4. Workout Display Page**
**Feature**: Create a page to display the workout and log progress.  
**Tasks**:
- Retrieve workout JSON data from localStorage.
- Dynamically generate HTML for workout days and exercises.
- Add input fields for users to log weights and reps.
- Include a "Save Progress" button to update localStorage.
**Technologies**: JavaScript, HTML, CSS.

#### **5. Navigation**
**Feature**: Navigate between chat and workout pages.  
**Tasks**:
- Redirect the user from the chatbox to the Workout Display Page after saving.
- Add a simple navbar or back button for navigation.
**Technologies**: JavaScript.

#### **6. Local Data Persistence**
**Feature**: Use localStorage to save workouts and user logs.  
**Tasks**:
- Save workout JSON to localStorage after generation.
- Retrieve and update workout logs.
**Technologies**: JavaScript.

---

### **Data Flow Diagram Description**
1. **Chatbox UI**:
   - User inputs -> Sent to LLM API -> Receives JSON workout data.
2. **Backend (API)**:
   - Receives prompt -> Processes request -> Sends structured response.
3. **LocalStorage**:
   - Stores JSON -> Updates with logged data.
4. **Workout Display Page**:
   - Retrieves JSON -> Displays dynamically -> Accepts user logs.
5. **Navigation**:
   - Redirect between Chatbox and Workout Pages seamlessly.

---

### **Outcome**
This plan ensures clear separation of responsibilities between UI components, API integration, and data persistence. The WBS provides a roadmap for systematic development while the data flow clarifies interactions between components and phases.
