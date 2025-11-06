import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/sidebar-provider";
import { AuthProvider } from "@/components/auth-provider";
import ClientLayoutWrapper from "./layout-wrapper"; // ✅ Client wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UniFied - Event Manager",
  description: "Discover and book the best events across India",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <SidebarProvider>
              {/* ✅ ALL CLIENT STUFF INSIDE HERE */}
              <ClientLayoutWrapper>
                {children}
              </ClientLayoutWrapper>
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
