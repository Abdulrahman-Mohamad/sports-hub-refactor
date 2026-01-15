import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_URL!;

type FetchOptions = RequestInit & {
  auth?: boolean;
  body?: unknown;
  cache?: RequestCache;
};

function isServer() {
  return typeof window === "undefined";
}

// Helper: read cookies depending on environment
async function getAuthAndLocale() {
  let token: string | null = null;
  let locale = "en";

  if (isServer()) {
    // Server Component
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    token = cookieStore.get("access_token")?.value || null;
    locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  } else {
    // Client Component
    token = Cookies.get("access_token") || null;
    locale = Cookies.get("NEXT_LOCALE") || "en";
  }

  return { token, locale };
}

export async function apiFetch(endpoint: string, options: FetchOptions = {}) {
  const headers = new Headers(options.headers || {});
  const { token, locale } = await getAuthAndLocale();

  // Auth Header
  if (options.auth !== false && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  headers.set("X-App-Locale", locale);

  // Handle body automatically for POST/PUT/PATCH
  let body: BodyInit | undefined = undefined;
  if (options.body) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(options.body);
  }

  const res = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers,
    body,
    cache: options.cache ?? "no-store",
  });

  if (!res.ok) {
    let error = null;
    try {
      error = await res.json();
    } catch { }
throw { status: res.status, ...(error?.error || {}), ...error };
  }

  // Handle empty or non-JSON responses safely
  const contentType = res.headers.get("content-type");
  const contentLength = res.headers.get("content-length");

  if (
    res.status === 204 ||
    contentLength === "0" ||
    !contentType?.includes("application/json")
  ) {
    return null;
  }

  try {
    return await res.json();
  } catch (error) {
    console.error("Failed to parse JSON response:", error);
    return null;
  }
}
