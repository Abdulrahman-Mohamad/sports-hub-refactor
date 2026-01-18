import { QueryParams } from "@/utils/types/Generic/QueryParams";
import { apiFetch } from "../apiFetch";

export const verifyOTPFetch = async (
  data: { pin_code: string; transaction_id: string | null },
  { onSuccess, onError }: QueryParams,
) => {
  try {
    const response = await apiFetch("/auth/verify-otp", {
      method: "POST",
      body: data,
      auth: true,
    });
    if (onSuccess) onSuccess(response);
    return response;
  } catch (error) {
    if (onError) onError(error);
  }
};
