/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["isomorphic-dompurify", "jsdom"],
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.ivtccampus.lk',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
