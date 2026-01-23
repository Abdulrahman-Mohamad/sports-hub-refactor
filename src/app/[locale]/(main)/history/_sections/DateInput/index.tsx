"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function HistoryDateInput({
  currentDate,
}: {
  currentDate: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (!selectedDate) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("date", selectedDate);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <>
        <input
          type="date"
          value={currentDate}
          onChange={handleDateChange}
          className="my-8 p-2 rounded-lg bg-white"
        />
    </>
  );
}
