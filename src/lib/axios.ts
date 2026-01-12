import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_URL!;

type FetchOptions = RequestInit & {
  auth?: boolean;
};

export async function apiFetch(
  endpoint: string,
  options: FetchOptions = {}
) {
  const headers = new Headers(options.headers);

  // Authorization
  if (options.auth !== false) {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const user = JSON.parse(userCookie);
      if (user?.token) {
        headers.set("Authorization", `Bearer ${user.token}`);
      }
    }
  }

  // Locale
  const locale = Cookies.get("NEXT_LOCALE") || "en";
  headers.set("X-App-Locale", locale);

  const res = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw { status: res.status, error };
  }

  return res.json();
}
