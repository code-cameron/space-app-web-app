/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['s3-us-west-2.amazonaws.com'], // Allowing this domain for external images
    },
  };
  
  export default nextConfig;
  