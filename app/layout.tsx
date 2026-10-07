import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "العهد للمقاولات العامة | ALAHD Industrial General Contracting",
  description:
    "شركة العهد للمقاولات العامة — تنفيذ الصوامع والمطاحن، المصانع الغذائية، خطوط الإنتاج وأعمال الـ MEP، الأحواض الكيميائية، والأرضيات الصناعية في مصر.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Cairo:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
