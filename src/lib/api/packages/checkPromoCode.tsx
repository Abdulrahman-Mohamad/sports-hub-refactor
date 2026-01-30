import { QueryParams } from "@/utils/types/Generic/QueryParams";
import { apiFetch } from "../apiFetch";


export const checkPromoCodeFetch = async (
  data: { code: string; package_id: number },
  { onSuccess, onError }: QueryParams
) => {
  try {
    const response = await apiFetch("/packages/check-promo-code", {
      method: "POST",
      body: data,
    });
    if (onSuccess) onSuccess(response);
    return response;
  } catch (error) {
    if (onError) onError(error);
  }
};