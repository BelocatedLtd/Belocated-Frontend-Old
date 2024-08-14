

export const BACKEND_URL = import.meta.env.VITE_DEV_ENV == "production"
                    ? "admin-belocated-backend.vercel.app"
                    : "http://localhost:6001"
