import React from 'react'
import gha from '../assets/gha.png'
import { BiCheckCircle } from 'react-icons/bi'
import Register from '../pages/authLayout/Register'
import { ShowOnLogin, ShowOnLogout } from './protect/hiddenLinks'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/slices/authSlice'

const MembersTab = ({handleRegister, regBtn}) => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  return (
    <section className='w-full h-fit mb-[4rem] '>
      {regBtn && <Register handleRegister={handleRegister} regBtn={regBtn} />}
        <div className='bg-[#D3EBF6] flex flex-col justify-center items-center gap-[5rem] mx-auto md:flex-row py-[5rem]'>
          <div className='container flex flex-col gap-[2rem] md:flex-row'>
          <div className='flex-1 flex flex-col items-center justify-center gap-3 text-center p-10 bg-gray-100 shadow-2xl mx-[1.5rem] w-fit md:w-[500px] h-[600px] rounded-2xl'>
                    <h1 className='text-3xl text-gray-600 font-extrabold'>Earners </h1>
                    <p className='w-full text-gray-600 mt-3'>On Belocated platform, earners are those who earn money by doing tasks provided by the Belocated Platform and Advertisers on the Belocated Platform. Your earnings are accumulated in your wallet on the platform and you can start transacting with your funds</p>
                    <div className='flex flex-col gap-2'>
                      <div className='flex items-center'>                      
                        <p className='text-[12px] font-medium text-gray-800'> You can purchase data and airtime with your earnings when it is up to ₦1,000</p>
                        </div>
                      <div className='flex items-center'>
                      <p className='text-[12px] font-medium text-gray-800'> You can withdraw to your account when your earnings is up to ₦5,000</p>
                      </div>
                    </div>
                    <ShowOnLogout>
                    <button onClick={handleRegister} className='bg-tertiary text-primary font-bold px-10 py-3 mt-[2rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Start Earning!</button>
                    </ShowOnLogout>
                    <ShowOnLogin>
                    <button onClick={() => navigate(`/dashboard/${user?.username}`)} className='bg-tertiary text-primary font-bold px-10 py-3 mt-[2rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Start Earning!</button>
                    </ShowOnLogin>
            </div>

            {/* <div className='hidden w-full h-full md:flex'><img src={gha} alt="" className='w-[500px] h-[500px] object-cover'/></div> */}

            <div className='flex-1 flex flex-col items-center justify-center gap-3 text-center p-10 bg-gray-100 shadow-2xl mx-[1.5rem] w-fit md:w-[500px] h-[600px] rounded-2xl'>
                    <h1 className='text-3xl text-gray-600 font-extrabold'>Advertisers </h1>
                    <p className='w-full text-gray-600 mt-3'>Enjoy fast and affordable media services across all media platforms taking advantage of numerous service offers on the Belocated platform. You are regarded as an advertiser when you pay for any of our services on the Belocated Platform. <br /><br />
                    With Belocated, you get just what you desire on major media platforms
                    </p>
                    <ShowOnLogout>
                    <button onClick={handleRegister} className='bg-tertiary text-primary font-bold px-10 py-3 mt-[2rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Start Advertising!</button>
                    </ShowOnLogout>
                    <ShowOnLogin>
                    <button onClick={() => navigate(`/dashboard/${user?.username}`)} className='bg-tertiary text-primary font-bold px-10 py-3 mt-[2rem] rounded-full hover:bg-transparent hover:text-tertiary hover:border-tertiary hover:border'>Start Advertising!</button>
                    </ShowOnLogin>
            </div>
          </div>
        </div>
    </section>
  )
}

export default MembersTab