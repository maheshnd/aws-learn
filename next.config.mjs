/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/aws-learn' : '',
  assetPrefix: isProd ? '/aws-learn/' : '',
  images: { unoptimized: true },
};

export default nextConfig;
