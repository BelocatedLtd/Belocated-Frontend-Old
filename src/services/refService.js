import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/globalConfig'
import axios from "axios"
import { getToken } from '../../utils/tokenHandler'


const getAuthHeaders = () => {
    const token = getToken()

    if (token) {
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
    }
}

// Ref Challenge

// Get Ongoing Ref Challenge
export const getOngoingRefChallenge = async() => {
    const response = await axios.get(`${BACKEND_URL}/api/ref/challenge`)
   return response.data      
}

// Get All Ref Challenges
export const getAllChallenges = async() => {
    const headers = getAuthHeaders();
    const response = await axios.get(`${BACKEND_URL}/api/ref/challenge/all`, headers)
   return response.data      
}

// Ref Bonus

// Convert Ref bonus pts to wallet funds
export const handleRefPtsConv = async(userId) => {
    const headers = getAuthHeaders();
    const response = await axios.post(`${BACKEND_URL}/api/ref/bonus/convert`, userId, headers)
    //console.log(response)
    return response.data       
}