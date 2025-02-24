import { RiHexagonFill } from "react-icons/ri";
import Logo from "./logo";

export default function LogoMain() {
  return (
    <span className="grid relative grid-flow-col justify-self-center w-min h-min">
      <Logo />
      <RiHexagonFill className="absolute right-0 bottom-1 text-red-500 translate-x-full" />
    </span>
  );
}
