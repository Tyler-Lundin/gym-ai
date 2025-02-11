import StatusDot from "@/app/dashboard/components/status-dot";
import { InitializeComponentProps } from "./Initialize";

interface WeightInputProps {
  userData: InitializeComponentProps["userData"];
  setUserData: InitializeComponentProps["setUserData"];
  status: boolean;
}

export default function WeightInput({
  userData: { weight },
  setUserData,
  status,
}: WeightInputProps) {
  return (
    <label className="grid">
      <span className="font-black">Weight</span>
      <div className="relative">
        <input
          className="p-2 w-full text-xl rounded-lg border border-black md:text-4xl"
          value={weight > 0 ? weight : ""}
          type="number"
          onChange={(e) => {
            const value = e.target.value;
            if (value === "")
              return setUserData((prev) => ({ ...prev, weight: 0 }));
            let num = Number(value);
            if (isNaN(num) || num < 0) num = 0;
            if (num > 999) return;
            setUserData((prev) => ({ ...prev, weight: num }));
          }}
        />
        <StatusDot status={status} />
      </div>
    </label>
  );
}
