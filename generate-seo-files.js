// Generate sitemap.xml and robots.txt with correct URLs
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';

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
Sitemap: ${siteUrl}/sitemap.xml

# Allow all search engines to crawl the site
# This is appropriate for a political campaign website
# that wants maximum visibility and discoverability`;

// Ensure public directory exists
const publicDir = resolve(process.cwd(), 'public');
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

// Write files to public directory
const sitemapPath = resolve(publicDir, 'sitemap.xml');
const robotsPath = resolve(publicDir, 'robots.txt');

writeFileSync(sitemapPath, sitemap);
writeFileSync(robotsPath, robots);

console.log(`✅ Generated sitemap.xml and robots.txt for ${siteUrl}`);