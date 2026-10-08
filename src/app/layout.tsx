import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Eduvyapar · Sovereign Digital Campus",
  description: "Eduvyapar — Next-Generation Institutional Management & Intelligence Platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cinzel.variable} ${plusJakarta.variable} antialiased dark`}>
      <body className="grain min-h-screen bg-[#05080e] text-[#f4f6fa] selection:bg-[#39ff14] selection:text-[#05080e]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

