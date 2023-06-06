import React from 'react'
import close from '../../assets/close.svg'
import  ReactDOM  from 'react-dom'
import { MdCancel } from 'react-icons/md'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SET_LOGIN, SET_USER, SET_USERNAME } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { loginUser, resendVerificationEmail } from '../../services/authServices'
import Loader from '../../components/loader/Loader'

const initialState = {
  email: '',
  password: '',
}

const Login = ({handleLogin, loginBtn, setLoginBtn}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState(initialState)
  const {email, password } = values

  const handleInputChange = (e) => {
      const {name, value } = e.target;
      setValues({ ...values, [name]: value })
    }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      return toast.error("All fields are required")
    }

    const formData = {
      email, 
      password
    }

    setIsLoading(true)
   
    const response = await loginUser(formData)

    setIsLoading(false)
    if(response.isEmailVerified === false) {
      
      toast.error('Account not verified')
      const emailResponse = await resendVerificationEmail(formData)
      if (emailResponse) {
        navigate('/verify-email', { state:{ formData } })
        setLoginBtn(!loginBtn)
      }

      if (!emailResponse) {
        toast.error("User not verified, but still unable to send verification email")
      }
      
        
    }
        
    if(response.isEmailVerified === true) {
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_USERNAME(response.username))
      await dispatch(SET_USER(response))
      const username = response.username
      if (response.accountType === "User") {
        navigate(`/dashboard/${username}`)
      } else if (response.accountType === "Admin") {
        navigate(`/admin/dashboard/${username}`)
      }
      setIsLoading(false)
    }

    setIsLoading(false)
  }

  const handleRetrievePass = (e) => {
    e.preventDefault()
    
    
      setLoginBtn(!loginBtn)
    navigate('/retrieve-pass')
  }

    return ReactDOM.createPortal(
      <div className='wrapper'>
        {isLoading && <Loader />}
          <div className='relative modal w-[400px] h-[550px] bg-primary'>
            <img src={close} alt="close" onClick={handleLogin} size={40} className='absolute top-[-1rem] right-[-1rem] text-tertiary' />
            <div className='modal__header__text flex flex-col items-center my-[3rem]'>
            <h2 className='text-sm text-gray-400 font-medium px-6 text-center'><span className='text-secondary font-extrabold'>200+</span> simple and profitable tasks posted today!</h2>
            <h3 className='text-2xl text-gray-800 font-bold px-6 mt-2 text-center'><span className='text-red-500'>Login</span> to start making money on <span className='text-secondary font-extrabold'>Belocated</span></h3>
            </div>

            <div className='w-full h-fit px-[2rem] md:w-full'>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="email" className='mr-[1rem]'>Email</label>
                <input type="email" name="email" onChange={handleInputChange} className='w-full  mb-[1rem] shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl' />

                <label htmlFor="password" className='mr-[1rem]'>Enter Password</label>
                <input type="password" name="password" onChange={handleInputChange} className='w-full mt-[0.5rem] mb-[1rem] shadow-inner p-3 bg-transparent border border-gray-200 rounded-xl' />

                <button type="submit" className='w-full mt-4 py-2 mt-1 mb-[-0rem] text-md rounded-xl bg-secondary text-gray-100 mb-5'>Login!</button>
            </form>
            <small onClick={handleRetrievePass} className='text-gray-700 font-bold text-[12px] cursor-pointer'>Forgot Password</small>
            <p className='text-sm text-gray-500 text-center cursor-pointer'>No account yet? <span className='text-btn' onClick={() => navigate('/auth/cpanel/login')}>Sign Up</span></p>
        </div>
          </div>
      </div>,
      document.getElementById("backdrop")
    )
}

export default Login