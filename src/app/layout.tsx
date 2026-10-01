import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { BottomNav } from "@/components/BottomNav";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { APP_CONFIG } from "@/config/app";
import { PremiumBackground } from "@/components/PremiumBackground";

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
  title: {
    default: APP_CONFIG.name,
    template: `%s | ${APP_CONFIG.shortName}`,
  },
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
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
        alt: `${APP_CONFIG.name} - ${APP_CONFIG.orgName}`,
      },
    ],
    locale: 'en_US',
    alternateLocale: ['ar_SA'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    images: [APP_CONFIG.logoPath],
    creator: APP_CONFIG.author.handle,
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
    "alternateName": [APP_CONFIG.shortName, APP_CONFIG.orgNameAr],
    "description": APP_CONFIG.description,
    "url": APP_CONFIG.url,
    "applicationCategory": "EducationalApplication",
    "applicationSubCategory": "AI Teacher Toolkit",
    "operatingSystem": "All modern browsers (Chrome, Edge, Safari, Firefox)",
    "inLanguage": ["en", "ar"],
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "teacher"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "SAR"
    },
    "creator": {
      "@type": "EducationalOrganization",
      "name": APP_CONFIG.orgName,
      "alternateName": APP_CONFIG.orgNameAr,
      "url": APP_CONFIG.url,
      "logo": `${APP_CONFIG.url}${APP_CONFIG.logoPath}`
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-blue-200 selection:text-[#1E255E] transition-colors duration-500`}
      >
        <LanguageProvider>
          <NavigationProvider>
            <PremiumBackground />
            <div className="flex min-h-screen flex-col bg-transparent md:flex-row">
              {/* Sidebar Desktop */}
              <div className="hidden md:block md:w-80 md:flex-none md:p-6">
                <Sidebar />
              </div>

              <MobileNav />

              <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 pb-28 md:pb-10 min-w-0">
                <div className="mx-auto max-w-7xl w-full animate-fade-in-soft">
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
