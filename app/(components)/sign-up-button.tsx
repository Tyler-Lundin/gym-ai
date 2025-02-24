"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpButton() {
  return (
    <span className="invert">
      <SignUp
        routing="hash"
        fallbackRedirectUrl="/"
        signInFallbackRedirectUrl="/create-profile"
      />
    </span>
  );
}
