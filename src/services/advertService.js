import { BACKEND_URL } from '../../utils/globalConfig'
import axios from "axios"

// Create Advert
export const createAdvert = async (formDataForPayment) => {
    const response = await axios.post(`${BACKEND_URL}/api/adverts/create`, formDataForPayment)
   return response.data   
}

// Get User Adverts
export const getUserAdverts = async() => {
       const response = await axios.get(`${BACKEND_URL}/api/adverts`)
      return response.data      
}

// Get All User Adverts
export const getAllUserAdverts = async() => {
    const response = await axios.get(`${BACKEND_URL}/api/adverts/all`)
   return response.data      
}