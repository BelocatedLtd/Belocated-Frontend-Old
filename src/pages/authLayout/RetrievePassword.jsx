import React from 'react'
import close from '../../assets/close.svg'
import { LoaderIcon, toast } from 'react-hot-toast';
import { useState } from 'react';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';
import PasswordVerify from '../dashboardlayout/userPages/settings/PasswordVerify';
import { resendOTPVerificationEmail } from '../../services/authServices';
import ForgottenPasswordVerify from '../dashboardlayout/userPages/settings/ForgottenPasswordVerify';


const initialState = {
  email: '',
}

const RetrievePassword = () => {
  const [values, setValues] = useState(initialState)
  const [isLoading, setIsLoading] = useState()
  const [toggleOTPVerify, setToggleOTPVerify] = useState(false)
  const [userId, setUserId] = useState('')

  const {email} = values

  const handleInputChange = (e) => {
    const {name, value } = e.target;
    setValues({ ...values, [name]: value })
  }

  const accountDetailsData = {
    userId: '',
    email,
    oldPassword: ''
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    //Verifications
      if (!email ) {
        return toast.error("You have to input your Email")
      }

      setIsLoading(true)
      //Sending Email Verification OTP
      const OTPSent = await resendOTPVerificationEmail(email)
      setIsLoading(false)

      if (!OTPSent) {
        setIsLoading(false)
        toast.error('Error Sending Verification Email')
        return
      }

      if (OTPSent && OTPSent.message === "Verification OTP Sent") {
        setUserId(OTPSent?.userId)
        setIsLoading(true)

        setToggleOTPVerify(true)
        setIsLoading(false)
        toast.success('Please, verify your account')
        return
      }
      setIsLoading(false)
    }

    const handleModal = () => {
      setToggleOTPVerify(!toggleOTPVerify)
    }

  return(
    <div className='w-full h-[70vh]'>
      {toggleOTPVerify && <ForgottenPasswordVerify accountDetailsData={accountDetailsData} handleModal={handleModal} email={email} userId={userId}/>}
        {isLoading && <Loader />}
      <div className='flex flex-col justify-center items-center gap-4 mx-auto w-full h-full px-[2rem] md:w-1/2'>
        <div className='mb-5 flex justify-center text-center'>
            <h3 className='w-[80%] text-xl text-gray-600 font-bold px-6 mt-2'>Enter your registered email to retreive your forgotten password</h3>
        </div>
        <form onSubmit={handleOnSubmit} className=''>
                  <input type="email" name="email" placeholder="Email" onChange={handleInputChange} className='w-full  mb-[1rem] shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl' />

                  <button type="submit" className=' w-full mt-1 mb-[-0rem] py-2 text-md rounded-xl bg-secondary text-gray-100 mb-5'>Retrieve Password! {isLoading && <LoaderIcon />}</button>
        </form>
      </div>
    </div>
  )
}

export default RetrievePassword