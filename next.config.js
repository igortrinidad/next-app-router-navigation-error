/** @type {import('next').NextConfig} */
const path = require('path');
const { i18n } = require('./next-i18next.config')

const nextConfig = {

  experimental: {
    appDir: true
  }, 

  reactStrictMode: true,

  swcMinify: true,

  i18n,

  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname);
    return config;
  },

}

module.exports = nextConfig
