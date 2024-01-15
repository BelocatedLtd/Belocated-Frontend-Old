import React from 'react'
import { CheckmarkIcon, toast } from 'react-hot-toast';
import { useState } from 'react'
import Loader from '../../components/loader/Loader'   
import { resendVerificationEmail } from '../../services/authServices';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaAngleDoubleRight, FaEnvelope, FaTelegram, FaWhatsapp } from 'react-icons/fa';

const VerifyEmail = () => {
    const location = useLocation();
    const { formData } = location.state || {};
    const [isLoading, setIsLoading] = useState(false)
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

    const {email} = formData || {};

    const handleResendEmail = async (e) => {
      e.preventDefault()
 
     try {
         setIsLoading(true)
      const response = await resendVerificationEmail(email) 
      if (response) {
         toast.success(`Verification link sent to ${email}`)
         
         setResendBtn(false)
         setTimer(10)
 
      }
       setIsLoading(false)
     } catch (error) {
       setIsLoading(false)
       console.log(error)
     }
     }

    return (
        <div className='w-full h-[88vh] flex items-center justify-center'>
            {isLoading && <Loader />}
          <div className='w-[350px] md:w-[600px] flex justify-center h-fit bg-primary mx-auto mt-[3rem] py-[3rem]'>
            <div className='w-full h-full flex flex-col justify-center items-center'>
                <h3 className='flex gap-1 text-xl text-gray-800 font-bold px-6 mt-2 items-center'>
                  <span className='text-red-500 font-extrabold'>Verification</span>   
                    Email Sent  
                    <CheckmarkIcon />
                </h3>
                <p className='w-fit my-[1rem] text-center px-6'>Please check the email address <span className='text-secondary font-bold'>{email}</span> for instructions to verify your belocated account</p>
                <small className='text-tertiary text-[12px] w-[300px] text-center mb-[1rem]'><span className='text-gray-800 font-bold'>Note:</span> Incase you didnt see the email in your inbox, Kindly check your spam inbox</small>

                <div className='w-full h-fit px-1 py-1 my-2 flex flex-col items-center'>
                <p className='w-[80%] text-[12px] px-2 text-center'>For any other question, kindly join our telegram group, send an email or send a WhatsApp message to chat with a customer rep.</p> 

                <ul className='flex flex-col items-center mt-2 gap-2 text-[12px] text-center'>
                <li className='flex items-center gap-1'>
                    <label className='flex items-center gap-1'><FaTelegram  className='text-[12px] text-secondary'/></label> 
                    <Link to={'https://t.me/belocated'} target="_blank" rel="noopener noreferrer" className='flex items-center gap-1'>Join Telegram Channel <FaAngleDoubleRight className='text-[12px] text-secondary'/></Link>
                </li>

                <li className='flex items-center gap-1'>
                    <label className='flex items-center gap-1'><FaWhatsapp className='text-[12px] text-green-400'/></label>
                    <Link to={'https://wa.me/2347031935276'} target="_blank" rel="noopener noreferrer" className='flex items-center gap-1'>Join Belocated WhatsApp Group <FaAngleDoubleRight className='text-[12px] text-secondary'/></Link> 
                </li>
                
                <li className='flex items-center gap-1'>
                    <label className='flex items-center gap-1'><FaEnvelope className='text-[12px] text-tertiary'/>Email:</label> 
                    <p>cs@belocated.ng</p>
                </li>
                </ul>  
              </div>
                <div className='flex items-center gap-2'>
                    {resendBtn && <button onClick={handleResendEmail} className='w-full mt-1  py-2 text-md rounded-xl bg-tertiary text-gray-100 text-center px-6 mb-5'>Resend Verification Link</button>}
                    {!resendBtn && <span className='ml-4 p-3 bg-slate-100 text-gray-800 rounded-full'>Resend in: {timer}</span> }
                  </div>
            </div>
          </div>
        </div>
      )
}

export default VerifyEmail