import React from 'react'
import { toast } from 'react-hot-toast'
import { useState } from 'react';
import { createNewUserRef, resendVerificationEmail } from '../../services/authServices';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import VerifyEmail from './VerifyEmail';
import io from 'socket.io-client'
import { BACKEND_URL } from '../../../utils/globalConfig'
import { useEffect } from 'react';

const socket = io.connect(`${BACKEND_URL}`)

const initialState = {
  username: '',
  password: '',
}

const RefRegister = () => {
  const {referrerId} = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [values, setValues] = useState(initialState)


  useEffect(() => {
    
  }, [])

    const {username, email, password, password2 } = values

    const handleInputChange = (e) => {
      e.preventDefault()
        const {name, value } = e.target;
        setValues({ ...values, [name]: value })
      }

      if (!referrerId) {
        toast.error("Error trying to register")
        return 
      }

      const formData = {
        username: username.toLowerCase(), 
        email: email.toLowerCase(),
        password,
        referrerId
      }

    const toggleEmailVerifyModal = async (e) => {
    e.preventDefault()

      if (!username || !email || !password || !password2 ) {
        return toast.error("All fields are required")
      }

      if (password.length < 6) {
        toast.error("Password must be upto 6 characters")
        return 
      }

      if (password !== password2) {
        toast.error("Passwords do not match")
        return 
      }

      setIsLoading(true)
      const response = await createNewUserRef(formData)

      console.log(response)

      if (!response) {
        toast.error("Error trying to register user")
      }

      if (response?.message === "Email has already been registered, please login") {
        toast.error("Email has already been registered, please login")
        navigate('/login')
        return
      }

      if (!response._id) {
        toast.error("user not registered")
        return
      }

      if (response._id) {
        toast.success("User Profile Created Successfully, proceeding to verification...")

        //Emit socket io event to the backend
        const emitData = {
          userId: response?._id,
          action: `@${response?.username} just registered`
        }

      //Emit Socket event to update activity feed
      socket.emit('sendActivity', emitData) 
        
        // Start sending email verification link
        const emailResponse = resendVerificationEmail(email)
        .catch((error)=> {
          toast.error("Failed to send verification email")
          setIsLoading(false)
        })
        .then((res) =>  {
          navigate('/verify-email', { state:{ formData } })
          setRegBtn(!regBtn)
          setIsLoading(false)
        })
        
        toast.promise(emailResponse, {
            loading: 'Sending verification email...',
            success: <b>Email sent</b>,
            error: <b>Failed to send email</b>
          }
        );
      }
      
    }

    // Handle retrieve password
    const handleRetrievePass = (e) => {
      e.preventDefault()
    }

    return (
        <div className='w-full h-screen'>
          {isLoading && <Loader />}
          <div className='container h-full flex items-center mx-auto justify-center'>
          <div className='h-[600px] bg-primary w-fit md:w-[450px] border border-gray-200'>
              <div className='modal__header__text flex flex-col items-center mt-[3rem] mb-[1.7rem]'>
                <h2 className='text-sm text-gray-400 font-medium px-6 text-center'><span className='text-secondary font-extrabold'>200+</span> simple and profitable tasks posted today!</h2>
                <h3 className='text-xl text-gray-800 font-bold px-6 mt-2 text-center'><span className='text-red-500'>Register</span> to start making money on <span className='text-secondary font-extrabold'>Belocated</span></h3>
              </div>
    
            <div className='w-full h-fit px-[2rem] md:w-full'>
                <form onSubmit={toggleEmailVerifyModal} className=''>
                    <label htmlFor="username" className='mr-[1rem]'>Username</label>
                    <input type="username" name="username" onChange={handleInputChange} className={`w-full  mb-[1rem] shadow-inner p-3 bg-transparent border ${isError ? 'border-red-400' : 'border-gray-200'} rounded-xl`} />
    
                    <label htmlFor="email" className='mr-[1rem]'>Email</label>
                    <input type="email" name="email" onChange={handleInputChange} className={`w-full  mb-[1rem] shadow-inner p-3 bg-transparent border ${isError ? 'border-red-400' : 'border-gray-200'} rounded-xl`}/>
    
                    <div className='password__group flex gap-2'>
                      <div className='flex flex-col'>
                      <label htmlFor="password" className='mr-[1rem]'>Enter Password</label>
                      <input type="password" name="password" onChange={handleInputChange} className={`w-full  mb-[1rem] shadow-inner p-3 bg-transparent border ${isError ? 'border-red-400' : 'border-gray-200'} rounded-xl`}/>
                      </div>
                      
                      <div className='flex flex-col'>
                      <label htmlFor="password" className='w-full mr-[1rem]'>Confirm Password</label>
                      <input type="password" name="password2" onChange={handleInputChange} className={`w-full  mb-[1rem] shadow-inner p-3 bg-transparent border ${isError ? 'border-red-400' : 'border-gray-200'} rounded-xl`}/>
                      </div>
                    </div>
    
                    <button type="submit" className='w-full mt-1 mb-[-0rem] py-2 text-md rounded-xl bg-secondary text-gray-100 mb-5'>Sign Up!</button>
                </form>
                <small onClick={handleRetrievePass} className='text-gray-700 font-bold text-[12px] cursor-pointer'>Forgot Password</small>
                <p className='text-sm text-gray-500 text-center cursor-pointer mt-[2.5rem]'>No account yet? <span className='text-btn'>Sign Up</span></p>

                 {/* Referer Details */}
                <div className='w-full mt-[3rem]'>
                    <div className='flex gap-1 justify-center text-[9px]'>
                    <label>Referred By:</label>
                    <p>@{referrerId}</p>
                    </div>
                </div>
            </div>
            </div>

          </div>
        </div>
      )
}

export default RefRegister