import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { BottomNav } from "@/components/BottomNav";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { APP_CONFIG } from "@/config/app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: APP_CONFIG.themeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
  keywords: APP_CONFIG.keywords,
  authors: [{ name: APP_CONFIG.author.name, url: APP_CONFIG.author.url }],
  creator: APP_CONFIG.orgName,
  publisher: APP_CONFIG.orgName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(APP_CONFIG.url),
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'ar': '/ar',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: APP_CONFIG.logoPath },
      { url: APP_CONFIG.logoPath, sizes: '32x32', type: 'image/png' },
      { url: APP_CONFIG.logoPath, sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: APP_CONFIG.logoPath, sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    url: APP_CONFIG.url,
    siteName: APP_CONFIG.name,
    images: [
      {
        url: APP_CONFIG.logoPath,
        width: 1200,
        height: 630,
        alt: APP_CONFIG.name,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    images: [APP_CONFIG.logoPath],
    creator: APP_CONFIG.author.handle,
  },
  verification: {
    google: 'your-google-site-verification-code', // Add actual code
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_CONFIG.shortName,
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": APP_CONFIG.name,
    "description": APP_CONFIG.description,
    "url": APP_CONFIG.url,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": APP_CONFIG.orgName
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-amber-200 selection:text-amber-900 transition-colors duration-500`}
      >
        <LanguageProvider>
          <NavigationProvider>
            <div className="flex min-h-screen flex-col bg-transparent md:flex-row">
              {/* Sidebar Desktop */}
              <div className="hidden md:block md:w-80 md:flex-none md:p-6">
                <Sidebar />
              </div>

              <MobileNav />

              <main className="flex-1 p-6 md:p-10 md:pt-10 pb-28 md:pb-10">
                <div className="mx-auto max-w-5xl animate-fade-in-soft">
                  {children}
                </div>
              </main>

              <BottomNav />
            </div>
          </NavigationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
