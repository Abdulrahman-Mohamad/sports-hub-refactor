import { apiFetch } from "../apiFetch"

export const itCompleteShowFetch = async ()=>{
  try {
    const res = await apiFetch('/it-complete/show',{
      method:'GET'
    })
    return res
  } catch (error) {
    console.error("It Complete Show Fetch Error:",error);
    return null
  }
} 
