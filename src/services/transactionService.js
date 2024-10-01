import axios from 'axios'
import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/globalConfig'
import { getToken } from '../../utils/tokenHandler'

const getAuthHeaders = () => {
	const token = getToken()

	if (token) {
		return {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	}
}

// Pay for advert
export const adBuy = async () => {
	const headers = getAuthHeaders()
	try {
		const response = await axios.update(
			`${BACKEND_URL}/api/transactions/pay`,
			headers,
		)
		return response.data
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(message)
	}
}

// Get User Transactions List
export const getUserTransactions = async (page, limit) => {
	const headers = getAuthHeaders()
	const response = await axios.get(
		`${BACKEND_URL}/api/transactions/userall?page=${page}&limit=${limit}`,
		headers,
	)
	return response.data
}

// Get Transactions List
export const getAllTransactions = async (page, limit) => {
	const headers = getAuthHeaders()
	const response = await axios.get(
		`${BACKEND_URL}/api/transactions/all?page=${page}&limit=${limit}`,
		headers,
	)
	return response.data
}
