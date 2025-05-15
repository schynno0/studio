
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ibb.co',
        port: '',
        pathname: '/**',
      },
      { // Added for i.ibb.co
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      { // Added for i.postimg.cc
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
        pathname: '/**',
      },
      { // Added for www.imghippo.com
        protocol: 'https',
        hostname: 'www.imghippo.com',
        port: '',
        pathname: '/**',
      },
      { // Added for iili.io
        protocol: 'https',
        hostname: 'iili.io',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
