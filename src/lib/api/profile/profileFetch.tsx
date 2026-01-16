import { QueryParams } from "@/utils/types/Generic/QueryParams";
import { apiFetch } from "../apiFetch";



export const profileFetch = async ({onSuccess, onError}:QueryParams = {}) => {
  try {
    const res =await apiFetch('/profile/show',{
      method:'GET'
    })
    if(onSuccess) onSuccess(res)
      return res
  } catch (error) {
    if(onError) onError(error)
  }
}