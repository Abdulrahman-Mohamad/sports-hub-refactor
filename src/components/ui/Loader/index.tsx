import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Loader() {
  const t = useTranslations("components.ui.loader");
  return (
    <div className="min-h-screen w-full fixed z-50">
      <div className="relative flex-grow min-h-screen flex-center bg-[#0E0011]">
        {/* top gradient */}
        <div className="absolute top-0 start-0 end-0 w-full h-full bg-gradient-to-b from-[#E400FB]/15 via-transparent to-transparent" />
        {/* spinner and state */}
        <div className="flex-center flex-col text-white">
          <Image
            src={"/gif/common/loading.gif"}
            alt="loading"
            width={300}
            height={300}
            className="size-[10rem] lg:size-[16rem]"
          />
          <h2 className="mt-6 !text-4xl !font-extrabold lg:!text-6xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-lg font-semibold lg:text-2xl">
            {t("sub_title")}
          </p>
        </div>
        {/* bottom gradient */}
        <div className="absolute bottom-0 start-0 end-0 w-full h-full bg-gradient-to-t from-[#5200FD]/15 via-transparent to-transparent" />
      </div>
    </div>
  );
}
