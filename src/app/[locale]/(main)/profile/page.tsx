import { ProfileData } from "@/utils/types/User/profile";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  // Get the cookie store
  const cookieStore = await cookies();
  const profileCookie = cookieStore.get("userProfile")?.value;
  let profileData: ProfileData | null = null;
  if (profileCookie) {
    try {
      profileData = JSON.parse(decodeURIComponent(profileCookie));
    } catch (error) {
      console.error("Error parsing profile cookie:", error);
    }
  }
  // Destructure the profile data
  const { user, activities, transaction } = profileData || {};

  return (
    <>
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="w-full min-h-[200px] md:min-h-[370px] bg-[url('/images/profile/profile-bg.png')] bg-center bg-cover bg-no-repeat"/>
        {/* media - name - points - buttons */}
        <section></section>
        {/* breakline with animated controller */}
        <div></div>
        {/* user Information */}
        <section></section>
        {/* win loses - zee coins */}
        <div></div>
        {/* activity - transitions */}
        <div>
          {/* activity */}
          <div></div>
          {/* transitions */}
          <div></div>
        </div>
      </div>
    </>
  );
}
