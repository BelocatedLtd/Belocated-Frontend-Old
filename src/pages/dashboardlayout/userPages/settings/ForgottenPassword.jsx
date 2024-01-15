import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { changeUserPassword } from '../../../../services/authServices';
import Loader from '../../../../components/loader/Loader';

const initialState = {
    newPassword: '',
    confirmNewPassword: '',
  }

const ForgottenPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { accountDetailsData } = location.state || {};
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState(initialState)
    const [caption, setCaption] = useState("Password Reset Successful, Login")
  
  
      const { userId, email, oldPassword } = accountDetailsData
      const {newPassword, confirmNewPassword } = values
  
  
      const handleInputChange = (e) => {
          const {name, value } = e.target;
          setValues({ ...values, [name]: value })
        }
  
        const handleOnSubmit = async(e) => {
          e.preventDefault()
  
          if ( !newPassword || !confirmNewPassword ) {
              return toast.error("All fields are required")
            }
      
            if (newPassword.length < 6) {
              return toast.error("Password must be upto 6 characters")
            }
      
            if (newPassword !== confirmNewPassword) {
              return toast.error("Passwords do not match")
            }
      
            const formData = {
              userId, 
            email,
              newPassword
            }
  
            setIsLoading(true)
          try {
              const passwordChanged = await changeUserPassword(formData)
  
              if (!passwordChanged) {
                toast.error('Failed to changed password')
              }
  
              if (passwordChanged) {
                toast.error('Password Changed Sucessfully')
                navigate('/success', { state:{ caption }})
              }
              setIsLoading(false)
          } catch (error) {
              
          }
        }
    return(
        <div className='w-fit md:w-full h-[70vh]'>
            {isLoading && <Loader />}
          <div className='flex w-fit flex-col justify-center items-center gap-4 mx-auto h-full px-[2rem] md:w-1/2'>
            <div className='mb-5 flex flex-col items-center text-center'>
                <h2 className='text-sm text-gray-400 font-medium px-6 text-center'><span className='text-tertiary font-extrabold'>Set</span> New Password!</h2>
            </div>
            <form onSubmit={handleOnSubmit} className='w-fit md:w-[500px]'>
                        <label htmlFor="new password"> New Password</label>
                      <input type="password" name="newPassword" placeholder="123456" onChange={handleInputChange} className='w-[200px] md:w-full  mb-[1rem] shadow-inner p-6 bg-transparent border border-gray-500 rounded-xl' />

                      <label htmlFor="new password">Confirm New Password</label>
                      <input type="password" name="confirmNewPassword" placeholder="123456" onChange={handleInputChange} className='w-[200px] md:w-full  mb-[1rem] shadow-inner p-6 bg-transparent border border-gray-500 rounded-xl ' />
    
                      <div className='flex items-center gap-2'>
                        <button type="submit" className='w-full mt-1 mb-[-0rem] py-2 text-md rounded-xl bg-secondary text-gray-100 mb-5'>Change Password!</button>
                      </div>
            </form>
          </div>
        </div>
      )
}

export default ForgottenPassword