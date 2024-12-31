/** @type {import('next').NextConfig} */
const nextConfig = {
/*   async rewrites() {
    return [
        {
            source: '/api/:path*',
            destination: 'http://localhost:3000/api/:path*',
        }, 
    ];
}, */

/* experimental: {
  missingSuspenseWithCSRBailout: false,
}, */
productionBrowserSourceMaps: true,
env: {
  BASE_URL: process.env.BASE_URL,
},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-nextfullstack.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
