import { apiFetch } from "../apiFetch"

export const triviaShowFetch = async ()=>{
  try {
    const res = await apiFetch('/trivia/show',{
      method:'GET'
    })
    return res
  } catch (error) {
    console.error("Trivia Show Fetch Error:",error);
    return null
  }
} 