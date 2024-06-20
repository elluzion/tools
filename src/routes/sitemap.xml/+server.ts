import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals: { db }, url }) => {
  const currentPath = 'https://' + url.host;
  const songs = (await db.songs.getSongs()) || [];
  const now = new Date().toISOString();

  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
      <url>
        <loc>${currentPath}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>hourly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${currentPath}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `.trim() +
      songs
        .map((song) => {
          return `
            <url>
              <loc>${currentPath}/${song.permalink}</loc>
              <lastmod>${now}</lastmod>
              <changefreq>hourly</changefreq>
              <priority>0.5</priority>
            </url>`.trim();
        })
        .join('') +
      `</urlset>`.trim(),
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    },
  );
};
