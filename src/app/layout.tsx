import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Mina N. F. | ML Engineer & Full Stack Developer",
  description: "Portfolio of Mina N. F., specializing in Machine Learning and Modern Web Development.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased selection:bg-purple-500/30`}>
        {children}
      </body>
    </html>
  );
}
