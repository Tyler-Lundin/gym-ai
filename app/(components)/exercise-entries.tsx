export default function ExerciseEntries({ workoutId }: { workoutId: string }) {
  return (
    <div className="relative p-4 m-4 rounded-lg border border-black">
      <div
        id="HEADER"
        className="flex relative top-0 right-0 left-0 justify-between items-center pb-4 border-b border-b-black"
      >
        <h4 className="text-2xl font-bold"> {/*name*/} </h4>
        <small className="text-lg">
          {/*date && format(date, 'MM-dd-yyyy - hh:mm aa')*/}
        </small>
      </div>
      <div className="relative gap-8 py-4"></div>
    </div>
  );
}
