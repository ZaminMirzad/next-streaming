/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "getwallpapers.com",
      },
      {
        protocol: "https",
        hostname: "wallpaperaccess.com",
      },
      {
        protocol: "https",
        hostname: "wallpapercave.com",
      },
    ],
  },
};

export default nextConfig;
