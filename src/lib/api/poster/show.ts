import { QueryParams } from "@/utils/types/Generic/QueryParams";
import { apiFetch } from "../apiFetch";
import { PosterResponse } from "@/utils/types/Poster";

export const PosterShowFetch = async ({ onSuccess, onError }: QueryParams = {}) => {
  try {
    const res: PosterResponse = await apiFetch('/poster/show', {
      method: 'GET',
      auth: false
    })
    if (onSuccess) onSuccess(res)
    return res
  } catch (error) {
    if (onError) onError(error)
  }
}