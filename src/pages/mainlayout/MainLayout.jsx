import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import CallToAction from '../../components/CallToAction'
import SubFooter from '../../components/SubFooter'

const MainLayout = ({handleRegister, regBtn}) => {
  return (
    <div className='w-full h-full bg-gradient-to-r from-[#BEE2F2]'>
        <Header />
        <Outlet />
        <CallToAction handleRegister={handleRegister}  regBtn={regBtn}/>
        <SubFooter />
        <Footer />
    </div>
  )
}

export default MainLayout