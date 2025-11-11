import type { Metadata } from "next";
import { Poppins, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const primaryFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-primary",
  display: "swap",
});

const secondaryFont = Noto_Sans_Thai({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600"],
  variable: "--font-secondary",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quantum Vault | Trust Beyond Time",
  description:
    "Quantum Vault delivers ultra-secure safe deposit suites, concierge-grade service, and timeless discretion for your most precious assets.",
  keywords: [
    "Quantum Vault",
    "safe deposit box",
    "luxury vault",
    "asset security",
    "premium storage",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${primaryFont.variable} ${secondaryFont.variable}`}>
      <body className="bg-background text-foreground font-secondary antialiased">
        {children}
        <Toaster className="font-secondary" />
      </body>
    </html>
  );
}
