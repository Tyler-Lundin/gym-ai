import { NextButton } from "../../components/buttons";
import StatusDot from "../../components/status-dot";
import { InputUsername } from "@/app/(components)/inputs";
import { InitializeComponentProps } from "..";

export default function ProfileSetup({
  userData,
  setUserData,
  onNext,
  onPrevious,
}: InitializeComponentProps) {
  const { username, height, weight } = userData;
  const { feet, inches } = height;

  const handleNext = () => {
    if (!username) {
      alert("Please fill out all fields");
      return;
    }
    onNext();
  };

  const isUsernameGood = username.length > 3;
  const isFeetGood = height.feet > 0 && height.feet < 10;
  const isInchesGood = height.inches < 13;
  const isWeightGood = isFeetGood && isInchesGood;

  return (
    <div className="grid relative gap-4 place-content-center place-items-center py-8 w-min">
      <InputUsername
        value={username}
        onChange={(e) => {
          setUserData((prev) => ({
            ...prev,
            username: e.target.value.replace(" ", ""),
          }));
        }}
        toggle={isUsernameGood}
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
                if (inches < 0) return;
                setUserData((prev) => ({
                  ...prev,
                  height: { ...prev.height, inches: value },
                }));
              }}
            />
          </label>
          <StatusDot status={isWeightGood} />
        </div>
      </label>

      <label className="grid">
        <span className="font-black">Weight</span>
        <div className="relative">
          <input
            className="p-2 text-4xl rounded-lg border border-black"
            value={weight}
            type="number"
            onChange={(e) => {
              const weight = Number(e.target.value.replace(/^0+/, ""));
              if (weight < 0)
                return setUserData((prev) => ({ ...prev, weight: 0 }));
              setUserData((prev) => ({ ...prev, weight: weight }));
            }}
          />
          <StatusDot status={isWeightGood} />
        </div>
      </label>
      <NextButton
        onClick={() => handleNext()}
        isDisabled={!(isUsernameGood && isWeightGood && isWeightGood)}
      />
    </div>
  );
}
