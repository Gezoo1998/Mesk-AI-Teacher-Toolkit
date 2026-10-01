import { MetadataRoute } from 'next';
import { TOOLS } from '@/lib/data/tools';
import { APP_CONFIG } from '@/config/app';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = APP_CONFIG.url || 'https://almanhal.edu.sa';
  const currentDate = new Date();

  // Primary static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/chat`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  // Dynamic educational tool routes (26+ tools)
  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...toolRoutes];
}
