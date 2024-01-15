import React from 'react'
import close from '../../assets/close.svg'
import  ReactDOM  from 'react-dom'
import { MdCancel } from 'react-icons/md'
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { createNewUser, resendVerificationEmail } from '../../services/authServices';
import { useDispatch } from 'react-redux';
import { SET_LOGIN, SET_USER } from '../../redux/slices/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import RetrievePassword from './RetrievePassword';
import VerifyEmail from './VerifyEmail';
import io from 'socket.io-client'
import { BACKEND_URL } from '../../../utils/globalConfig'
import Login from './Login';


const socket = io.connect(`${BACKEND_URL}`)


const initialState = {
  username: '',
  password: '',
}

const Register = ({showLoginModal, closeModal}) => {
  const referrerId = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [values, setValues] = useState(initialState)
  const dispatch = useDispatch()

    const {username, email, password, password2 } = values

    const handleInputChange = (e) => {
      e.preventDefault()
        const {name, value } = e.target;
        setValues({ ...values, [name]: value })
      }

    const toggleEmailVerifyModal = async (e) => {
    e.preventDefault()

      if (!username || !email || !password || !password2) {
        return toast.error("All fields are required")
      }

      if (password.length < 6) {
        return toast.error("Password must be upto 6 characters")
      }

      if (password !== password2) {
        return toast.error("Passwords do not match")
      }

      const formData = {
        username: username.toLowerCase(), 
        email: email.toLowerCase(),
        password,
        referrerId: referrerId ? referrerId : ''
      }

      setIsLoading(true)
      
      const response = await createNewUser(formData)
      setIsLoading(false)

      if (!response) {
        toast.error("Error trying to register user")
        return
      }

      if (response.message === "Email has already been registered, please login") {
        toast.error("Email has already been registered, please login")
        closeModal()
      }

      if (!response._id) {
        toast.error("Error registering user")
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
          setIsLoading(false)
        })
        
        toast.promise(emailResponse, {
            loading: 'Sending verification email...',
            success: <b>Email sent</b>,
            error: <b>Failed to send email</b>
          }
        );
        closeModal()
      }
      
    }


  return ReactDOM.createPortal(
    <div className='wrapper'>
      {isLoading && <Loader />}
        <div className='relative modal w-[350px] h-[600px] bg-primary md:w-[400px]'>
          <img src={close} alt="close" onClick={closeModal} size={40} className='absolute top-[-1rem] right-[-1rem] text-tertiary' />
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
           
            <p onClick={showLoginModal} className='text-sm text-gray-500 text-center cursor-pointer mt-[2.5rem]'>Already Registered? <span className='text-btn'>Sign In</span></p>
        </div>
        </div>
    </div>,
    document.getElementById("backdrop")
  )
};

export default Register