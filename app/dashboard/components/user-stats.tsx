"use server";

// import { prisma } from "@/libs/prisma";
import { User } from "@prisma/client";

export default async function UserStats({ user }: { user: User }) {
  return (
    <div className="bg-white dark:text-white dark:bg-black">
      <h6>{user.totalReps}</h6>
      <h6>{user.totalWeight}</h6>
    </div>
  );
}
