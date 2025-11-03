import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mosagraphic.com/</loc>
    <lastmod>2024-07-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mosagraphic.com/pdf-to-text</loc>
    <lastmod>2024-07-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://mosagraphic.com/about</loc>
    <lastmod>2024-07-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mosagraphic.com/faq</loc>
    <lastmod>2024-07-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mosagraphic.com/contact</loc>
    <lastmod>2024-07-30</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://mosagraphic.com/privacy-policy</loc>
    <lastmod>2024-07-30</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://mosagraphic.com/Cookie-Policy</loc>
    <lastmod>2024-07-30</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://mosagraphic.com/terms-of-service</loc>
    <lastmod>2024-07-30</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://mosagraphic.com/dmca-policy</loc>
    <lastmod>2024-07-30</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;

const robotsContent = `User-agent: *
Allow: /
Sitemap: https://mosagraphic.com/sitemap.xml`;

const path = window.location.pathname;

if (path === '/sitemap.xml') {
    // This is a workaround for servers that redirect all paths to index.html for SPAs.
    // We stop the React app from rendering and instead serve the XML content directly via JavaScript.
    document.open('application/xml', 'replace');
    document.write(sitemapContent);
    document.close();
} else if (path === '/robots.txt') {
    // Same workaround for robots.txt
    document.open('text/plain', 'replace');
    document.write(robotsContent);
    document.close();
} else {
    // Proceed with mounting the React application
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error("Could not find root element to mount to");
    }
    
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
}
