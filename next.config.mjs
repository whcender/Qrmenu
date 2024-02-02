/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "firebasestorage.googleapis.com",
            },
          ], // Görüntülerin yüklenebileceği domainleri burada belirtin
    },
};

export default nextConfig;
