/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
	swcMinify: true,
	images: {
		domains: ["1000logos.net", "avatars.githubusercontent.com", "platform-lookaside.fbsbx.com"],
	},
	experimental: {
		appDir: true,
	},
};

module.exports = nextConfig;
