import React from 'react'
import Header from './Header'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { getUser } from '../../services/authServices'
import { useDispatch } from 'react-redux'
import { SET_LOGOUT, SET_USER } from '../../redux/slices/authSlice'
import { getUserWallet } from '../../services/walletServices'
//import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'

const DashLayout = ({children}) => {
 //useRedirectLoggedOutUser('/')

  return (
    <div className=''>
        <Header />
        <div style={{minHeight: "80vh"}} className='flex p-6'>
        {children}
        </div>
        <Footer />
    </div>
  )
}

export default DashLayout