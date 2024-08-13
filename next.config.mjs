/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'smu7wqatocnljzs9.public.blob.vercel-storage.com',
				port:''
			},{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port:''
			},{
				protocol: 'https',
				hostname: 'plus.unsplash.com',
				port:''
			},{
				protocol: 'https',
				hostname: 'www.pengroup.com',
				port:''
			},{
				protocol: 'https',
				hostname: 'www.esl.ac.uk',
				port:''
			}
		]
	},
	eslint: {
		ignoreDuringBuilds: true // This allows builds to succeed even if there are ESLint errors
	}
};

export default nextConfig;
