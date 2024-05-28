/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['https://discussit-tan.vercel.app/']
  }
}

module.exports = nextConfig
