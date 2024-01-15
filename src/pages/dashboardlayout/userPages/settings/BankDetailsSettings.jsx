import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER, selectUser } from '../../../../redux/slices/authSlice'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Loader from '../../../../components/loader/Loader'
//import { handlesendingPhoneOTP } from '../../../../services/authServices'
import { useNavigate } from 'react-router-dom'
import bankNames from '../../../../components/data/banks'
import PasswordVerify from './PasswordVerify'
import VerifyOTP from './VerifyOTP'
import { useEffect } from 'react'
import { resendOTPVerificationEmail, updateUserBankAccountDetails } from '../../../../services/authServices'

const BankDetailsSettings = ({user}) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [toggleOTPVerify, setToggleOTPVerify] = useState(false)
    const dispatch = useDispatch()
    


    const bankDetailsInitialState = {
        bankName: user?.bankName,
        bankAccountNumber: user?.bankAccountNumber,
        accountHolderName: user?.accountHolderName,
        }
      
        const [bankAccountDetails, setBankAccountDetails] = useState(bankDetailsInitialState)

    
// Bank Details InPut Change
const handleBankInputChange = (e) => {
    const {name, value } = e.target;
    setBankAccountDetails({ ...bankAccountDetails, [name]: value })
  }

  const {bankName, bankAccountNumber, accountHolderName} = bankAccountDetails

  const accountDetailsData = {
    userId: user?.id,
    bankName,
    bankAccountNumber,
    accountHolderName
  }

    const handleSubmit = async(e) => {
      e.preventDefault()

      //Input Verifications
      if (!bankName && !accountHolderName && !bankAccountNumber) {
        toast.error("Please enter your Banking Details")
        return
      }

      if (!bankName) {
        toast.error("Please enter your Bank's Name")
        return
      }

      if (!accountHolderName) {
        toast.error("Please enter your Bank Account's Name")
        return
      }

      if (!bankAccountNumber) {
        toast.error("Please enter your Bank Account's Number")
        return
      }

      if (bankAccountNumber.length > 10 || bankAccountNumber.length < 10) {
        toast.error("Please enter a valid Nigerian Bank Account Number")
        return
      }

      setIsLoading(true)
      const updatedUserDetails = await updateUserBankAccountDetails(accountDetailsData)
      setIsLoading(false)
    
        if (!updatedUserDetails) {
        toast.error("Failed to update Bank Details")
        return
        }
                
        if(updatedUserDetails) {
            await dispatch(SET_USER(updatedUserDetails))
    
            navigate(`/dashboard/profile`)
            toast.success('User Account Details Updated!')
            setIsLoading(false)
        }

      //Sending OTP to email
      // setIsLoading(true)
      // const OTPSent = await resendOTPVerificationEmail(user.email)
      // setIsLoading(false)

      // if (!OTPSent) {
      //   setIsLoading(false)
      //   toast.error('Error Sending Verification Email')
      //   return
      // }

      // if (OTPSent && OTPSent.message === "Verification OTP Sent") {
      //   setIsLoading(false)

      //   setToggleOTPVerify(true)
      //   toast.success('Please, verify your account')
      //   return
      // }
    }

      // const handleModal = () => {
      //   setToggleOTPVerify(!toggleOTPVerify)
      // }

  return (
    <div className='box p-6 shadow-lg'>
      {/* {toggleOTPVerify && <VerifyOTP accountDetailsData={accountDetailsData} handleModal={handleModal} email={user.email}/>} */}
      <form onSubmit={handleSubmit} >
        {isLoading && <Loader />}
            <label htmlFor="accountDetails reset" className='font-bold'>Bank Details</label>
                <div className='flex flex-col mt-3 mb-3'>
                    <label htmlFor="Product Name " className='text-left'>Bank Name</label>
                    <select type='text' name="bankName" onChange={handleBankInputChange} placeholder={bankAccountDetails.bankName ? bankAccountDetails.bankName : "Bank Name"} className='w-full shadow-inner p-3 border border-gray-200 rounded-xl text-gray-400'>
                    <option value="">{bankAccountDetails.bankName ? bankAccountDetails.bankName : "Select Banking Institution"} </option>
                    {bankNames.map((bank, index) => (
                        <option key={index} value={bank}>{bank}</option>
                      ))
                    }
                    </select>

                    <div className='flex flex-col md:gap-6 w-full md:flex-row border-b border-gray-100 pb-[2rem]'>
                      <div className='flex flex-col mt-3 mb-3'>
                          <label htmlFor="bank account name" className='text-left mb-1 ml-1'>Account Name</label>
                          <input type="text" name={'accountHolderName'} placeholder={bankAccountDetails.accountHolderName ? bankAccountDetails.accountHolderName : "Bank Account Name"} onChange={handleBankInputChange} className='w-full shadow-inner p-3 border border-gray-200 rounded-xl text-gray-400'/>
                      </div>
                      <div className='flex flex-col mt-3 mb-3'>
                          <label htmlFor="Account Number" className='text-left mb-1 ml-1'>Account Number</label>
                          <input type="number" name="bankAccountNumber" placeholder={bankAccountDetails.bankAccountNumber ? bankAccountDetails.bankAccountNumber : "Bank Account Number"} onChange={handleBankInputChange} className='w-full shadow-inner p-3 border border-gray-200 rounded-xl text-gray-400'/>
                      </div>
                    </div>

                    <button className='w-full bg-tertiary text-gray-100 p-2 rounded-2xl'>Update</button>
                </div>
      </form>
    </div>
    
  )
}

export default BankDetailsSettings