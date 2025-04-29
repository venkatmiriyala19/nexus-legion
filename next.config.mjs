/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Unsplash's domain
        port: "", // Unsplash doesn't use a specific port
        pathname: "/**", // Allows any path under the domain
      },
    ],
  },
};

export default nextConfig;
