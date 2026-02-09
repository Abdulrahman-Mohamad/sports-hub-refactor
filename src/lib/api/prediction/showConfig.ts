import { apiFetch } from "../apiFetch"

export const predictionShowConfigFetch = async () => {
try {
  const res = await apiFetch('/fixtures/show-config',{
    method:'GET'
  })
  return res
} catch (error) {
  console.error("Predictions Config Fetch Error:",error);
  return null
}
}