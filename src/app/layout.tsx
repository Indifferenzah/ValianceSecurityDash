import "./globals.css";

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valiance Security - Enterprise Dashboard",
  description: "Advanced Discord security system with comprehensive protection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
