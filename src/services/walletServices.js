import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/globalConfig'
import axios from "axios"

const user = JSON.parse(localStorage.getItem('user'))

// Get User Wallet Details
export const getWallet = async() => {
    try {
         const response = await axios.get(`${BACKEND_URL}/api/transactions/wallet/user`,  {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
         })
         toast.success("User wallet retrieved successfully")
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(`${message}, Error retrieving user wallet`)
     }         
}

// Get Wallet Details
export const getUserWallet = async(token) => {
    try {
         const response = await axios.get(`${BACKEND_URL}/api/transactions/wallet/user`,  {
            headers: {
                'Authorization': `Bearer ${token}`
            }
         })
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }         
}

// Fund User Wallet
export const fundWallet = async(trxData) => { 
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/transactions/fund`, trxData)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

// Withdraw User Wallet 
export const withdrawWallet = async(trxData) => { 
    try {
        const response = await axios.post(`${BACKEND_URL}/api/transactions/withdraw`, trxData)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }        
}

// Get All Withdrawals
export const getWithdrawals = async() => {
    try {
         const response = await axios.get(`${BACKEND_URL}/api/transactions/withdrawals`)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }         
}



// Get User Withdrawals
export const getUserWithdrawals = async(userId) => {
    try {
         const response = await axios.get(`${BACKEND_URL}/api/transactions/withdrawals/${userId}`)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }         
}

// Get User Withdrawals
export const confirmWithdrawal = async(withdrawalRequestId) => {
    try {
         const response = await axios.patch(`${BACKEND_URL}/api/transactions/withdrawals/confirm/${withdrawalRequestId}`)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }         
}

// Get User Withdrawals
export const deleteWithdrawal = async(withdrawalRequestId) => {
    try {
         const response = await axios.delete(`${BACKEND_URL}/api/transactions/withdrawals/delete/${withdrawalRequestId}`)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }         
}
