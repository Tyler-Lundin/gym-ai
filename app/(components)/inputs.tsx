import { ChangeEventHandler, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // value: any;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggle: boolean;
  label?: string;
}

function Input({ label, toggle, ...props }: InputProps) {
  return (
    <label className="grid">
      <span className="font-black">{label}</span>
      <div className="relative">
        <input
          {...props}
          className="p-2 text-4xl rounded-lg border border-black"
        />
        <span
          className={`${toggle ? "bg-green-400" : "bg-red-400"} absolute top-2 right-2 rounded-full w-2 h-2 border border-black`}
        />
      </div>
    </label>
  );
}

export const InputUsername = (props: InputProps) => (
  <Input {...props} label="Username" />
);

export const InputGoal = (props: InputProps) => (
  <Input {...props} label="Goal" />
);
