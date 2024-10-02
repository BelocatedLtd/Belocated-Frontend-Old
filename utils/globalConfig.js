export const BACKEND_URL =
	import.meta.env.VITE_DEV_ENV === 'production'
		? 'https://dolphin-app-esx2u.ondigitalocean.app'
		: 'http://localhost:6001'
