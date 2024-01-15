import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileForm from '../../../components/forms/ProfileForm'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LOGOUT, SET_USER, selectUser } from '../../../redux/slices/authSlice'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import Loader from '../../../components/loader/Loader'
import { useEffect } from 'react'
import { getUser } from '../../../services/authServices'
import { getUserWallet } from '../../../redux/slices/walletSlice'
import { toast } from 'react-hot-toast'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  useRedirectLoggedOutUser('/')

  useEffect(() => {
    setIsLoading(true) 
    async function getUserData() {
      const data = await getUser(user?.token)
      setProfile(data)
      setIsLoading(false)

      if (!data || data === undefined) {
        toast.error('Unable to retrieve user data, session will be terminated, please login again')
        await dispatch(SET_LOGOUT())
        navigate('/')
        return
      }

      await dispatch(SET_USER(data))
      await dispatch(getUserWallet())
    }
    getUserData()
  }, [dispatch])


  
  return (
    <div className='w-full h-fit mr-[1rem]'>
      {isLoading && <Loader />}
      <div className='user__data__wrapper flex flex-col w-full h-fit shadow-xl rounded-2xl md:p-6'>
        {
          !isLoading && profile === null ? (
            <p>Something went wrong, please reload the page...</p>
          ) : (
            <div className='user__data__group flex flex-col py-[2rem] gap-3 w-full'>
          <div className='user__data flex flex-col md:flex-row gap-1 text-lg border-b border-gray-100 mx-[2rem] pb-5 px-5'>
            <label htmlFor="fullname" className='font-extrabold'>Full Name:</label>
            <p>{profile?.fullname}</p>
          </div>
          <div className='user__data flex flex-col md:flex-row gap-1 text-lg border-b border-gray-100 mx-[2rem] py-5 px-5'>
            <label htmlFor="username" className='font-extrabold'>Username:</label>
            <p>@{profile?.username}</p>
          </div>
          <div className='user__data flex flex-col md:flex-row  gap-1 text-lg border-b border-gray-100 mx-[2rem] py-5 px-5'>
            <label htmlFor="fullname" className='font-extrabold'>Email:</label>
            <p>{profile?.email}</p>
          </div>
          <div className='user__data flex flex-col md:flex-row gap-1 text-lg border-b border-gray-100 mx-[2rem] py-5 px-5'>
            <label htmlFor="username" className='font-extrabold'>Phone:</label>
            <p>{profile?.phone}</p>
          </div>
          <div className='user__data flex flex-col md:flex-row gap-1 text-lg border-b border-gray-100 mx-[2rem] py-5 px-5'>
            <label htmlFor="fullname" className='font-extrabold'>Gender:</label>
            <p>{profile?.gender}</p>
          </div>
          <div className='user__data flex flex-col md:flex-row gap-1 text-lg border-b border-gray-100 mx-[2rem] py-5 px-5'>
            <label htmlFor="username" className='font-extrabold'>Residential State:</label>
            <p>{profile?.location}</p>
          </div>
          <div className='user__data flex flex-col md:flex-row gap-1 text-lg border-b border-gray-100 mx-[2rem] py-5 px-5'>
            <label htmlFor="fullname" className='font-extrabold'>Residential LGA:</label>
            <p>{profile?.community}</p>
          </div>

          {/* Bank Details */}
          <div className='user__data flex flex-col md:flex-row gap-1 text-lg border-b border-gray-100 mx-[2rem] py-5 px-5'>
            <label htmlFor="fullname" className='font-extrabold'>Bank Name:</label>
            <p>{profile?.bankName}</p>
          </div>
          <div className='user__data flex flex-col md:flex-row gap-1 text-lg border-b border-gray-100 mx-[2rem] py-5 px-5'>
            <label htmlFor="fullname" className='font-extrabold'>Account Name:</label>
            <p>{profile?.accountHolderName}</p>
          </div>
          <div className='user__data flex flex-col md:flex-row gap-1 text-lg border-b border-gray-100 mx-[2rem] py-5 px-5'>
            <label htmlFor="fullname" className='font-extrabold'>Account Number:</label>
            <p>{profile?.bankAccountNumber}</p>
          </div>
        </div>
          )
        }
      </div>
    </div>
  )
}

export default Profile