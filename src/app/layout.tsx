import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { UserProvider } from "@/context/UserContext";
import AuthProvider from "@/providers/AuthProvider";
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
                  {children}
                  <ToastContainer position="top-right" autoClose={3000} />
                </AuthProvider>
              </AppProvider>
            </UserProvider>
        </body>
      </html>
    </>
  );
}
