import axios from 'axios'
import { BACKEND_URL } from '../../utils/globalConfig'
import { getToken } from '../../utils/tokenHandler'
import toast from 'react-hot-toast';

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

//Get User
export const getAllUser = async (page, limit, search, startDate,endDate) => {
	const headers = getAuthHeaders()
	try {
		const response = await axios.get(
			`${BACKEND_URL}/api/user/all?page=${page}&limit=${limit}&search=${search || ''}&startDate=${startDate || ''}&endDate=${endDate || ''}`,
			{ headers }
		  );
		return response.data
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		toast.error(message)
	}
}
