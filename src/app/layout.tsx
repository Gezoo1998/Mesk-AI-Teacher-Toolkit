import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Mesk AI Teacher Toolkit",
  description: "AI-powered tools to help Mesk School teachers plan lessons, generate ideas, and create resources.",
  icons: {
    icon: '/mesk.png',
    apple: '/mesk.png',
  },
  openGraph: {
    title: 'Mesk AI Teacher Toolkit',
    description: 'Your intelligent teaching companion. Turn ideas into classroom-ready resources in seconds.',
    images: [
      {
        url: '/mesk.png',
        width: 800,
        height: 600,
        alt: 'Mesk AI Toolkit Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <div className="flex min-h-screen flex-col bg-transparent md:flex-row">
            {/* Sidebar Desktop */}
            <div className="hidden md:block md:w-80 md:flex-none md:p-6">
              <Sidebar />
            </div>

            <MobileNav />

            <main className="flex-1 p-6 md:p-10 md:pt-10">
              <div className="mx-auto max-w-5xl animate-fade-in-soft">
                {children}
              </div>
            </main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
