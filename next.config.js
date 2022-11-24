/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["1000logos.net", "avatars.githubusercontent.com"],
	},
	experimental: {
		appDir: true,
	},
};

module.exports = nextConfig;
