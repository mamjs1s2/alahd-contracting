/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lirgzfbnktclerxrhvhe.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      // أو لدعم أي مشروع Supabase مستقبلاً:
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;