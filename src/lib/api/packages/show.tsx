import { apiFetch } from "../apiFetch";

export const packagesShowFetch = async (id: string) => {
  try {
    const res = await apiFetch(`/packages/show/${id}`, {
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("packages show fetch error:", error);
    return null;
  }
};
