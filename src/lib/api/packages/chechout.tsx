import { QueryParams } from "@/utils/types/Generic/QueryParams";
import { apiFetch } from "../apiFetch";

export const packagesCheckoutFetch = async (
  data: {
    package_id: number;
    payment_method_id: number;
    promo_code_id: number;
    channel_id: string;
    click_id?: string | null;
  },
  { onSuccess, onError }: QueryParams,
) => {
  try {
    const res = await apiFetch("/packages/checkout",{
      method:"POST",
      body:data
    });
    if(onSuccess) onSuccess(res)
      return res
  } catch (error) {
    if(onError) onError(error)
  }
};
