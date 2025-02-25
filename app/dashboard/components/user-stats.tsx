"use server";

import { UserStats } from "@prisma/client";

export default async function UserStatsComponent({
  stats,
}: {
  stats: UserStats;
}) {
  return (
    <div className="bg-white dark:text-white dark:bg-black">
      <h6>{stats.totalReps}</h6>
      <h6>{stats.totalWeight}</h6>
      <h6>{stats.totalEntries}</h6>
      <h6>{stats.totalWeight}</h6>
      <h6>{stats.heightFt}</h6>
      <h6>{stats.heightIn}</h6>
      <h6>{stats.bodyweightLbs}</h6>
      <h6>{stats.bodyweightKgs}</h6>
      <h6>{stats.mood}</h6>
    </div>
  );
}
