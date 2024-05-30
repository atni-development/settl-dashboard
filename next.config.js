/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  //  domains: ['lh3.googleusercontent.com','googleusercontent.com', 'firebasestorage.googleapis.com',],
  },
}

module.exports = nextConfig
