import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Noor | Birthday | Gift ",
  description: "By someone you  know ",
  openGraph:{
    title: "Noor | Birthday | Gift ",
    description: "By someone you  know ",
    url: "https://noor-birthday-gift.vercel.app/",
    images: "/graph.jpeg",

  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
