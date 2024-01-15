import React from 'react'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'

const AuthLayout = () => {
  return (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default AuthLayout