import React from 'react'
import { useLocation } from 'react-router-dom'
import Login from '../../../authLayout/Login';

const PasswordChangeSuccess = ({handleRegister, handleLogin, handleCloseMenu, loginBtn, regBtn}) => {
    const location = useLocation();
    const { caption } = location.state || {};
  return (
    <div className='w-full h-screen'>
        {loginBtn && <Login handleLogin={handleLogin}  loginBtn={loginBtn}/>}
        <div className='container h-full flex items-center justify-center mx-auto'>
            <div className='w-[500px] h-[500px] bg-blue-100 flex flex-col items-center justify-center gap-6 rounded-2xl shadow-2xl'>
            <h2 className='text-2xl font-bold text-gray-600 px-6 text-center'>{caption}!</h2>
            <div>
                <button onClick={handleLogin} className='bg-secondary px-6 py-2 text-primary'>Login</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default PasswordChangeSuccess