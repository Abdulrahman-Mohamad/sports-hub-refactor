import { apiFetch } from "../apiFetch"

export const itCompleteStartGameFetch = async (use_joker: boolean) => {
  try {
    const jokerValue = use_joker ? 1 : 0;
    const res = await apiFetch(`/it-complete/start-game?use_joker=${jokerValue}`, {
      method: 'GET'
    })
    return res
  } catch (error) {
    console.error("It Complete Start Game Fetch Error:", error);
    return null
  }
}
