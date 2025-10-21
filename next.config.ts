import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    output: "standalone",
    headers: async () => [
        {
            headers: [
                {
                    key: "Cache-Control",
                    value: "public, max-age=31536000, immutable",
                },
            ],
            source: "/:path(.+\\.(?:ico|png|svg|jpg|jpeg|avif|webp|ttf|ttc|otf|woff|woff2)$)",
        },
    ],
};

export default nextConfig;
