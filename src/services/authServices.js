import axios from "axios"
import { toast } from "react-hot-toast"
import { BACKEND_URL } from '../../utils/globalConfig'
import { getToken } from "../../utils/tokenHandler"

const getAuthHeaders = () => {
    const token = getToken()

    if (token) {
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }
}


//Create New User
export const createNewUser = async(formData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/user/register`, formData, {
            
           withCredentials: true, // Include credentials in this request
       }
       );
        if (response.statusText === "Created") {
         }
       return response.data 
    }catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Create New User Ref
export const createNewUserRef = async(formData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/user/refregister`, formData, {
          
           withCredentials: true, // Include credentials in this request
       }
   );
        if (response.statusText === "Created") {
         }
       return response.data 
    } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Create New User From Ref Challenge
export const createNewUserRefChal = async(formData) => {
    try {
         const response = await axios.post(`${BACKEND_URL}/api/user/refchalregister`, formData, {
            
           withCredentials: true, // Include credentials in this request
       });
         if (response.statusText === "Created") {
          }
        //   console.log(response.data)
        return response.data 
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Login User
export const loginUser = async(formData) => {
    const headers =getAuthHeaders();
    try {
         const response = await axios.post(`${BACKEND_URL}/api/user/login`, formData, {
            ...headers,
           withCredentials: true, // Include credentials in this request
       });
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Get Login Status
export const getLoginStatus = async() => {
    const headers = getAuthHeaders();
    try {
        const response = await axios.get(`${BACKEND_URL}/api/user/loggedin`, {
           ...headers,
           withCredentials: true, // Include credentials in this request
       }
   );
       return response.data
    } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Get User
export const getUser = async() => {
    const headers = getAuthHeaders();
    try {
         const response = await axios.get(`${BACKEND_URL}/api/user`, headers)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(`${message}, Error retrieving user data`)
     }
            
}

//Update user details
export const updateUser = async (formData) => {
    const headers = getAuthHeaders();
    const response = await axios.patch(`${BACKEND_URL}/api/user/update`, formData,{
            ...headers,
           withCredentials: true, // Include credentials in this request
       });
    return response.data
}

//Update user account details
export const updateUserAccountDetails = async (verificationData) => {
    const headers = getAuthHeaders();
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/user/update/accountdetails`, verificationData, {
            ...headers,
            withCredentials:true
        }) 
         return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
    }
}
//Update user account details
export const updateUserBankAccountDetails = async (verificationData) => {
    const headers = getAuthHeaders();
    try {
        const response = await axios.patch(
            `${BACKEND_URL}/api/user/update/bankaccountdetails`, 
            verificationData, {
                ...headers,
                withCredentials: true, // Include credentials in this request
            }
        );
        return response.data;
    } catch (error) {
        let message;
        
        // Check if error response exists and has a message
        if (error.response) {
            // If your server response has a custom message
            message = error.response.data.message || "An unexpected error occurred.";
        } else if (error.request) {
            // The request was made but no response was received
            message = "No response received from the server.";
        } else {
            // Something happened in setting up the request that triggered an Error
            message = error.message || "An error occurred while processing your request.";
        }

        toast.error(message);
    }
}




//Verify User Password
export const verifyUserPassword = async(data) => {
    try {
         const response = await axios.post(`${BACKEND_URL}/api/user/verifypasswordchange`, data)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Verify Old User Password
export const verifyOldUserPassword = async(data) => {
    const headers = getAuthHeaders();
    try {
         const response = await axios.post(`${BACKEND_URL}/api/user/verifyoldpassword`, data, headers)
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Change Password
export const changeUserPassword = async(data) => {
    try {
         const response = await axios.post(`${BACKEND_URL}/api/user/changePassword`, data,{
            ...headers,
            withCredentials:true
        }) 
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Reset forgotten password
export const forgottenPasswordChange = async(data) => {
    try {
         const response = await axios.post(`${BACKEND_URL}/api/user/forgotpassword`, data,{
            ...headers,
            withCredentials:true
        }) 
        return response.data
     } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
     }
            
}

//Resend Verification Email
export const resendVerificationEmail = async(email) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/user/authverification/${email}`)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
    }
} 

export const resendOTPVerificationEmail = async(email) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/user/authverificationpassword/${email}`)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
    }
}

//Email Verified
export const emailVerified = async(emailToken) => {
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/user/emailverify/${emailToken}`)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
    }
}

//Email OTP Verified
export const confirmEmailOTP = async(OTP) => {
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/user/confirmemailOTP/${OTP}`)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
    }
}

//Send Phone OTP
export const handlesendingPhoneOTP = async(accountDetailsData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/user/verifyphone`, accountDetailsData,{
            ...headers,
            withCredentials:true
        }) 
            return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
    }
}

//Phone Verify
export const confirmOTP = async(OTPData) => {
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/user/confirmphone`, OTPData)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
    }
}

//Delete User
export const handleManageUser = async(formData) => {
    const headers = getAuthHeaders();
    console.log(formData)
    if (formData.status == "") {
        toast.error("Please select an option")
        return
    }
    
    try {
        const response = await axios.post(`${BACKEND_URL}/api/user/manage/${formData.userId}`, formData, headers)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message) 
    }
}

//Logout User
// export const logoutUser = async() => {
//     try {
//          await axios.get(`${BACKEND_URL}/api/user/logout`)
//      } catch (error) {
//          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//          toast.error(message)
//      }
            
// }



