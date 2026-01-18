import { QueryParams } from "@/utils/types/Generic/QueryParams";
import { apiFetch } from "../apiFetch";

export const checkCoinFetch = async (
  slug: "trivia" | "prediction" | "shot_on_net",
  { onSuccess, onError }: QueryParams,
) => {
  try {
    const response = await apiFetch(`/games/check-coins?slug=${slug}`, {
      method: "GET",
      auth: true,
    });
    if (onSuccess) onSuccess(response);
    return response;
  } catch (error) {
    if (onError) onError(error);
  }
};
