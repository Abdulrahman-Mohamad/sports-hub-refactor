import GradientIcon from "@/components/ui/GradientIcon";
import Image from "next/image";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useTranslations } from "next-intl";

export default function SidebarHeader({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const t = useTranslations("navbar");
  return (
    <>
      {/* header */}
      <div className="flex items-center justify-between py-5 px-6">
        <Image
          className="w-44"
          src={t("logo")}
          alt="SPORTS HUB"
          width={1100}
          height={22}
        />

        <span onClick={toggleSidebar} className="pe-4">
          <GradientIcon
            fromColor="#E400FB"
            toColor="#5200FD"
            icon={RiArrowGoBackFill}
            size={28}
          />
        </span>
      </div>

      {/* Break Line */}
      <div className="h-0.25 w-[90%] bg-gradient-primary mx-6" />
    </>
  );
}
