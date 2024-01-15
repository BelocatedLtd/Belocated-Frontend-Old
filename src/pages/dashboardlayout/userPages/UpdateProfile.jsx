import React from 'react'
import ProfileForm from '../../../components/forms/ProfileForm'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LOGOUT, SET_USER, handleUpdateUser, selectUser } from '../../../redux/slices/authSlice'
import { useState } from 'react'
import Loader from '../../../components/loader/Loader'
import { redirect, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import PasswordChange from './settings/PasswordChange'
import BankDetailsSettings from './settings/BankDetailsSettings'
import AccountDetailsSettings from './settings/AccountDetailsSettings'
import { getUser } from '../../../services/authServices'
import { getUserWallet } from '../../../redux/slices/walletSlice'
import { toast } from 'react-hot-toast'


const UpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate
  const dispatch = useDispatch()
  const user = useSelector(selectUser)



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
  

  const initialState = {
    fullname: user?.fullname,
    location: user?.location,
    community: user?.community,
    gender: user?.gender,
    religion: user?.religion,
  }

  const [profile, setProfile] = useState(initialState)

  const handleInputChange = (e) => {
    const {name, value } = e.target;
    setProfile({ ...profile, [name]: value })
  }

  const formData = {
    userId: user?.id,
    fullname: profile?.fullname,
    location: profile?.location,
    community: profile?.community,
    gender: profile?.gender,
    religion: profile?.religion,

  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      await dispatch(handleUpdateUser(formData))
      //navigate('/dashboard/profile')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }

  }

  return (
    <div>
    {isLoading && <Loader />}

    {/* User profile */}
    <div>
      <ProfileForm user={user} email={user?.email} username={user?.username} profile={profile} handleProfileUpdate={handleProfileUpdate} handleInputChange={handleInputChange} />
    </div>

    {/* User profile */}
    {/* Layered Boxes wrapper */}
    <div className='w-full h-fit flex flex-col gap-[5rem] mt-[1rem] md:w-[54%]'>
      <div className='boxesContainer w-full flex  flex-col justify-center gap-[3rem] md:p-3'>
        {/* Profile details  Settings */}
        <AccountDetailsSettings user={user} />

        {/* Bank Details Settings */}
        <BankDetailsSettings  user={user} />

        {/* password change  */}
        <PasswordChange user={user} />
      </div>
    </div>
    </div>
  )
}

export default UpdateProfile