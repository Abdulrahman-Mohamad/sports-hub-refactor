import { QueryParams } from "@/utils/types/Generic/QueryParams";
import { apiFetch } from "../apiFetch";

export const resendOTPFetch = async ({ onSuccess, onError }: QueryParams) => {
  try {
    const response = await apiFetch("/auth/resend-otp", {
      method: "POST",
      auth: true,
    });
    if (onSuccess) onSuccess(response);
    return response;
  } catch (error) {
    if (onError) onError(error);
  }
};
