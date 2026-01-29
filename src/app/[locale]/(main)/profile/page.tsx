import { ProfileData } from "@/utils/types/User/profile";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import ProfileHeroSection from "./_sections/Hero";
import ProfileStateSection from "./_sections/State";
import ProfileActionsSection from "./_sections/Actions";
import ProfileInfoSection from "./_sections/Info";
import ProfileResultSection from "./_sections/Result";
import ProfileTASection from "./_sections/TA";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";

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

  return (
    <>
      <div className="flex-grow relative isolate overflow-x-hidden">
        {/* Hero Section */}
        <ProfileHeroSection />
        <Suspense fallback={<Spinner />}>
        {/* media - name - points - buttons */}
        <section className="relative pt-32 sm:pt-6 lg:grid lg:grid-cols-12">
          <ProfileStateSection data={user} />
          <ProfileActionsSection user={user}/>
        </section>

        {/* breakline with animated controller */}
        <div className="w-[80vw] me-auto h-1 bg-[#383342] mt-6  relative rtl:w-[95vw]
        sm:w-[85vw]
        lg:mt-10 lg:w-[90vw]
        ">
          <Image 
          className="size-28 rotate-7 -top-1 absolute end-8.5 translate-x-full rtl:-translate-x-1/2 rtl:end-6
          lg:size-46 lg:end-14 rtl:lg:end-10
          "
          src={'/gif/profile/controller.gif'} 
          alt="Animated Game Controller" 
          width={200} 
          height={200} 
          />
        </div>

        <ProfileInfoSection user={user}/>
        {/* win - loses - zee coins */}
        <ProfileResultSection user={user}/>
        {/* activity - transitions */}
        <ProfileTASection activities={activities} transactions={transaction}/>
        </Suspense>
      </div>
    </>
  );
}
