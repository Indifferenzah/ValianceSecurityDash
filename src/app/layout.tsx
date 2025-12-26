import "./globals.css";

export const metadata = {
  title: "ValianceSecurity Dashboard",
  description: "Security dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
