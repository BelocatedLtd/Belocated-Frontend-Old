import axios from 'axios';
import { BACKEND_URL } from '../../utils/globalConfig';
import { getToken } from '../../utils/tokenHandler';
import { toast } from 'react-toastify'; // Assuming you use react-toastify

const getAuthHeaders = () => {
    const token = getToken();

    return token
        ? { Authorization: `Bearer ${token}` }
        : {}; // Return an empty object if no token
};

// Get All Users
export const getAllUser = async (page, limit, search, startDate, endDate) => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/user/all?page=${page}&limit=${limit}&search=${search || ''}&startDate=${startDate || ''}&endDate=${endDate || ''}`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
        throw new Error(message); // Re-throw to handle it upstream if needed
    }
};
