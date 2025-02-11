"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

import { queryClient } from "@/lib/queryClient";
import Header from "@/components/main/header";
import RecommendationsModal from "@/components/recommendations-modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* supressHydrationWarning won't affect hydration on other components, only on ThemeProvider */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative max-h-screen max-w-screen-xl mx-auto`}
      >
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
          <RecommendationsModal />
        </QueryClientProvider>
      </body>
    </html>
  );
}
