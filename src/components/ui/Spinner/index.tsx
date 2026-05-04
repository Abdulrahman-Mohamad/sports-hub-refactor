import { ImSpinner4 } from "react-icons/im";
import GradientIcon from "../GradientIcon";

export default function Spinner({ size }: { size?: number }) {
  return (
    <div className="my-4 flex-center">
      <GradientIcon
        icon={ImSpinner4}
        className={`${size ? "" : "size-[3rem]"}  animate-spin`}
        size={size}
      />
    </div>
  );
}
