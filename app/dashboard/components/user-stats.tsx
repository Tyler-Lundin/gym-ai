"use server";

import { UserStats } from "@prisma/client";

export default async function UserStatsComponent({
  stats,
}: {
  stats: UserStats;
}) {
  const renderStat = (label: string, value: string | number | null) => {
    if (value === null || value === undefined) return null;
    return (
      <div className="flex justify-between items-center px-4 w-full border-b border-b-black/25 dark:border-b-white/25">
        <h6 className="text-lg font-semibold">{label}</h6>
        <span className="text-lg">{value}</span>
      </div>
    );
  };

  return (
    <div className="absolute top-1/2 left-1/2 p-8 w-full bg-white rounded-lg -translate-x-1/2 -translate-y-1/2 dark:text-white/75 dark:bg-black/75">
      <h1> Stats </h1>
      {renderStat("Total Reps", stats.totalReps)}
      {renderStat("Total Weight", stats.totalWeight)}
      {renderStat("Total Entries", stats.totalEntries)}
      {renderStat("Height (Ft)", stats.heightFt)}
      {renderStat("Height (In)", stats.heightIn)}
      {renderStat("Bodyweight (Lbs)", stats.bodyweightLbs)}
      {renderStat("Bodyweight (Kgs)", stats.bodyweightKgs)}
      {renderStat("Mood", stats.mood)}
    </div>
  );
}
