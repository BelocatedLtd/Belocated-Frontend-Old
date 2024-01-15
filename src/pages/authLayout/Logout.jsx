import React from 'react'
import { useDispatch } from 'react-redux'
import {SET_LOGOUT } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    useRedirectLoggedOutUser('/')

    const handleLogout = async () => {
      setIsLoading(true)
      try {
          await dispatch(SET_LOGOUT())
          navigate('/')
          toast.success('User successfully logged out')
          setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        toast.error(error)
      }
}
    

  return (
    <>
    {isLoading && <Loader />}
    <button onClick={handleLogout} className='py-2 px-6 bg-tertiary text-primary rounded-full'>Logout</button>
    </>
  )
}

export default Logout