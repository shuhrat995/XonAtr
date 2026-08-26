import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Xon Atr — Premium Parfyumeriya | Atir sotib olish",
  description: "Xon Atr — O'zbekistondagi eng ishonchli parfyumeriya do'koni. Premium sifat, bepul yetkazish, 14 kun kafolat. Erkaklar va ayollar uchun atirlar.",
  keywords: "atir, parfyumeriya, xon atr, erkaklar atiri, ayollar atiri, sovg'a, xorazm, xiva",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${inter.variable}`}>
      <body className="min-h-screen bg-bg text-text antialiased noise-bg">
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
