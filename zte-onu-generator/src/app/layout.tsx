import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZTE ONU Configuration Script Generator",
  description:
    "Deterministic OLT CLI syntax generator for ZTE optical network units",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
