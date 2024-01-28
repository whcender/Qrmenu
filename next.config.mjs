/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
          ], // Görüntülerin yüklenebileceği domainleri burada belirtin
    },
};

export default nextConfig;
