import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getLocale, getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import OTPModal from "./(auth)/_otp";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-en",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const dinArabic = localFont({
  src: [
    {
      path: "../../../public/fonts/ArFonts/ArbFONTS-DINNextLTArabic-UltraLight-1.ttf",
      weight: "100",
    },
    {
      path: "../../../public/fonts/ArFonts/ArbFONTS-DINNextLTArabic-Light-1.ttf",
      weight: "200",
    },
    {
      path: "../../../public/fonts/ArFonts/ArbFONTS-DINNextLTArabic-Regular-2.ttf",
      weight: "400",
    },
    {
      path: "../../../public/fonts/ArFonts/ArbFONTS-DINNextLTArabic-Medium-2.ttf",
      weight: "500",
    },
    {
      path: "../../../public/fonts/ArFonts/ArbFONTS-DINNextLTArabic-Bold-2.ttf",
      weight: "700",
    },
    {
      path: "../../../public/fonts/ArFonts/ArbFONTS-DINNextLTArabic-Heavy-1.ttf",
      weight: "800",
    },
    {
      path: "../../../public/fonts/ArFonts/ArbFONTS-DINNextLTArabic-Black-2.ttf",
      weight: "900",
    },
  ],
  variable: "--font-ar",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: t("icon"),
    },
  };
}
export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <>
      <div
        lang={locale}
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={`${locale === "ar" ? dinArabic.className : inter.className}`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <OTPModal />
        </NextIntlClientProvider>
      </div>
    </>
  );
}
