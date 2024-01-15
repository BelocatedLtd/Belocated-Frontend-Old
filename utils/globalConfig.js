

export const BACKEND_URL = import.meta.env.VITE_DEV_ENV == "production"
                    ? "https://belocated-app-api.onrender.com"
                    : "http://localhost:6001"
