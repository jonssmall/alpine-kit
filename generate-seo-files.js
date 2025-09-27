// Generate sitemap.xml and robots.txt with correct URLs
import { writeFileSync } from 'fs';
import { resolve } from 'path';

// Get the site URL from environment or use default from package.json
const siteUrl = process.env.SITE_URL || process.env.npm_package_homepage || 'jonssmall.github.io';

// Generate sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>2025-09-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

// Generate robots.txt
const robots = `User-agent: *
Allow: /

# Sitemap location
Sitemap: ${siteUrl}sitemap.xml

# Allow all search engines to crawl the site
# This is appropriate for a political campaign website
# that wants maximum visibility and discoverability`;

// Write files to public directory
writeFileSync(resolve(process.cwd(), 'public/sitemap.xml'), sitemap);
writeFileSync(resolve(process.cwd(), 'public/robots.txt'), robots);

console.log(`✅ Generated sitemap.xml and robots.txt for ${siteUrl}`);