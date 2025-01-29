export default function StatusDot({ status }: { status: boolean }) {
  return (
    <span
      className={`${status ? "bg-green-400" : "bg-red-400"} absolute top-2 right-2 rounded-full w-2 h-2 border border-black`}
    />
  );
}
