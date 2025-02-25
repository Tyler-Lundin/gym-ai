export default function StatusDot({
  status,
}: {
  status: boolean | Promise<boolean>;
}) {
  return (
    <span
      className={`${status ? "bg-green-500" : "bg-red-400"} absolute top-2 right-2 rounded-full w-2 h-2 border border-black`}
    />
  );
}
