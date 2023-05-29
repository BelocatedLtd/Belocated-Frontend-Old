import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/globalConfig'
import axios from "axios"

// Pay for advert
export const adBuy = async() => {
    try {
         const response = await axios.update(`${BACKEND_URL}/api/transactions/pay`)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

// Get User Transactions List
export const getUserTransactions = async() => {
         const response = await axios.get(`${BACKEND_URL}/api/transactions/userall`)
        return response.data       
}



