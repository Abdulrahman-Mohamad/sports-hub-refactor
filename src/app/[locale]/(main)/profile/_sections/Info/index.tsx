import { ProfileUser } from "@/utils/types/User/profile";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";

export default function ProfileInfoSection({ user }: { user: ProfileUser }) {
  const { ranking, phone, email, address } = user;
  return (
    <>
      <section
        className="grid grid-cols-1  gap-4 text-white py-6 px-4 text-lg font-medium
      md:grid-cols-2 md:pe-20
      lg:flex lg:justify-around lg:gap-0 lg:items-center
      "
      >
        <div className="flex items-center gap-2">
          <MdLeaderboard />
          <span>{ranking}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaPhoneAlt />
          <span>{phone}</span>
        </div>
        {email && (
          <div className="flex items-center gap-2">
            <FaEnvelope />
            <span>{email}</span>
          </div>
        )}
        {address && (
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <span>{address}</span>
          </div>
        )}
      </section>
    </>
  );
}
