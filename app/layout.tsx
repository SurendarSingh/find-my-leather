"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { Toaster } from "react-hot-toast";
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
          <Toaster position="top-right" reverseOrder={false} />
        </NextAuthProvider>
      </body>
    </html>
  );
}
