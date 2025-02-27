"use client";

import { useAtom } from "jotai";
import { appState } from "../atoms";
import { useEffect } from "react";
import { User } from "@prisma/client";

export default function ClientDataLoader({
  serializedUser,
}: {
  serializedUser: string;
}) {
  const [, setApp] = useAtom(appState);
  const user: User = JSON.parse(serializedUser);

  useEffect(() => {
    if (!user) return;
    setApp((app) => ({ ...app, user }));
  }, []);

  return null;
}
