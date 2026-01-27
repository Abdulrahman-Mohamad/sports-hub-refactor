import { apiFetch } from "@/lib/api/apiFetch";
import { QueryParams } from "@/utils/types/Generic/QueryParams";
import { syncProfileCookies } from "./profileRevalidate";

export const profileUpdateFetch = async (
  data: any,
  { onSuccess, onError }: QueryParams = {},
) => {
  try {
    const formData = new FormData();

    // تحويل البيانات إلى FormData
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    // إضافة _method لتمثيل طلب PUT عبر POST كما هو مطلوب في الـ API
    formData.append("_method", "put");

    const res = await apiFetch("/profile/update", {
      method: "POST",
      body: formData,
    });

    if (res?.status) {
      await syncProfileCookies();
    }

    if (onSuccess) onSuccess(res);
    return res;
  } catch (error) {
    if (onError) onError(error);
  }
};
