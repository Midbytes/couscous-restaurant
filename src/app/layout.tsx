import "glider-js/glider.min.css";
import "@/app/styles/global.scss";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import Providers from "@/app/components/providers/Providers";

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
