import { HistoryType } from "@/utils/types/History";
import { apiFetch } from "../apiFetch";

export const historyFetch = async (type: HistoryType, date: string) => {
  try {
    const res = await apiFetch(`/history?type=${type}&date=${date}`, {
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("History fetch error:", error);
    return null;
  }
};
