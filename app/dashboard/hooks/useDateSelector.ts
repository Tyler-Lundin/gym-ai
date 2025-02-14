"use client";
import { dashboardState } from "@/app/atoms";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import useTimestamp from "./useTimestamp";
import { isSameDay } from "date-fns";

export default function useDateSelector() {
  const [{ targetDate }, setDashboard] = useAtom(dashboardState);
  const timestamp = useTimestamp();
  const timestampRef = useRef(timestamp);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isToday, setIsToday] = useState<boolean>(true);

  useEffect(() => {
    timestampRef.current = timestamp; // ✅ Always keep the latest timestamp
  }, [timestamp]); // ✅ Runs only when timestamp updates, avoiding unnecessary re-renders

  useEffect(() => {
    const now = new Date();
    setDashboard((state) => ({ ...state, targetDate: now }));
  }, [setDashboard]);

  useEffect(() => {
    if (!targetDate || !timestampRef.current) return;
    setIsToday(isSameDay(targetDate, timestampRef.current));
  }, [targetDate]); // ✅ Only runs when targetDate changes

  function handlePrevious() {
    if (!targetDate) return null;
    const previousDate = new Date(targetDate);
    previousDate.setDate(targetDate.getDate() - 1);
    setDashboard((state) => ({ ...state, targetDate: previousDate }));
  }

  function handleNext() {
    if (!targetDate || !timestamp) return null;
    if (isToday) return null;
    const nextDate = new Date(targetDate);
    nextDate.setDate(targetDate.getDate() + 1);
    setDashboard((state) => ({ ...state, targetDate: nextDate }));
  }

  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }
  function toggle() {
    setIsOpen((state) => !state);
  }

  function jumpToToday() {
    if (!timestamp) return;
    setDashboard((state) => ({ ...state, targetDate: timestamp }));
  }

  return {
    targetDate,
    timestamp,
    isOpen,
    isToday,
    handlePrevious,
    handleNext,
    open,
    close,
    jumpToToday,
    toggle,
  };
}
