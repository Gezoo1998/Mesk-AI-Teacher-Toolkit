/**
 * Application Configuration
 * 
 * Rebranded for Al Manhal International Schools (مدارس المنهل العالمية)
 */

export const APP_CONFIG = {
    // Basic Branding
    name: "Al Manhal AI Teacher Toolkit",
    shortName: "Al Manhal AI",
    orgName: "Al Manhal International Schools",
    orgNameAr: "مدارس المنهل العالمية",
    logoPath: "/almanhal-logo.png", // Located in public/
    
    // Metadata & SEO
    url: "https://almanhal.edu.sa",
    description: "The intelligent teaching companion for Al Manhal International Schools educators. Generate lesson plans, creative activities, and classroom-ready resources in seconds.",
    keywords: [
        "Al Manhal International Schools",
        "مدارس المنهل العالمية",
        "Al Manhal AI Teacher Toolkit",
        "Lesson Planner AI",
        "Educational AI Tools",
        "Teaching Assistant",
        "Modern Education AI"
    ],
    
    // Social & Support
    author: {
        name: "Al Manhal International Schools",
        url: "https://almanhal.edu.sa",
        handle: "@almanhal_schools"
    },
    
    // Features / Technical
    defaultLanguage: "en" as const, // "en" or "ar"
    themeColor: "#2B508F", // Al Manhal Royal Blue
    
    // Portal Context
    demoUrl: "https://almanhal.edu.sa",
    purchaseUrl: "",
};

export type AppConfig = typeof APP_CONFIG;
