// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://qrmenu-demo.vercel.app', // Kendi sitenizin URL'si
    generateRobotsTxt: true, // (Opsiyonel) robots.txt dosyasını oluşturun
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/', // Tüm sayfalara izin ver
          disallow: '/dashboard', // Sadece /dashboard sayfasını engelle
        },
      ],
      additionalSitemaps: [
        'https://qrmenu-demo.vercel.app/sitemap.xml', // Ek site haritalarını buraya ekleyin
      ],
    },
  }
  