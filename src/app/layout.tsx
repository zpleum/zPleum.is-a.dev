import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Suspense } from "react";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ToastProvider } from "@/components/toast-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "zPleum's Portfolio",
  description: "A minimal portfolio website showcasing my skills, projects, and experience as a Full Stack Developer.",
  keywords: ["portfolio", "developer", "full stack", "react", "next.js", "web development","zpleum" ,"wiraphat"],
  authors: [{ name: "zPleum" }],
  creator: "zPleum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-background">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Suspense fallback={<LoadingSpinner />}>
            {children}
            <ScrollToTop />
          </Suspense>
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
