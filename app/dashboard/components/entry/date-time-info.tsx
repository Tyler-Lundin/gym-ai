import { format } from "date-fns";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "200", "800"],
});

export default function DateTimeInformation({
  createdAt,
}: {
  createdAt: Date | null;
}) {
  if (!createdAt) return null;
  return (
    <div
      style={font.style}
      className="flex absolute top-0 right-0 left-0 gap-2 justify-between justify-self-center pb-2 text-sm text-gray-300 w-fit"
    >
      <small className="font-thin uppercase whitespace-nowrap">
        {format(new Date(createdAt), "MM/dd/yy")}
      </small>
      <small className="font-thin uppercase whitespace-nowrap">
        {format(new Date(createdAt), "hh:mm:ss aa")}
      </small>
    </div>
  );
}
