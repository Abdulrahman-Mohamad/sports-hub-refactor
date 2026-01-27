import Cookies from "js-cookie";
import { profileFetch } from "./profileFetch";

export const syncProfileCookies = async () => {
  try {
    await profileFetch({
      onSuccess: (res) => {
        if (res?.data) {
          Cookies.set("userProfile", JSON.stringify(res.data), {
            expires: 365,
            secure: true,
            sameSite: "Lax",
          });
        }
      },
      onError: (err) => console.error("Profile Revalidation Error:", err),
    });
  } catch (error) {
    console.error("Sync Profile Cookies Failed:", error);
  }
};
