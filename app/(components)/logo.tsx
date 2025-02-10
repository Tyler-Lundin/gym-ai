import { Roboto } from "next/font/google";

const logoFont = Roboto({ weight: ["100", "700"], subsets: ["latin"] });

export default function Logo() {
  return (
    <div className="flex items-center">
      <h1 style={logoFont.style} className="font-thin text-white">
        Zen
      </h1>
      <h1 style={logoFont.style} className="font-black text-white">
        Log
      </h1>
    </div>
  );
}
