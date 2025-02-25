import { Prisma, UnitSystem } from "@prisma/client";
import getUnits from "../../util/getUnits";
import { IoMdClose } from "react-icons/io";
import { v4 } from "uuid";
import { useState } from "react";

export default function ExerciseInfo({
  hasExercise,
  entry,
  units,
}: {
  hasExercise: boolean;
  entry: Prisma.EntryGetPayload<{ include: { exercise: true } }>;
  units: UnitSystem;
}) {
  const [isOpen] = useState(false);

  if (hasExercise)
    return (
      <>
        <div className="flex flex-col gap-2 px-1">
          <RepsWeightInfo
            units={units}
            weight={entry.weight}
            reps={entry.reps}
          />
        </div>
        {isOpen && (
          <>
            <MusclesTargetedInfo
              musclesTargeted={entry?.exercise?.musclesTargeted}
            />
            <CategoriesInfo categories={entry?.exercise?.categories} />
          </>
        )}
      </>
    );
}

function RepsWeightInfo({
  weight,
  reps,
  units,
}: {
  weight: number | null;
  reps: number | null;
  units: UnitSystem | null;
}) {
  if (!weight || !reps || !units) return null;
  return (
    <div className="flex gap-2 items-center">
      {weight && (
        <>
          <p className="flex gap-1 place-items-end p-1 text-right rounded-md border border-white/50 text-md aspect-video">
            {weight}
          </p>
          <small className="text-xs">
            {getUnits({ unitSystem: units }).weight}
          </small>
        </>
      )}
      {reps && (
        <>
          <IoMdClose />
          <p className="flex gap-1 place-items-end p-1 text-right rounded-md border border-white/50 text-md aspect-video">
            {reps}
          </p>
          <small className="text-xs">reps</small>
        </>
      )}
    </div>
  );
}

function MusclesTargetedInfo({
  musclesTargeted = [],
}: {
  musclesTargeted: string[] | undefined | null;
}) {
  return (
    <>
      {/* Muscles Targeted */}
      {musclesTargeted && musclesTargeted.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <h6 className="font-semibold">Muscles:</h6>
          {musclesTargeted.map((muscle) => (
            <span
              key={v4()}
              className="px-2 text-sm rounded-lg border border-white"
            >
              {muscle}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

function CategoriesInfo({ categories }: { categories: string[] | undefined }) {
  return (
    <>
      {/* Exercise Categories */}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <h6 className="font-semibold">Categories:</h6>
          {categories.map((category) => (
            <span
              key={v4()}
              className="px-2 text-sm rounded-lg border border-white"
            >
              {category}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
