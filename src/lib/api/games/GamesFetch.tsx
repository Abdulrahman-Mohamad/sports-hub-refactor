import { apiFetch } from "../apiFetch";

export const gamesFetch = async () => {
  try {
    const res = await apiFetch("/games", {
      method: "GET",
    });
    
    return res;
  } catch (error) {
    console.error("Games fetch error:", error);
    return null;
  }
};
