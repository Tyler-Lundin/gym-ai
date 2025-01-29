"use client";
import { InputGoal } from "@/app/(components)/inputs";
import { useState } from "react";
import { InitializeComponentProps } from "..";
import { NextButton } from "../../components/buttons";

export default function GoalsSetup(props: InitializeComponentProps) {
  const [input, setInput] = useState<string>("");

  const handleSubmit = () => {
    setInput("");
    props.setUserData((prev) => ({
      ...prev,
      goals: [
        ...props.userData.goals,
        { description: input, targetDate: new Date().toString() },
      ],
    }));
  };

  return (
    <div className="grid relative gap-4 place-content-center place-items-center py-8 w-min">
      <InputGoal
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Return") {
            e.preventDefault();
            handleSubmit();
          }
        }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        toggle={input.length < 50 && input.length > 4}
      />
      {props.userData.goals.map((goal, index) => {
        return <p key={`goal-${index}`}>{goal.description}</p>;
      })}
      <NextButton onClick={props.onNext} />
    </div>
  );
}
