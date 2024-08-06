

export const BACKEND_URL = import.meta.env.VITE_DEV_ENV == "production"
                    ? "https://belocated-backend.onrender.com"
                    : "http://localhost:6001"
