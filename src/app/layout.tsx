import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Provider";
import { Toaster } from "sonner"
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "BlogVibe",
  description: "Let your words echo across the web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
