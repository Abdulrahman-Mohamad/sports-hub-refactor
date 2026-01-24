import { apiFetch } from "../apiFetch";

export const FixturesShowConfigFetch = async () => {
  try {
    const res = await apiFetch("/fixtures/show-config", {
      method: "GET",
    });
    
    return res;
  } catch (error) {
    console.error("FixturesShowConfigFetch error:", error);
    return null;
  }
};
