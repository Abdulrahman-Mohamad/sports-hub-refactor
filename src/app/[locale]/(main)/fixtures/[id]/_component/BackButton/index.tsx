"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function HighlightBackButton() {
  const router = useRouter();
  return (
    <>
      <button
        type="button"
        onClick={() => router.back()}
        className="p-2 flex items-center gap-2 font-medium"
      >
        <IoIosArrowBack size={22} />
        <span className="hidden md:block">Back</span>
      </button>
    </>
  );
}
