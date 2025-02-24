"use server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { RiArrowRightLine } from "react-icons/ri";
import { Tilt_Neon } from "next/font/google";
import SignUpButton from "./sign-up-button";
import Background from "./background";
import LogoMain from "./logo-main";

const font = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function LandingPage() {
  const user = await currentUser();
  if (user) redirect("/create-profile");

  return (
    <Background>
      <div className="grid fixed top-0 left-0 place-content-center w-screen h-screen bg-neutral-950/20">
        <div className="grid z-40 gap-4 p-2 rounded-lg border-2 md:p-10 bg-black/70 backdrop-blur-sm border-white/25">
          <LogoMain />
          <SignUpButton />
          <Questions />
        </div>
      </div>
    </Background>
  );
}

export async function Questions() {
  return (
    <div
      style={font.style}
      className="grid absolute -bottom-4 left-1/2 grid-flow-col justify-between items-center p-4 w-full uppercase rounded-lg border-2 -translate-x-1/2 translate-y-full cursor-pointer border-white/50 bg-black/50 backdrop-blur-lg"
    >
      QUESTIONS?
      <RiArrowRightLine className="text-2xl" />
    </div>
  );
}
