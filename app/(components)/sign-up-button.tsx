"use client";
import { useClerk } from "@clerk/nextjs";
import { RiArrowRightLine } from "react-icons/ri";
import { Titillium_Web } from "next/font/google";

// it says tit so I picked it - no joke
const logoFont = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function SignUpButton() {
  const clerk = useClerk();
  return (
    <button onClick={() => clerk.openSignUp()} style={logoFont.style}>
      <span className="grid z-50 grid-flow-col gap-6 justify-between items-center place-content-center py-2 px-8 text-4xl font-bold bg-green-500 rounded-md border-4 transition-all cursor-pointer hover:text-white hover:bg-green-800 hover:scale-105 focus:text-white focus:bg-green-800 focus:scale-105 focus:outline-none text-green-950 border-black/40">
        Get Started <RiArrowRightLine className="text-2xl" />
      </span>
    </button>
  );
}
