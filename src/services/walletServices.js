import { toast } from 'react-hot-toast';
import { BACKEND_URL } from '../../utils/globalConfig';
import axios from "axios";
import { getToken } from '../../utils/tokenHandler';

// Function to Get Authorization Headers
const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get User Wallet Details
export const getWallet = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/transactions/wallet/user`,
            { headers: getAuthHeaders() } // Correct header format
        );
        return response.data;
    } catch (error) {
        toast.error(`${error.response?.data?.message || error.message}, Error retrieving user wallet, please Logout`);
    }
};

// Get User Wallet Details (Duplicate Function, Kept for Clarity)
export const getUserWallet = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/transactions/wallet/user`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }
};

// Get Single User Details
export const getSingleUserDetails = async (id) => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/admin/user/${id}`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }
};

// Fund User Wallet
export const fundWallet = async (trxData) => {
    try {
        const response = await axios.patch(
            `${BACKEND_URL}/api/transactions/fund`,
            trxData,
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }
};

// Withdraw from Wallet
export const withdrawWallet = async (trxData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/transactions/withdraw`,
            trxData,
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }
};

// Get All Withdrawals
export const getWithdrawals = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/transactions/withdrawals`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }
};

// Get User Withdrawals
export const getUserWithdrawals = async (userId) => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/transactions/withdrawals/${userId}`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }
};

// Confirm Withdrawal Request
export const confirmWithdrawal = async (withdrawalRequestId, formData) => {
    try {
        const response = await axios.patch(
            `${BACKEND_URL}/api/transactions/withdrawals/confirm/${withdrawalRequestId}`,
            formData,
            { headers: getAuthHeaders() } // Merged headers correctly
        );
        return response.data;
    } catch (error) {
        console.error("Request Error:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || error.message);
        throw error;
    }
};

// Delete Withdrawal Request
export const deleteWithdrawal = async (withdrawalRequestId) => {
    try {
        const response = await axios.delete(
            `${BACKEND_URL}/api/transactions/withdrawals/delete/${withdrawalRequestId}`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }
};
