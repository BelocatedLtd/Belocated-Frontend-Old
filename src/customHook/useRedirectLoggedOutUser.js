import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SET_LOGOUT, selectUser } from '../redux/slices/authSlice'
import { toast } from 'react-hot-toast'
import { getToken } from '../../utils/tokenHandler'
import { getLoginStatus } from '../services/authServices'



const useRedirectLoggedOutUser = (path) => {
  const dispatch = useDispatch()
  //const user = useSelector(selectUser)
    const navigate = useNavigate()

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus()
      const tokenAvailable = await getToken()

        if(!isLoggedIn || !tokenAvailable) {
          await dispatch(SET_LOGOUT())
            toast.error('Session Expired, Please login to continue')
            navigate(path)
            return 
        }

        if(tokenAvailable === undefined) {
          await dispatch(SET_LOGOUT())
            toast.error('Session Expired, Please login to continue')
            navigate(path)
            return 
        }
    }
    redirectLoggedOutUser()
  }, [navigate, dispatch])
}

export default useRedirectLoggedOutUser