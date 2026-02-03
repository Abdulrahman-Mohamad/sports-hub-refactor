import { apiFetch } from "../apiFetch";

export async function notificationMakeAsReadFetch(id:string){
  return apiFetch(`/notifications/make-as-read/${id}`,{
    method:"PUT"
  })
}