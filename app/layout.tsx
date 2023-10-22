"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  );
}
