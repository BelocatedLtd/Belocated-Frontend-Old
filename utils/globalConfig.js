

export const BACKEND_URL = import.meta.env.VITE_DEV_ENV == "production"
                    ? "https://backend-dev-p804.onrender.com"
                    : "http://localhost:6001"
