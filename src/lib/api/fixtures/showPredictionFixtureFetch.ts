import { apiFetch } from "../apiFetch";

export const showPredictionFixtureFetch = async (id: string | number) => {
  try {
    const res = await apiFetch(`/fixtures/show-prediction-fixture/${id}`, {
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Show Prediction Fixture Fetch Error:", error);
    return null;
  }
};
