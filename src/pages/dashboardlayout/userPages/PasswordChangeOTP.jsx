import React from 'react'
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { changeUserPassword, confirmOTP, handlesendingPhoneOTP } from '../../../services/authServices';
import Loader from '../../../components/loader/Loader';

const initialState = {
  OTP: '',
}

const PasswordChangeOTP = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState(initialState)
    const location = useLocation();
    const { accountDetailsData } = location.state || {};
    const [timer, setTimer] = useState(10);
    const [resendBtn, setResendBtn] = useState(false)

  let interval;

  useEffect(() => {
    if (timer === 0) {
      setResendBtn(true)
      clearInterval(interval);
      return
    }

    interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [timer])

  

  const {OTP} = values
  const { userId, oldPassword } = accountDetailsData

  const handleInputChange = (e) => {
    const {name, value } = e.target;
    setValues({ ...values, [name]: value })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    if (OTP.length > 6) {
      return toast.error("Invalid Code")
    }

    if (!OTP ) {
      return toast.error("You have to input your the OTP code sent to your email")
    }

    const data = {
      userId, 
      oldPassword,
    }
      
      try {
        setIsLoading(true)
       const response = await confirmOTP(OTP)

        if (response) {
            navigate('/dashboard/passwordchange')
            setIsLoading(false)
        }

       setIsLoading(false)
        
     } catch (error) {
        setIsLoading(false)
       toast.error("OTP verification failed") 
     }
    }

    const resendOTP = async () => {
     //e.preventDefault()
     //console.log(accountDetailsData)
    // try {
    //     setIsLoading(true)
    //  const response = await handlesendingPhoneOTP(accountDetailsData)
    //  if (response) {
    //     toast.success('OTP sent to your phone number')
        
    //     setResendBtn(false)
    //     setTimer(10)

    //  }
    //   setIsLoading(false)
    // } catch (error) {
    //   setIsLoading(false)
    //   console.log(error)
    // }
    }

    return(
        <div className='w-full h-[70vh]'>
            {isLoading && <Loader />}
          <div className='flex flex-col justify-center items-center gap-4 mx-auto w-full h-full px-[2rem] md:w-1/2'>
            <div className='mb-5 flex flex-col items-center text-center'>
                <h2 className='text-sm text-gray-400 font-medium px-6 text-center'><span className='text-tertiary font-extrabold'>Verification</span> OTP Sent!</h2>
                <h3 className='w-[80%] text-xl text-gray-600 font-bold px-6 mt-2'>Please, enter the OTP code sent to your mobile number</h3>
            </div>
            <form onSubmit={handleOnSubmit} className='w-[500px]'>
                      <input type="text" name="OTP" placeholder="123456" onChange={handleInputChange} className='w-full  mb-[1rem] shadow-inner p-6 bg-transparent border border-gray-500 rounded-xl' />
    
                      <div className='flex items-center gap-2'>
                        <button type="submit" className='w-full mt-1 mb-[-0rem] py-2 text-md rounded-xl bg-secondary text-gray-100 mb-5'>Verify!</button>
                        {resendBtn && <div onClick={resendOTP} className='w-full mt-1 mb-[-0rem] py-2 text-md rounded-xl bg-tertiary text-gray-100 text-center mb-5'>Resend OTP</div>}
                        {!resendBtn && <span className='ml-4 p-3 bg-slate-100 text-gray-800 rounded-full'>{timer}</span> }
                      </div>
            </form>
          </div>
        </div>
      )
}

export default PasswordChangeOTP