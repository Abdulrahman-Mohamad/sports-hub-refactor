import { apiFetch } from "../apiFetch"

export const triviaStartGameFetch = async (use_joker: boolean) => {
  try {
    const res = await apiFetch('/trivia/start-game', {
      method: 'POST',
      body: { use_joker: use_joker ? 1 : 0 }
    })
    return res
  } catch (error) {
    console.error("Trivia Start Game Fetch Error:", error);
    return null
  }
}