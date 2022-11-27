/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/campaigns",
				destination: "/",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
