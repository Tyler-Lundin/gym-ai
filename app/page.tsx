import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Dashboard from "./(dashboard)/dashboard";
import { Titillium_Web, Zen_Antique, Zen_Antique_Soft } from "next/font/google";
import { RiHexagonFill } from "react-icons/ri";
import Background from "./background";

// it says tit so I picked it - no joke
const logoFont = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function Index() {
  return (
    <Background>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </Background>
  );
}

function LandingPage() {
  return (
    <div className="grid fixed top-0 right-0 bottom-0 left-0 place-content-center bg-gradient-to-bl bg-neutral-950/20">
      <div className="p-10 rounded-lg border-2 bg-black/20 backdrop-blur-sm border-white/50">
        <LogoMain />
        <div
          style={logoFont.style}
          className="grid place-content-center py-2 px-8 text-6xl font-bold text-white bg-green-800 rounded-md border-4 border-black/40"
        >
          <SignInButton />
        </div>
        <Questions />
      </div>
    </div>
  );
}

export function LogoMain() {
  const APPNAME = "Fitz";
  return (
    <span className="grid relative grid-flow-col w-min h-min">
      <h6 style={logoFont.style} className="text-6xl font-black text-white">
        {APPNAME}
      </h6>
      <RiHexagonFill className="absolute right-0 bottom-1 text-4xl translate-x-full text-neutral-200" />
      <RiHexagonFill className="absolute right-0 bottom-1 text-4xl translate-y-1/4 translate-x-[150%] scale-50 text-red-500" />
    </span>
  );
}

export function Questions() {
  return (
    <div
      style={logoFont.style}
      className="absolute -bottom-4 left-1/2 p-4 w-full uppercase rounded-lg border-2 -translate-x-1/2 translate-y-full border-white/50 bg-black/50 backdrop-blur-lg"
    >
      Questions?
    </div>
  );
}
