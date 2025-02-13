import { InputUsername } from "@/app/(components)/inputs";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { InitializeComponentProps } from "../Initialize";
import { NextButton } from "@/app/dashboard/components/buttons";
import HeightInput from "../height-input";
import useUsernameValidation from "../../hooks/useUsernameValidation";
import WeightInput from "../weight-input";
import useHeightWeightValidation from "../../hooks/useHeightWeightValidation";

export default function ProfileSetup({
  userData,
  setUserData,
  onNext,
  status,
  message,
  handleClearStatus,
}: InitializeComponentProps) {
  const { username, height, weight } = userData;
  const { feet, inches } = height;
  const [invalidUsernames, setInvalidUsernames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isUsernameValid = useUsernameValidation(
    username,
    status,
    message,
    invalidUsernames,
    setInvalidUsernames,
  );
  const {
    isHeightValid,
    // isFeetValid,
    // isInchesValid,
    isWeightValid,
  } = useHeightWeightValidation(feet, inches, weight);

  useEffect(() => {
    setIsLoading(status === "LOADING");
  }, [status]);

  const handleNext = () => {
    if (!username) {
      alert("Please fill out all fields");
      return;
    }
    onNext();
  };

  if (isLoading)
    return (
      <span className="grid place-content-center w-full h-full">
        <BounceLoader />
      </span>
    );

  return (
    <div className="grid gap-8 p-4 w-screen bg-gradient-to-tr from-neutral-300 via-neutral-200 to-neutral-300">
      <InputUsername
        value={username}
        onChange={(e) => {
          if (!isUsernameValid && !invalidUsernames.includes(e.target.value))
            handleClearStatus();
          setUserData((prev) => ({
            ...prev,
            username: e.target.value.replace(" ", ""),
          }));
        }}
        toggle={isUsernameValid}
      />

      <HeightInput
        setUserData={setUserData}
        status={isHeightValid}
        userData={userData}
      />

      <WeightInput
        setUserData={setUserData}
        status={isWeightValid}
        userData={userData}
      />

      <NextButton
        label="Submit"
        onClick={handleNext}
        isDisabled={!(isUsernameValid && isHeightValid && isWeightValid)}
      />
    </div>
  );
}
