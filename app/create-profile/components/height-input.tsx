import StatusDot from "@/app/dashboard/components/status-dot";
import { InitializeComponentProps } from "./Initialize";

interface HeightInputProps {
  userData: InitializeComponentProps["userData"];
  setUserData: InitializeComponentProps["setUserData"];
  status: boolean;
}

export default function HeightInput({
  userData: { height },
  status,
  setUserData,
}: HeightInputProps) {
  return (
    <label className="grid w-full">
      <span className="font-black">Height</span>
      <div className="grid relative grid-flow-col w-full">
        <label className="w-fit">
          <small>Feet</small>
          <input
            className="p-2 w-full text-xl rounded-lg border border-black md:text-4xl"
            value={height.feet}
            type="number"
            onChange={(e) => {
              const feet = Number(e.target.value);
              if (feet < 3 || feet > 9) return;
              setUserData((prev) => ({
                ...prev,
                height: { ...prev.height, feet },
              }));
            }}
          />
        </label>
        <label className="w-fit">
          <small>Inches</small>
          <input
            className="p-2 w-full text-xl rounded-lg border border-black md:text-4xl"
            value={height.inches}
            type="number"
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value < 0) return;
              setUserData((prev) => ({
                ...prev,
                height: { ...prev.height, inches: value },
              }));
            }}
          />
        </label>
        <StatusDot status={status} />
      </div>
    </label>
  );
}
