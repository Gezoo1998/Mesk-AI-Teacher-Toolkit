/**
 * Application Configuration
 * 
 * Edit this file to customize the branding, metadata, and links
 * for your CodeCanyon product or personal deployment.
 */

export const APP_CONFIG = {
    // Basic Branding
    name: "AI Teacher Toolkit Pro",
    shortName: "Teacher AI",
    orgName: "Your Institution",
    logoPath: "/logo.png", // Located in public/
    
    // Metadata & SEO
    url: "https://yourtool-demo.vercel.app",
    description: "The ultimate AI assistant for teachers. Generate lesson plans, creative activities, and educational resources in seconds.",
    keywords: [
        "AI Teacher Toolkit",
        "Lesson Planner AI",
        "Educational AI Tools",
        "Teaching Assistant",
        "Modern Education AI"
    ],
    
    // Social & Support
    author: {
        name: "Developer Name",
        url: "https://your-portfolio.com",
        handle: "@yourhandle"
    },
    
    // Features / Technical
    defaultLanguage: "en" as const, // "en" or "ar"
    themeColor: "#f59e0b", // Amber-500
    
    // Marketplace Context (Used in documentation/demo)
    demoUrl: "https://your-demo-url.com",
    purchaseUrl: "https://codecanyon.net/item/your-item-id", // Add your CodeCanyon link here
};

export type AppConfig = typeof APP_CONFIG;
