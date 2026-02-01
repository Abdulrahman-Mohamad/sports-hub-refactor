import { QueryParams } from "@/utils/types/Generic/QueryParams";
import { apiFetch } from "../apiFetch";


export const pointsFetch = async ({onSuccess,onError}:QueryParams ={})=>{
try {
  const res = await apiFetch("/profile/show-points",{
    method:"GET",
  });
  if(onSuccess) onSuccess(res);
  return res;
} catch (error) {
  if(onError) onError(error);
  throw error
}
}