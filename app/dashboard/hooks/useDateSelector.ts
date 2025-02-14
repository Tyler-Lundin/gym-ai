"use client";
import { dashboardState } from "@/app/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import useTimestamp from "./useTimestamp";
import { format, isSameDay } from "date-fns";

export default function useDateSelector() {
  const [{ targetDate }, setDashboard] = useAtom(dashboardState);
  const timestamp = useTimestamp();

  useEffect(() => {
    const now = new Date();
    setDashboard((state) => ({ ...state, targetDate: now }));
  }, []);

  function handlePrevious() {
    if (!targetDate) return null;
    const previousDate = new Date(targetDate);
    previousDate.setDate(targetDate.getDate() - 1);
    setDashboard((state) => ({ ...state, targetDate: previousDate }));
  }

  function handleNext() {
    if (!targetDate || !timestamp) return null;
    if (!isSameDay(targetDate, timestamp)) return null;
    const nextDate = new Date(targetDate);
    nextDate.setDate(targetDate.getDate() + 1);
    setDashboard((state) => ({ ...state, targetDate: nextDate }));
  }

  return {
    targetDate,
    handlePrevious,
    handleNext,
    timestamp,
  };
}
