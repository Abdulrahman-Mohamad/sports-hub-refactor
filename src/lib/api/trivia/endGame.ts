import { apiFetch } from "../apiFetch"

export const triviaEndGameFetch = async (data: any) => {
  try {
    const res = await apiFetch('/trivia/end-game', {
      method: 'POST',
      body: data
    })
    return res
  } catch (error) {
    console.error("Trivia End Game Error:", error)
    return null
  }
}