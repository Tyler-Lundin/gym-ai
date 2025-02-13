"use server";

import { currentUser } from "@clerk/nextjs/server";
import { getUserProfile } from "./profileActions";

export async function getUserId() {
  const auth = await currentUser();
  if (!auth) return null;

  const { id: authId, primaryEmailAddress } = auth;
  const email = primaryEmailAddress?.emailAddress;
  if (!email) return null;

  const user = await getUserProfile({ authId, email });
  if (!user) return null;
  const userId = user.id;
  return userId;
}
