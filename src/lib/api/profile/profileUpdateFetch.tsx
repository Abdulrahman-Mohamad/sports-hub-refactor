import { apiFetch } from "@/lib/api/apiFetch";
import { QueryParams } from "@/utils/types/Generic/QueryParams";

export const profileUpdateFetch = async (
  data: any,
  { onSuccess, onError }: QueryParams = {},
) => {
  try {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    formData.append("_method", "put");

    const res = await apiFetch("/profile/update", {
      method: "POST",
      body: formData,
    });

    if (onSuccess) onSuccess(res);
    return res;
  } catch (error) {
    if (onError) onError(error);
  }
};
