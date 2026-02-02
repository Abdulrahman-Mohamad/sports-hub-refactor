import { apiFetch } from "../apiFetch";

export const fetchSupportMessages = async (page: number = 1) => {
  const res = await apiFetch(`/support-messages?page=${page}`,{
    method:"GET",
    cache:"no-store"
  });

  return res
}