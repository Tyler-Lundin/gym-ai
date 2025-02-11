import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { RiArrowRightLine, RiHexagonFill } from "react-icons/ri";
import { Titillium_Web } from "next/font/google";
import SignUpButton from "./sign-up-button";
import Logo from "./logo";

// it says tit so I picked it - no joke
const logoFont = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default async function LandingPage() {
  const user = await currentUser();
  if (user) redirect("/create-profile");

  return (
    <div className="grid fixed top-0 right-0 bottom-0 left-0 place-content-center bg-gradient-to-bl bg-neutral-950/20">
      <div className="grid z-40 gap-8 p-10 rounded-lg border-2 bg-black/70 backdrop-blur-sm border-white/50">
        <LogoMain />
        <SignUpButton />
        <Questions />
      </div>
    </div>
  );
}

export function LogoMain() {
  return (
    <span className="grid relative grid-flow-col w-min h-min">
      <Logo />
      <RiHexagonFill className="absolute right-0 bottom-1 translate-x-full text-neutral-200" />
    </span>
  );
}

export function Questions() {
  return (
    <div
      style={logoFont.style}
      className="grid absolute -bottom-4 left-1/2 grid-flow-col justify-between items-center p-4 w-full uppercase rounded-lg border-2 -translate-x-1/2 translate-y-full cursor-pointer border-white/50 bg-black/50 backdrop-blur-lg"
    >
      QUESTIONS?
      <RiArrowRightLine className="text-2xl" />
    </div>
  );
}
