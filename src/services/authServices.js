import axios from "axios"
import { toast } from "react-hot-toast"
import { BACKEND_URL } from '../../utils/globalConfig'

//Create New User
export const createNewUser = async(formData) => {
    try {
         const response = await axios.post(`${BACKEND_URL}/api/user/register`, formData )
         if (response.statusText === "Created") {
            toast.success("User created successfully")
          }
        return response.data 
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Login User
export const loginUser = async(formData) => {
    try {
         const response = await axios.post(`${BACKEND_URL}/api/user/login`, formData)
         if (response.statusText === "OK") {
            //console.log(response.data)
            toast.success("User Logged in Successfully")
        }
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         console.log(error)
         toast.error(message)
     }
            
}

//Logout User
export const logoutUser = async() => {
    try {
         await axios.get(`${BACKEND_URL}/api/user/logout`)
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Get Login Status
export const getLoginStatus = async() => {
    try {
         const response = await axios.get(`${BACKEND_URL}/api/user/loggedin`)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Get User
export const getUser = async() => {
    try {
         const response = await axios.get(`${BACKEND_URL}/api/user`)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Update user details
export const updateUser = async (formData) => {
    const response = await axios.patch(`${BACKEND_URL}/api/user/update`, formData) 
    return response.data
}


//Forgot Password
export const retrieveUserPassword = async() => {
    try {
         const response = await axios.post(`${BACKEND_URL}/api/user/forgotpassword`)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

