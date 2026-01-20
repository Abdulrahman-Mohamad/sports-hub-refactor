import { apiFetch } from "../apiFetch";

export const packagesFetch = async () => {
  try {
    const res = await apiFetch("/packages", {
      method: "GET",
    });
    
    return res;
  } catch (error) {
    console.error("Packages fetch error:", error);
    return null;
  }
};
