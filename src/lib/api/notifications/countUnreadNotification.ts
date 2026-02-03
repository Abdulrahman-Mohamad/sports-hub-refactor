import { apiFetch } from "../apiFetch";

export async function notificationCountUnreadFetch(){
  return apiFetch(`/notifications/count-unread`)
}