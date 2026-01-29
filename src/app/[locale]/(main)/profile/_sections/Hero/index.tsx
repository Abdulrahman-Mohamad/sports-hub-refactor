import Image from "next/image";

export default function ProfileHeroSection() {
  return (
    <section className="relative w-full min-h-[200px] md:min-h-[370px] overflow-hidden">
      <Image
        src="/images/profile/profile-bg.png"
        alt="Profile Background"
        fill
        priority
        className="object-cover object-center"
      />
    </section>
  );
}
