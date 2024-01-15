import React from 'react'
import ActivityFeed from './ActivityFeed'
import { useState } from 'react'
import Register from '../pages/authLayout/Register'
import Login from '../pages/authLayout/Login'
import { ShowOnLogin, ShowOnLogout } from './protect/hiddenLinks'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/slices/authSlice'

const Jumbotron = ({}) => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [isReg, setIsReg] = useState(false)
  const [isLogin, setIsLogIn] = useState(false)

  const showRegModal = () => {
    setIsReg(true)
    setIsLogIn(false)
};

const showLoginModal = () => {
    setIsLogIn(true)
    setIsReg(false)
}

const closeModal = () => {
    setIsLogIn(false)
    setIsReg(false)
}

  return (
    <section className='w-full h-[85vh] flex flex-col items-center mt-[8rem]'>

        {isReg && (<Register  showRegModal={showRegModal} showLoginModal={showLoginModal} closeModal={closeModal }/>)}
        {isLogin && (<Login showLoginModal={showLoginModal} showRegModal={showRegModal} closeModal={closeModal }/>)}

        
      
      
        <div className='container flex flex-col items-center'>
            <h1 className='w-[90%] text-center text-[28px] text-gray-800 font-extrabold md:text-[3rem]'>Make <span className='text-tertiary'>Money</span> Daily by Completing Simple & Profitable <span className='text-secondary'>Tasks</span> on Your Media Platforms</h1>
            <p className='w-[80%] text-[22px] text-center font-medium text-gray-600 mt-3 md:w-[60%] md:text-[1.5rem]'>Get paid for carrying out media activities you would usually do daily for free. With belocated you can now invest your time and resources by earning for every successful task executed</p>
        </div>

        <ShowOnLogout>
          <button onClick={showRegModal} className='bg-tertiary text-primary font-bold px-10 py-3 mt-[5rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Get Started</button>
          <small onClick={showLoginModal} className='mt-3 font-medium text-gray-500 mb-3'>Already a Member? <span className='text-secondary cursor-pointer'>Login</span></small>
        </ShowOnLogout>

        <ShowOnLogin>
        <button onClick={() => navigate(`/dashboard/${user?.username}`)} className='bg-tertiary text-primary font-bold px-10 py-3 mt-[5rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Go to Dashboard</button>
          <small onClick={() => navigate('/logout')} className='mt-3 font-medium text-gray-500 mb-3'>Welcome, @{user?.username}. <span className='text-secondary cursor-pointer'>Logout</span></small>
        </ShowOnLogin>
        
    </section>
  )
}

export default Jumbotron