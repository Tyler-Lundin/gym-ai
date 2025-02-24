import { Playwrite_IT_Moderna } from "next/font/google";

const font = Playwrite_IT_Moderna({
  weight: ["100", "200", "300"],
});

export default function Logo() {
  return (
    <div className="flex items-center text-3xl">
      <h1 style={font.style} className="font-thin text-white">
        Zen
      </h1>
      <h1 style={font.style} className="font-black text-red-500">
        Log
      </h1>
    </div>
  );
}
