import { apiFetch } from "../apiFetch";

export const termsFetch = async () => {
  try {
    const res = await apiFetch("/term-conditions", {
      method: "GET",
    });
    
    return res;
  } catch (error) {
    console.error("Terms fetch error:", error);
    return null;
  }
};
