import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { LanguageProvider } from "@/contexts/LanguageContext";

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

export const metadata: Metadata = {
  title: "Mesk AI Teacher Toolkit | Intelligent Teaching Assistant",
  description: "The ultimate AI assistant for teachers at Mesk Language School. Generate comprehensive lesson plans, creative activities, math word problems, and educational resources in seconds. Tailored for Primary, Prep, and Secondary levels with bilingual support.",
  keywords: [
    "Mesk Language School",
    "AI Teacher Toolkit",
    "Lesson Ideas Generator",
    "Lesson Planner AI",
    "Text Summarizer for Teachers",
    "Math Problem Generator",
    "Vocabulary List Generator",
    "Educational AI Tools",
    "Egyptian Arabic AI",
    "Classroom Activities",
    "Teaching Assistant Bot",
    "PBL Planner",
    "Science Misconception Buster"
  ],
  authors: [{ name: "Abdelrahman ElGezawy", url: "https://github.com/Gezoo1998" }],
  creator: "Mesk Language School",
  publisher: "Mesk Language School",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mesk-ai-toolkit.vercel.app'), // Replace with actual URL
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
      { url: '/mesk.png' },
      { url: '/mesk.png', sizes: '32x32', type: 'image/png' },
      { url: '/mesk.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/mesk.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Mesk AI Teacher Toolkit - Empowering Educators',
    description: 'Transform your classroom with AI. Lesson plans, activities, and resources generated instantly for Mesk School teachers.',
    url: 'https://mesk-ai-toolkit.vercel.app',
    siteName: 'Mesk AI Teacher Toolkit',
    images: [
      {
        url: '/mesk.png',
        width: 1200,
        height: 630,
        alt: 'Mesk AI Teacher Toolkit Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mesk AI Teacher Toolkit',
    description: 'AI-powered tools for teachers to generate lessons, activities, and resources instantly.',
    images: ['/mesk.png'],
    creator: '@mesk_school',
  },
  verification: {
    google: 'your-google-site-verification-code', // Add actual code
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
    "name": "Mesk AI Teacher Toolkit",
    "description": "AI-powered tools for teachers to generate lesson plans, activities, questions, and educational resources.",
    "url": "https://mesk-ai-toolkit.vercel.app",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Mesk Language School"
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
