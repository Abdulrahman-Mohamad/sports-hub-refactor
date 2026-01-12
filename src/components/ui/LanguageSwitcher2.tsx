"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";

    // Switch the locale for the current pathname without a full page reload
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-5 right-5 z-50 bg-gradient-primary text-white px-4 py-2 rounded-full shadow-lg font-bold hover:scale-110 transition-transform cursor-pointer"
    >
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
}
