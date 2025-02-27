"use server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Tilt_Neon } from "next/font/google";
import Background from "./background";
import LogoMain from "./logo-main";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

import { Playwrite_IT_Moderna } from "next/font/google";

const fontb = Playwrite_IT_Moderna({
  weight: ["100", "200", "300"],
});

const font = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function LandingPage() {
  const user = await currentUser();
  if (user) redirect("/create-profile");

  return (
    <Background>
      <div className="grid fixed top-0 left-0 place-content-center w-screen h-dvh bg-neutral-950/20">
        <span className="absolute top-4 left-1/2 -translate-x-1/2">
          <LogoMain />
        </span>

        {/* AI-Powered Gym Logging Info */}
        <div className="p-1 text-center text-white rounded-lg">
          <div className="grid z-40 gap-4 p-4 bg-white rounded-lg border-2 md:p-10 dark:bg-black backdrop-blur-lg border-white/25">
            <h1 style={fontb.style} className="text-xl font-bold">
              Welcome to Zen Log
            </h1>
            <span className="grid">
              <SignInButton
                mode="modal"
                children={
                  <div className="sleek-border">
                    <button className="py-2 w-full text-3xl font-bold bg-white rounded-lg border dark:bg-black border-black/25 dark:border-white/25">
                      Sign In
                    </button>
                  </div>
                }
              />
              or
              <SignUpButton
                mode="modal"
                children={
                  <div className="sleek-border invert">
                    <button className="py-2 w-full text-3xl font-bold rounded-lg border dark:bg-black invert border-black/25 bg-white/90 dark:border-white/25">
                      Sign Up
                    </button>
                  </div>
                }
              />
            </span>
            <p
              style={font.style}
              className="mx-auto max-w-md text-sm text-neutral-300"
            >
              AI-driven gym logging and workout scheduling. Train smarter, track
              progress effortlessly, and let ZenLog optimize your strength
              journey.
            </p>
          </div>
        </div>
      </div>
    </Background>
  );
}
