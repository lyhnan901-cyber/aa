import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مختبر النمو - تحليل تسويقي ذكي بالذكاء الاصطناعي",
  description:
    "حلل حسابك بالذكاء الاصطناعي، واكتشف أين تخسر العملاء، وما الذي يمنع المبيعات، وكيف تنمو بخطة واضحة.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
