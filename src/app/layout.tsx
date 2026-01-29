import Loader from "@/components/ui/Loader";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { UserProvider } from "@/context/UserContext";
import AuthProvider from "@/providers/AuthProvider";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";


export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <html >
        <body suppressHydrationWarning={true} className="">
          
            <UserProvider>
              <AppProvider>
                <AuthProvider>
                  <Suspense fallback={<Loader />}>
                  {children}
                  <ToastContainer position="top-right" autoClose={3000} />
                  </Suspense>
                </AuthProvider>
              </AppProvider>
            </UserProvider>
        </body>
      </html>
    </>
  );
}
