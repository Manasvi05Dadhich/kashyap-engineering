import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kashyap Engineering — Liquid, Oil, Bottle & Tube Filling Machines",
  description:
    "Kashyap Engineering designs and manufactures liquid, oil, tube, and bottle filling machines and complete packaging lines from Vadodara, Gujarat, India.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F5F1] font-body text-[#1C2024]">
        {children}
      </body>
    </html>
  );
}
