import { QueryParams } from "@/utils/types/Generic/QueryParams";
import { apiFetch } from "../apiFetch";

export const PackageVerifyPINCodeFetch = async (
  data: { pin_code: string },
  { onSuccess, onError }: QueryParams,
) => {
  try {
    const res = await apiFetch("/packages/verify-pin-code", {
      method: "POST",
      body: data,
    });
    if (onSuccess) onSuccess(res);
    return res
  } catch (error) {
    if (onError) onError(error);
  }
};
