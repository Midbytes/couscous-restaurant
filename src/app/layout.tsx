import "glider-js/glider.min.css";
import "@/app/styles/global.scss";
import type { Metadata } from "next";
import { Lora, Poppins } from "next/font/google";
import { ReactNode } from "react";
import Providers from "@/app/components/providers/Providers";
import Navbar from "./components/navBar/Navbar";
import { Locales } from "../../i18n.config";

const poppins = Poppins({
  weight: ["400", "600"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const lora = Lora({
  weight: ["500"],
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Le Couscous",
  description: "Your favorite Tunisian food",
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: Locales };
}) {
  return (
    <html lang="en" className={`${lora.variable} ${poppins.variable}`}>
      <body>
        <Providers>
          <Navbar lang={lang} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
