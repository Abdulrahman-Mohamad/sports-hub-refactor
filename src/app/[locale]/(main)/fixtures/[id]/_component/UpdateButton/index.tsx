'use client'

import { useRouter } from "next/navigation"
import { IoReload } from "react-icons/io5"
import { toast } from "react-toastify"

export default function HighlightUpdateButton() {
const router = useRouter()
const handleUpdate = () => {
    router.refresh();
    toast.success("Data Has Been Updated");
  };
  return (
    <>
    <button
              type="button"
              onClick={handleUpdate}
              className="p-2 flex items-center gap-2 text-redA1 font-medium"
            >
              <span>
                <IoReload size={22} />
              </span>
              <span className="hidden md:block">Update</span>
            </button>
    </>
  )
}