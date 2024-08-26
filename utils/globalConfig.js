export const BACKEND_URL =
	import.meta.env.VITE_DEV_ENV == 'production'
		? 'https://admin-belocated-backend-sooty.vercel.app'
		: 'http://localhost:6001'
