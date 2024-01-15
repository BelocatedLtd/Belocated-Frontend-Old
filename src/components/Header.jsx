import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Register from '../pages/authLayout/Register'
import { useState } from 'react'
import Login from '../pages/authLayout/Login'
import { ShowOnLogin, ShowOnLogout } from './protect/hiddenLinks'
import Logout from '../pages/authLayout/Logout'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LOGIN, SET_USER,  selectUser, selectUsername } from '../redux/slices/authSlice'
import { MdMenu, MdOutlineCancel } from 'react-icons/md'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { useEffect } from 'react'
import { BsArrowUpRight } from 'react-icons/bs'
import logo from '../assets/belocated-logo.png'
import { getLoginStatus, getUser } from '../services/authServices'

export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false) 
    const user = useSelector(selectUser)
    const [isReg, setIsReg] = useState(false)
    const [isLogin, setIsLogIn] = useState(false)

    const showRegModal = () => {
        setIsReg(true)
        setIsLogIn(false)
    };

    const showLoginModal = () => {
        setIsReg(false)
        setIsLogIn(true)
        
    }
    
    const closeModal = () => {
        setIsLogIn(false)
        setIsReg(false)
    }



    const userDashboard = () => {
         if (user?.accountType === "Admin") {
            return (<button onClick={() => navigate(`/admin/dashboard/${user?.username}`)} className='bg-transparent text-tertiary px-6 py-3 rounded-full hover:bg-transparent hover:text-secondary'>Dashboard</button>  )
         }

         if (user?.accountType === "User") {
                return (<button onClick={() => navigate(`/dashboard/${user?.username}`)} className='bg-transparent text-tertiary px-6 py-3 rounded-full hover:bg-transparent hover:text-secondary'>Dashboard</button>)
         }
    }

    useEffect(() => {
        userDashboard()
    }, [user])

    const handleCloseMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }
    


  return (
    <header className='w-full border-b border-gray-200'>
        {isReg && (<Register  showRegModal={showRegModal} showLoginModal={showLoginModal} closeModal={closeModal }/>)}
        {isLogin && (<Login showLoginModal={showLoginModal} showRegModal={showRegModal} closeModal={closeModal }/>)}

        

        <div className='relative container px-6 py-6 flex justify-between items-center mx-auto md:px-0'>
            <Link to='/' className='logo cursor-pointer text-4xl font-extrabold text-secondary w-[150px] md:w-[170px]'>
                <img src={logo} alt="logo" className='w-full h-full object-cover'/>
            </Link>

            <div className='hidden nav__items gap-4 font-bold text-lg text-gray-600 md:flex'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/faq'>FAQ</NavLink>
                <NavLink to='/services'>Services</NavLink>
                <NavLink to='/contact'>Contact</NavLink>
            </div>

            <ShowOnLogout>
            <div className='hidden gap-2 md:flex'>
                <button onClick={showLoginModal} className='bg-transparent text-tertiary px-6 py-3 rounded-full hover:bg-transparent hover:text-secondary'>Login</button>
                <button onClick={showRegModal} className='bg-tertiary text-primary px-6 py-3 rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Create Account</button>
            </div>
            </ShowOnLogout>

            <ShowOnLogin>
            <div className='hidden gap-2 md:flex'>
                {userDashboard()}
                <Logout />
            </div>
            </ShowOnLogin>

            <div className='relative md:hidden'>
                <div>
                    {mobileMenuOpen && <MdOutlineCancel onClick={() => setMobileMenuOpen(!mobileMenuOpen)} size={30} className='text-gray-600' />}
                    {!mobileMenuOpen && <HiOutlineMenuAlt3 onClick={() => setMobileMenuOpen(!mobileMenuOpen)} size={30} className='text-gray-600' />}
                </div>
            </div>

            {mobileMenuOpen && (
            <div className='absolute w-full right-0 left-0 top-[5.5rem] py-[5rem] p-[1.5rem] shadow-xl rounded-sm bg-primary'>
                        <div onClick={() => handleCloseMenu()} className='flex h-[200px] flex-col justify-center items-center gap-[1rem] font-extrabold text-gray-700'>
                            <Link to="/">Home</Link>
                            <Link to="/about">About</Link>
                            <Link to="/faq">FAQ</Link>
                            <Link to="/services">Services</Link>
                            <Link to="/contact">Contact</Link>
                            

                            <ShowOnLogout>
                                <p onClick={showLoginModal} className='text-gray-800 cursor-pointer'>Login</p>
                            </ShowOnLogout>
                            <ShowOnLogout>
                                <p onClick={showRegModal} className='text-gray-50 cursor-pointer bg-secondary px-8 rounded-full py-2'>Get Started Free </p>
                            </ShowOnLogout>

                            <ShowOnLogin>
                                {userDashboard()}
                            </ShowOnLogin>
                            <ShowOnLogin>
                                <Logout />
                            </ShowOnLogin>
                        </div>
            </div>
            )}

        </div>
    </header>
  )
}
