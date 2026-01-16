"use client";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import Dropdown from "./Dropdown";
import Image from "next/image";

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const t = useTranslations("navbar");
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (nextLocale: "en" | "ar") => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <>
      <div className={`${className} relative`}>
        <Dropdown
          icon={
            <Image
              src={t("flag")}
              alt="Language Flag"
              width={30}
              height={20}
              className="w-8"
            />          }
          defaultOpen={false}
          menuClassName="!min-w-[140px]"
          align="center"
          animationType="vertical"
        >
          <div className="flex flex-col">
            <button
              onClick={() => changeLanguage("en")}
              className={`w-full flex items-center justify-center gap-3 p-3 transition-all duration-200 hover:bg-gray-50 cursor-pointer`}
            >
              <Image
                src="/images/navbar/en.png"
                alt="English"
                width={24}
                height={16}
              />
              <span>English</span>
            </button>
            <button
              onClick={() => changeLanguage("ar")}
              className={`w-full flex items-center justify-center gap-3 p-3 transition-all duration-200 hover:bg-gray-50 cursor-pointer`}
            >
              <Image
                src="/images/navbar/ar.png"
                alt="العربية"
                width={24}
                height={16}
              />
              <span>العربية</span>
            </button>
          </div>
        </Dropdown>
      </div>
    </>
  );
}
