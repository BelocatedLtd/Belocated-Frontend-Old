import { DEV_ENV } from '../utils/config'

export const BACKEND_URL = DEV_ENV == "production"
                    ? "https://belocated-api.onrender.com"
                    : "http://localhost:6001"
