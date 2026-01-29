import { ImSpinner4 } from "react-icons/im";
import GradientIcon from "../GradientIcon";

export default function Spinner() {
  return (
    <div className="my-10 flex-center">
      <GradientIcon icon={ImSpinner4} className=" size-[3rem] animate-spin" />
    </div>
  );
}
