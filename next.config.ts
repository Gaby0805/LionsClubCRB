/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Permite builds mesmo com erros de TypeScript
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
