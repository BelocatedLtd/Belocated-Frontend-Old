import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { resendOTPVerificationEmail, verifyOldUserPassword } from '../../../../services/authServices'
import { toast } from 'react-hot-toast'
import Loader from '../../../../components/loader/Loader'
import PasswordVerify from './PasswordVerify'

const initialState = {
    password: ""
  } 


const PasswordChange = ({user}) => {
    const [passwordChange, setPasswordChange] = useState(initialState)
    const [isLoading, setIsLoading] = useState()
    const [toggleOTPVerify, setToggleOTPVerify] = useState(false)

//Password InPut Change
const handlePasswordInputChange = (e) => {
  e.preventDefault()
  const {name, value } = e.target;
  setPasswordChange({ ...passwordChange, [name]: value })
}

const {password} = passwordChange

const accountDetailsData = {
  userId: user?.id,
  email: user?.email,
  oldPassword: password
}

const handleSubmit = async(e) => {
    e.preventDefault()

    //Verifications
    if (!password) {
        toast.error("Input your old password")
        return
      }

    if (password.length < 6) {
        toast.error("Incorrect Password")
        return
    }

        setIsLoading(true)
        const oldPasswordOk = await verifyOldUserPassword(accountDetailsData)

        setIsLoading(false)
        if(!oldPasswordOk) {
          setIsLoading(false)
          toast.error('Error, check the password and try again')
          return
        }
     
     if (oldPasswordOk === "Password is Correct") {
      setIsLoading(true)

      //Sending Email Verification OTP
      const OTPSent = await resendOTPVerificationEmail(user.email)
      
      setIsLoading(false)

      if (!OTPSent) {
        setIsLoading(false)
        toast.error('Error Sending Verification Email')
        return
      }

      if (OTPSent && OTPSent.message === "Verification OTP Sent") {
        setIsLoading(true)

        setToggleOTPVerify(true)
        setIsLoading(false)
        toast.success('Please, verify your account')
        return
      }
      setIsLoading(false)
     }
}


const handleModal = () => {
  setToggleOTPVerify(!toggleOTPVerify)
}

  return (
    <div className='box p-6 shadow-lg'>
      {toggleOTPVerify && <PasswordVerify accountDetailsData={accountDetailsData} handleModal={handleModal} email={user.email}/>}
      <form onSubmit={handleSubmit}>
        {isLoading && <Loader />}
          <label htmlFor="accountDetails reset" className='font-bold'>Change Password</label>
              <div className='flex flex-col mt-3 mb-3'>
                  <label htmlFor="Password Change" className='text-left'>Old Password</label>
                  <input type='password' name="password" placeholder={"******"} onChange={handlePasswordInputChange} className='w-full shadow-inner p-3 border border-gray-200 rounded-xl text-gray-400' />

                  <button className='w-full bg-tertiary text-gray-100 p-2 rounded-2xl mt-6'>Change Password</button>
              </div>
      </form>
    </div>
    
  )
}

export default PasswordChange