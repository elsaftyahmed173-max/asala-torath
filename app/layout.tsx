import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "أصالة التراث المصري",
  description: "أفخم منتجات الصدف الطبيعي المصري والأرابيسك اليدوي",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
