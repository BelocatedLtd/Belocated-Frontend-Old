import axios from 'axios';
import { BACKEND_URL } from '../../utils/globalConfig';
import { getToken } from '../../utils/tokenHandler'
import toast from 'react-hot-toast';

// Get User
export const getAllUser = async (page, limit, search, startDate, endDate) => {
	try {
		const token = getToken(); // Assuming getToken() is defined somewhere
		const headers = {
			Authorization: `Bearer ${token}`,
		};

		const response = await axios.get(
			`${BACKEND_URL}/api/user/all?page=${page}&limit=${limit}&search=${search || ''}&startDate=${startDate || ''}&endDate=${endDate || ''}`,
			{ headers }
		);

		return response.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		toast.error(message);
	}
};
