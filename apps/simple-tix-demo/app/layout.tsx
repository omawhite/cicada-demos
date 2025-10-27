import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import "@workspace/ui/globals.css";
import Header from "@/components/Header";
import { Providers } from "@/components/providers";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Simple Tix Demo",
  description: "A simple ticket management demo application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Load SimpleTix CSS */}
        <link
          href="https://embed.prod.simpletix.com/assets/widget/widget.min.css?t=2024.05.08"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        {/* Load SimpleTix script */}
        <Script
          src="https://embed.prod.simpletix.com/assets/widget/widget.min.js?t=2025.10.09"
          strategy="beforeInteractive"
        />

        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
