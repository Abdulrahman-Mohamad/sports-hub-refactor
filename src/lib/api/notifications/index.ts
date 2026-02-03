import { apiFetch } from "../apiFetch";

export async function notificationsFetch(page:number=1){
return apiFetch(`/notifications?page=${page}`)
}