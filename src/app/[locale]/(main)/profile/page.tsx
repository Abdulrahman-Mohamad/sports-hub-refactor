import { ProfileData } from "@/utils/types/User/profile";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import ProfileHeroSection from "./_sections/Hero";
import ProfileStateSection from "./_sections/State";
import ProfileActionsSection from "./_sections/Actions";

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

  if (!profileData) {
    redirect("/register");
  }

  // Destructure the profile data
  const { user, activities, transaction } = profileData;
  const { media, username, zee_coins, joker, points } = user;

  return (
    <>
      <div className="flex-grow">
        {/* Hero Section */}
        <ProfileHeroSection />
        {/* media - name - points - buttons */}
        <section className="relative pt-32">
          <ProfileStateSection data={user} />
          <ProfileActionsSection user={user}/>
        </section>

        {/* breakline with animated controller */}
        <div></div>

        {/* user Information */}
        <section></section>
        {/* win - loses - zee coins */}
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
