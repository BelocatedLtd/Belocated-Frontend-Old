

export const BACKEND_URL =
	import.meta.env.VITE_DEV_ENV == 'production'
		? 'https://belocated-backend-gamma.vercel.app'
		: 'http://localhost:6001'
