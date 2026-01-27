import { apiFetch } from "@/lib/api/apiFetch";
import { QueryParams } from "@/utils/types/Generic/QueryParams";

export const profileChangePasswordFetch = async (
  data: any,
  { onSuccess, onError }: QueryParams = {},
) => {
  try {
    const res = await apiFetch("/profile/change-password", {
      method: "PUT",
      body: data,
    });

    if (onSuccess) onSuccess(res);
    return res;
  } catch (error) {
    if (onError) onError(error);
  }
};
