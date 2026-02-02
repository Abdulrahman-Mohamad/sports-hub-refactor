import { QueryParams } from "@/utils/types/Generic/QueryParams"
import { apiFetch } from "../apiFetch"

export const sendMessagesFetch = async (
  message: string,
  { onSuccess, onError }: QueryParams = {}
) => {
  try {
    const res = await apiFetch("/support-messages/send", {
      method: "POST",
      body: { message }
    })
    if (onSuccess) onSuccess(res);
    return res
  } catch (error) {
    if (onError) onError(error)
    throw error
  }

}