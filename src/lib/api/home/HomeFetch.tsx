// src/lib/api/home/homeFetch.ts
import { apiFetch } from "../apiFetch";

export const homeFetch = async () => {
  try {
    const res = await apiFetch("/home", {
      method: "GET",
      auth: false,
    });
    
    return res;
  } catch (error) {
    console.error("Home fetch error:", error);
    return null;
  }
};
