import { MetadataRoute } from 'next';
import { APP_CONFIG } from '@/config/app';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = APP_CONFIG.url || 'https://almanhal.edu.sa';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
