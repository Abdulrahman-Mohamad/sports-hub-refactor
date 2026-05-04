import { apiFetch } from "../apiFetch"

export const itCompleteEndGameFetch = async (data: any) => {
  try {
    const res = await apiFetch('/it-complete/end-game', {
      method: 'POST',
      body: data
    })
    return res
  } catch (error) {
    console.error("It Complete End Game Error:", error)
    throw error;
  }
}
