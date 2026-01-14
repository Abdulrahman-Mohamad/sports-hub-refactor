import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { UserProvider } from "@/context/UserContext";
import AuthProvider from "@/providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {

  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <>
      <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
        <body suppressHydrationWarning={true} className="">
          <NextIntlClientProvider messages={messages}>
            <UserProvider>
              <AppProvider>
                <AuthProvider>
                  {children}
                  <ToastContainer position="top-right" autoClose={3000} />
                </AuthProvider>
              </AppProvider>
            </UserProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  );
}
