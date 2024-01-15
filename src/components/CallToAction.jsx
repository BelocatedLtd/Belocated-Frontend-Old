import React from 'react'
import callToAction from '../assets/callToAction.svg'
import { BiArrowToRight } from 'react-icons/bi'
import { FaArrowRight } from 'react-icons/fa'
import { MdArrowRightAlt } from 'react-icons/md'
import Register from '../pages/authLayout/Register'
import { ShowOnLogin, ShowOnLogout } from './protect/hiddenLinks'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'

const CallToAction = ({handleRegister, regBtn}) => {
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  
  return (
    <div className='w-full h-fit'>
      {regBtn && <Register handleRegister={handleRegister} regBtn={regBtn} />}
        <div className='container flex items-center mx-auto px-[2rem] leading-[1.2] mb-[3rem] mt-[4rem]'>
            <div className='hidden flex-1 md:flex'>
                <img src={callToAction} alt="call to action" />
            </div>
            <div className='flex-1 w-full pr-5'>
                <h1 className='text-[18px] md:text-[40px] text-red-400 font-extrabold leading-[1.4]'>Sounds too good to be true?</h1>
                <ShowOnLogin>
                  <p className='text-gray-700 font-light text-[20px] md:text-[40px] leading-[1.4]'>Head to your dashboard let us prove you wrong</p>
                  <button onClick={() => navigate(`/dashboard/${user?.username}`)} className='mt-[2rem]  md:w-[200px] bg-transparent border border-gray-600 px-[1rem] py-3 flex items-center justify-center gap-1 font-light rounded-2xl'>Go to Dashboard <span><MdArrowRightAlt size={20} className='text-gray-600' /></span></button>
                </ShowOnLogin>

                <ShowOnLogout>
                  <p className='text-gray-700 font-light text-[20px] md:text-[40px] leading-[1.4]'>Sign up an let us prove you wrong</p>
                  <button onClick={handleRegister} className='mt-[2rem]  md:w-[200px] bg-transparent border border-gray-600 px-[1rem] py-3 flex items-center justify-center gap-1 font-light rounded-2xl'>Sign Up <span><MdArrowRightAlt size={20} className='text-gray-600' /></span></button>
                </ShowOnLogout>
            </div> 
        </div>

    </div>
  )
}

export default CallToAction