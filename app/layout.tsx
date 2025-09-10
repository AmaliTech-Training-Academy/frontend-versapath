import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import "./globals.css";
import { Toaster } from "sonner";
import { StoreProvider } from "@/lib/providers/store-provider";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VersaPath.ai",
  description:
    "A modular, AI-augmented learning and career acceleration platform for software engineers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <Toaster richColors position="top-right" />
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <StoreProvider>{children}</StoreProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
