import { SignedIn, SignedOut } from "@clerk/nextjs";
import Dashboard from "./(dashboard)/dashboard";
import LandingPage from "./(components)/landing-page";

export default function Index() {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </>
  );
}
