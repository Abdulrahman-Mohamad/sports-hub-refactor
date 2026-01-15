import { apiFetch } from "@/lib/api/apiFetch";
import { QueryParams } from "@/utils/types/Generic/QueryParams";

export const loginFetch = async (
  data: any,
  { onSuccess, onError }: QueryParams = {}
) => {
  try {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: data,
      auth: false,
    });
    if (onSuccess) onSuccess(res);
    return res;
  } catch (error) {
    if (onError) onError(error);
  }
};
