import { QueryParams } from "@/utils/types/Generic/QueryParams";
import { apiFetch } from "../apiFetch";

export const checkJokerFetch = async ({onSuccess,onError}:QueryParams) => {
    try {
        const response = await apiFetch(`/games/check-joker`, {
            method: "GET",
            auth:true
        });
        if (onSuccess) onSuccess(response);
        return response;
    } catch (error) {
        if (onError) onError(error);
    }
}