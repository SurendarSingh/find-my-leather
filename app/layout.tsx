import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextAuthProvider from "@/components/SessionProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <NextAuthProvider>
          {children}
          <ToastContainer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
