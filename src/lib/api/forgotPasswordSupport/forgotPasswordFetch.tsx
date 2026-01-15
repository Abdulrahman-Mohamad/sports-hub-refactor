import { QueryParams } from "@/utils/types/Generic/QueryParams";
import { apiFetch } from "../apiFetch";

export const forgotPasswordFetch = async (
  data: any,
  { onSuccess, onError }: QueryParams
) => {
  try {
    const response = await apiFetch("/forgot-password/send", {
      method: "POST",
      body: data,
      auth: false,
    });
    if (onSuccess) onSuccess(response);
    return response;
  } catch (error) {
    if (onError) onError(error);
  }
};
