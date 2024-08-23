import axios from 'axios'
import { BACKEND_URL } from '../../utils/globalConfig'
import { getToken } from '../../utils/tokenHandler'

const getAuthHeaders = () => {
	const token = getToken()

	if (token) {
		return {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		}
	}
}

export const getAdminDashboardData = async () => {
	const headers = getAuthHeaders()

	const response = await axios.get(
		`${BACKEND_URL}/api/admin/dashboard`,
		headers,
	)
	return response.data
}
