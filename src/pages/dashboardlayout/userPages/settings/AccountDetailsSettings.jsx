import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER, SET_USERNAME, selectUser } from '../../../../redux/slices/authSlice'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Loader from '../../../../components/loader/Loader'
import { handlesendingPhoneOTP, resendOTPVerificationEmail, updateUserAccountDetails } from '../../../../services/authServices'
import VerifyAccountOTP from './VerifyAccountOTP'
import { useNavigate } from 'react-router-dom'



const AccountDetailsSettings = ({user}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [toggleOTPVerify, setToggleOTPVerify] = useState(false)

    const accountDetailsInitialState = {
        username: user?.username,
        email: user?.email,
        phone: user?.phone,
      }

      const [accountDetails, setAccountDetails] = useState(accountDetailsInitialState)


    //Account Details InPut Change
    const handleAccountDetailsInputChange = (e) => {
    const {name, value } = e.target;
    setAccountDetails({ ...accountDetails, [name]: value })
  }
  
  const accountDetailsData = {
    userId: user?.id,
    username: accountDetails?.username,
    email: accountDetails?.email,
    phone: accountDetails?.phone,
    token: user?.token
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    if (accountDetails?.phone == user.phone && accountDetails?.email == user.email && accountDetails?.username == user.username) {
      // User wants to change nothing...
      toast.success("No changes made")
      setIsLoading(false)
      
    } else if (accountDetails?.phone !== user.phone && accountDetails?.email == user.email && accountDetails?.username == user.username) {
      // User wants to change only  phone

      if (accountDetails.phone.length > 11 || accountDetails.phone.length < 10) {
        toast.error("Invalid phone number, check number and try again")
        setIsLoading(false)
        return
      }

      if (accountDetails.phone.length == 11) {
        const phoneNumber = accountDetails.phone
        const firstDigit = parseInt(phoneNumber.toString()[0]);

        if (firstDigit === 0) {
          toast.error("Please start the phone number without the first zero(0)")
        }
        
        if (firstDigit !== 0) {
          toast.error("Invalid phone number, check number and try again")
        }
        setIsLoading(false)
        return
      }



      toast.success("Changing User Phone Number...")
       setIsLoading(true)
        
        const updatedUserDetails = await updateUserAccountDetails(accountDetailsData)
    
        setIsLoading(false)
        if (!updatedUserDetails) {
        toast.error("Failed to update user phone number")
        return
        }
                
        if(updatedUserDetails) {
            await dispatch(SET_USER(updatedUserDetails))
    
            navigate(`/dashboard/profile`)
            toast.success('User Phone number Updated!')
            setIsLoading(false)
        }
        setIsLoading(false)

    } else {
      // User wants to change both phone and username or just username

      const OTPSent = await resendOTPVerificationEmail(user.email)

    setIsLoading(false)
    if (!OTPSent) {
      setIsLoading(false)
      toast.error('Error Sending Verification Email')
      return
    }

    if (OTPSent && OTPSent.message === "Verification OTP Sent") {
      setIsLoading(false)
      setToggleOTPVerify(true)
      toast.success('Please, verify your account')
      return
    }
    }
    setIsLoading(false)
  }

  const handleModal = () => {
    setToggleOTPVerify(!toggleOTPVerify)
  }


  return (
    <div>
      {isLoading && <Loader />}
      {toggleOTPVerify && <VerifyAccountOTP accountDetailsData={accountDetailsData} handleModal={handleModal} email={user?.email}/>}
        <form onSubmit={handleSubmit} className='w-full box p-6 shadow-lg'>
        
          <label htmlFor="accountDetails reset" className='font-bold'>Authentication Details</label>
              <div className='flex flex-col mt-3 mb-3'>
                  <label htmlFor="Product Name " className='text-left'>Username</label>
                  <input type='text' name="username" placeholder={accountDetails?.username} value={accountDetails.username} onChange={handleAccountDetailsInputChange} disabled className='w-full shadow-inner p-3 border 
                  border-gray-200 rounded-xl text-gray-400' />
                  

                  <div className='w-full flex flex-col md:gap-6 md:flex-row border-b border-gray-100 pb-[2rem]'>
                    <div className='flex flex-col mt-3 mb-3'>
                        <label htmlFor="Email" className='text-left mb-1 ml-1'>Email</label>
                        <input type="email" name='email' placeholder={accountDetails?.email} value={accountDetails.email} onChange={handleAccountDetailsInputChange} disabled  className='w-full shadow-inner p-3 border border-gray-200 rounded-xl text-gray-400'/>
                    </div>
                    <div className='flex flex-col mt-3 mb-3'>
                        <label htmlFor="Phone" className='text-left mb-1 ml-1'>Phone Number</label>
                        <input type="number" name="phone" placeholder="803 000 0000" value={accountDetails.phone} onChange={handleAccountDetailsInputChange} className='w-full shadow-inner p-3 rounded-xl'/>
                        {/* <small className='text-[12px] text-gray-600'>Start your phone number with 234</small> */}
                    </div>
                  </div>

                  <button className='w-full bg-tertiary text-gray-100 p-2 rounded-2xl'>Edit</button>
              </div>
    </form>
    </div>
    
  )
}

export default AccountDetailsSettings