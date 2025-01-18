import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Dashboard from "./(dashboard)/dashboard";

export default function Index() {
  return (
    <div>
      <SignedOut>
        GYM-AI
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </div>
  );
}
