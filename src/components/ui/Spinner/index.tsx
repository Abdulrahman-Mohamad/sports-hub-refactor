import React from "react";
import { ImSpinner3 } from "react-icons/im";

export default function Spinner({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="animate-spin h-10 w-10 text-primary">
        <ImSpinner3 />
      </div>
    </div>
  );
}
