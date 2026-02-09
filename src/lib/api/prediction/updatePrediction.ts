import { apiFetch } from "../apiFetch"

export const updatePredictionFetch = async (
  fixtureId: number | string,
  data: {
    home_score: number,
    away_score: number
  }
) => {
  try {
    const res = await apiFetch(`/fixtures/update-prediction/${fixtureId}`, {
      method: 'PUT',
      body: data
    });
    return res
  } catch (error) {
    console.error('Update Prediction Fetch Error', error)
    return null
  }
}