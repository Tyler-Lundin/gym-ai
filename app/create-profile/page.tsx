"use server";
import CreateProfile from "./components/create-profile";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CreateProfilePage() {
  const authUser = await currentUser();
  if (!authUser) redirect("/landing");
  return <CreateProfile />;
}
