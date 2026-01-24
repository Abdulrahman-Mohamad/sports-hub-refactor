import { apiFetch } from "../apiFetch";

export const HelpDataFetch = async () => {
  try {
    const res = await apiFetch("/fixtures/help-data", {
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Fixtures help data fetch error:", error);
    return null;
  }
};