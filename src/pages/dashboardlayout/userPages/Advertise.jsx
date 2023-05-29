import React from 'react'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { socialMenu } from '../../../components/data/SocialData'
import { useState } from 'react'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { getUser } from '../../../services/authServices'
import { SET_USER, SET_USERNAME, selectUser } from '../../../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const Advertise = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    useRedirectLoggedOutUser('/login')

    useEffect(() => {
        async function getUserData() {
          if (!user.email) {
          const data = await getUser()
          await dispatch(SET_USER(data))
         dispatch(SET_USERNAME(data.username))
          }
        }
      getUserData()
    }, [dispatch])

    const handleSelect = (e, param) => {
        e.preventDefault(e)
        navigate(`/dashboard/adbuy/${param}`)
    }
    
  return (
    <div className='w-full h-fit'>
        <div className='justify-between mx-auto mr-5'>
            <div className='flex items-center gap-3 border-b border-gray-200 pb-6'>
                <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))}/>
                <div className='flex flex-col'>
                    <p className='font-semibold text-xl text-gray-700'>Create a Task Campaign to Advertise</p>
                    <small className='font-medium text-gray-500'>Click <span className='text-secondary'>here</span> to see and monitor your adverts</small>
                </div>
            </div>

            <div className='flex items-center gap-3 border-b border-gray-200'>
                <p className='font-normal text-[14px] text-gray-700 p-6'>Get people with atleast 1000 active followers to repost your adverts and perform certain social tasks for you on their social media accounts. Select the type of task you want people to perform below:</p>
            </div>

            <div className='flex flex-col gap-[3rem] items-center justify-center mt-[1rem] px-3 py-5'>
                {socialMenu.map(menu => (
                <div className='flex items-center gap-5' key={menu.value}>
                    <div className='flex flex-col'>
                        <div className='flex items-center justify-center w-[100px] h-[100px] bg-gray-50 rounded-t-xl rounded-b-2xl'>
                            <img src={menu.icon} alt="" className='object-cover rounded-full p-2'/>
                        </div>
                        <button onClick={e => handleSelect(e, menu.value)} className='px-5 py-3 border border-gray-200 mt-5'>Select</button>
                    </div>
                    
                    <div className='w-full'>
                        <h3 className='font-bold text-[20px] text'>{menu.title}</h3>
                        <p className='border-b border-gray-100 pb-3 text-[14px] text-gray-500 font-semibold'><span className='font-extrabold'>Pricing:</span> Starts at ₦{menu.price}/Task Performed</p>
                        <p className='font-normal text-[14px] text-gray-700 mt-3'>{menu.desc}</p>
                    </div>
                </div>
                ))}
            </div>

        </div>
    </div>
  )
}

export default Advertise