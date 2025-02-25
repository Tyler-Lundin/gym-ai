"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useNotification from "@/app/(hooks)/useNotification";
import { useAtom } from "jotai";
import { createProfileState } from "@/app/atoms";

const isValidLength = (username: string | null): boolean =>
  !!username && username.length > 4 && username.length <= 20;

const fetcher = (url: string, username: string) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify({ username }),
  }).then((res) => res.json());

export default function useUsernameStatus() {
  const [{ username }] = useAtom(createProfileState);
  const [debouncedUsername, setDebouncedUsername] = useState("");
  const { sendNotification } = useNotification();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!username) return;

    setIsTyping(true);
    const handler = setTimeout(() => {
      setDebouncedUsername(username);
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(handler);
  }, [username]);

  const { data, error, isValidating, isLoading } = useSWR<{
    message: string;
    status: "good" | "bad";
  }>(
    debouncedUsername && debouncedUsername.length > 4
      ? [`/api/username/validate`, debouncedUsername]
      : null,
    ([url]) => fetcher(url, debouncedUsername),
    { revalidateOnFocus: false },
  );

  useEffect(() => {
    if (!data?.status || !data?.message) return;
    sendNotification(
      data.message,
      data.status === "good" ? "SUCCESS" : "ERROR",
    );
  }, [data]);

  return {
    status:
      !!data &&
      data?.status === "good" &&
      isValidLength(username) &&
      !isLoading &&
      !isValidating &&
      !isTyping,
    isLoading,
  };
}
