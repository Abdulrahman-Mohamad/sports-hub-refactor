import { apiFetch } from "../apiFetch"

export const makePredictionFetch = async (data: {
  use_joker: number,
  fixture_id: number,
  home_score: number,
  away_score: number
}) => {
  try {
    const res = await apiFetch('/fixtures/make-prediction', {
      method: "POST",
      body: JSON.stringify(data)
    });
    return res;
  } catch (error) {
    console.error("Make Prediction Fetch Error", error);
    return null
  }
}