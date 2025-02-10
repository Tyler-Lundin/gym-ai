import { InputUsername } from "@/app/(components)/inputs";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { InitializeComponentProps } from "../Initialize";
import { NextButton } from "@/app/dashboard/components/buttons";
import StatusDot from "@/app/dashboard/components/status-dot";

const USERNAME_MIN_LENGTH = 3;

export default function ProfileSetup({
  userData,
  setUserData,
  onNext,
  status,
  message,
  handleClearStatus,
}: InitializeComponentProps) {
  const { username, height, weight } = userData;
  const {
    feet,
    inches,
    // centimeters
  } = height;
  const [invalidUsernames, setInvalidUsernames] = useState<string[]>([]);
  const [usernameGood, setUsernameGood] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status === "LOADING") setIsLoading(true);
    else setIsLoading(false);
  }, [status]);
  useEffect(() => {
    const isGood =
      status !== "ERROR" &&
      message !== "USERNAME INVALID" &&
      username.trim().length > USERNAME_MIN_LENGTH &&
      !invalidUsernames.includes(username.trim());
    setUsernameGood(isGood);
    if (!isGood) setInvalidUsernames((prev) => [...prev, username]);
  }, [username, status, message, invalidUsernames]);

  const handleNext = () => {
    if (!username) {
      alert("Please fill out all fields");
      return;
    }
    onNext();
  };

  const isFeetGood = typeof feet === "number" && feet > 0 && feet < 10;
  const isInchesGood = typeof inches === "number" && inches >= 0 && inches < 12;
  // const isCentimetersGood = typeof centimeters === "number" && centimeters > 45 && centimeters < 250;
  const isHeightGood = isFeetGood && isInchesGood;
  const isWeightGood =
    typeof weight === "number" && weight >= 50 && weight <= 999;

  if (isLoading)
    return (
      <span className="grid place-content-center w-full h-full">
        <BounceLoader />
      </span>
    );

  return (
    <div className="grid relative gap-4 place-content-center place-items-center py-8 w-min">
      <InputUsername
        value={username}
        onChange={(e) => {
          if (!usernameGood && !invalidUsernames.includes(e.target.value))
            handleClearStatus();
          setUserData((prev) => ({
            ...prev,
            username: e.target.value.replace(" ", ""),
          }));
        }}
        toggle={usernameGood}
      />
      <label className="grid w-full">
        <span className="font-black">Height</span>
        <div className="grid relative grid-cols-2 w-full">
          <label className="w-fit">
            <small>Feet</small>
            <input
              className="p-2 w-full text-4xl rounded-lg border border-black"
              value={height.feet}
              type="number"
              onChange={(e) => {
                const feet = Number(e.target.value);
                if (feet < 3) return;
                if (feet > 9) return;
                setUserData((prev) => ({
                  ...prev,
                  height: { ...prev.height, feet },
                }));
              }}
            />
          </label>
          <label className="w-fit">
            <small>inches</small>
            <input
              className="p-2 w-full text-4xl rounded-lg border border-black"
              value={height.inches}
              type="number"
              onChange={(e) => {
                const value = Number(e.target.value);
                if (inches && inches < 0) return;
                setUserData((prev) => ({
                  ...prev,
                  height: { ...prev.height, inches: value },
                }));
              }}
            />
          </label>
          <StatusDot status={isHeightGood} />
        </div>
      </label>

      <label className="grid">
        <span className="font-black">Weight</span>
        <div className="relative">
          <input
            className="p-2 text-4xl rounded-lg border border-black"
            value={typeof weight === "number" && weight > 0 ? weight : ""}
            type="number"
            onChange={(e) => {
              const value = e.target.value;
              // Allow empty input (for selecting all and deleting)
              if (value === "") {
                return setUserData((prev) => ({ ...prev, weight: 0 }));
              }

              // Convert to number and ensure valid range
              let num = Number(value);
              if (isNaN(num) || num < 0) num = 0;
              if (num > 999) return;

              setUserData((prev) => ({ ...prev, weight: num }));
            }}
          />
          <StatusDot status={isWeightGood} />
        </div>
      </label>
      <NextButton
        label="Submit"
        onClick={() => handleNext()}
        isDisabled={!(usernameGood && isWeightGood && isWeightGood)}
      />
    </div>
  );
}
