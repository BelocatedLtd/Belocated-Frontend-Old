import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarItems from './SidebarItems'
import { FaAdversal, FaHome, FaTasks, FaUsers } from 'react-icons/fa'
import { GrSettingsOption, GrTransaction } from 'react-icons/gr'
import { BiMenuAltRight, BiMessageRoundedDetail } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LOGIN, SET_USER, selectUser } from '../../redux/slices/authSlice'
import { getUser } from '../../services/authServices'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'
import adverts from '../../assets/adverts.png'
import adCampaigns from '../../assets/adscampaign.png'
import transactions from '../../assets/transactions.png'
import userprofile from '../../assets/userprofile.png'
import customersupport from '../../assets/customersupport.png'
import { IoTrophyOutline } from 'react-icons/io5'

const SidebarLeft = ({children}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [isOpen, setIsOpen] = useState(false)
    const toggleSidebar = () => setIsOpen(!isOpen)


    async function getUserData() {
      if (!user?.email) {
      const data = await getUser()
      await dispatch(SET_USER(data))
      }
    }

    useEffect(() => {
    getUserData()
  }, [dispatch])

    const menu = [
      {
        title: "Dashboard",
        icon: <FaHome className='md:mr-2 text-[15px] md:text-[30px]'/>,
        path:  `/dashboard/${user?.username}`,
      },
      {
        title: "My Campaigns",
        icon: <img src={adCampaigns} alt="ad campaigns" className='md:mr-2 w-[15px] h-[15px] md:w-[30px] md:h-[30px]'/>,
        path: "/dashboard/campaign-stats",
      },
      {
        title: "My Ongoing Tasks",
        icon: <FaTasks className='text-[15px] md:text-[30px] md:mr-2 text-gray-800'/>,
        path: `/dashboard/tasks`,
      },
      {
        title: "Transactions",
        icon: <img src={transactions} alt="ad campaigns" className='md:mr-2 w-[15px] h-[15px] md:w-[30px] md:h-[30px]'/>,
        path: "/dashboard/transactions",
      },
      {
        title: "Profile",
        icon: <img src={userprofile} alt="ad campaigns" className='md:mr-2 w-[15px] h-[15px] md:w-[30px] md:h-[30px]'/>,
        path: '/dashboard/profile',
      },
      {
        title: "Update Profile",
        icon: <GrSettingsOption className='md:mr-2 text-[15px] md:text-[30px]'/>,
        path: `/dashboard/update-profile/`,
      },
      {
        title: "Ref Challenge",
        icon: <IoTrophyOutline className='md:mr-2 text-[15px] md:text-[30px]'/>,
        path: `/dashboard/ref-cha/${user?.username}`,
      },
      {
        title: "Contact Support",
        icon: <img src={customersupport} alt="ad campaigns" className='md:mr-2 w-[15px] h-[15px] md:w-[30px] md:h-[30px]'/>,
        path: "/dashboard/contact-support",
      },
    ]

    const adminMenu = [
      {
        title: "Dashboard",
        icon: <FaHome className='md:mr-2 text-[15px] md:text-[30px]'/>,
        path:  `/admin/dashboard/${user?.username}`,
      },
      {
        title: "All Users",
        icon: <FaUsers className='md:mr-2 text-[15px] md:text-[30px]'/>,
        path: `/admin/dashboard/users/${user?.username}`,
      },
      {
        title: "All Adverts",
        icon: <FaAdversal className='md:mr-2 text-[15px] md:text-[30px]'/>,
        path: `/admin/dashboard/adverts/${user?.username}`,
      },
      {
        title: "All Tasks",
        icon: <FaTasks className='md:mr-2 text-[15px] md:text-[30px]'/>,
        path: `/admin/dashboard/tasks/${user?.username}`,
      },
         {
        title: "All Tasks To Approve",
        icon: <FaTasks className='md:mr-2 text-[15px] md:text-[30px]'/>,
        path: `/admin/dashboard/allTasks/${user?.username}`,
      },
      {
        title: "All Transactions",
        icon: <GrTransaction className='md:mr-2 text-[15px] md:text-[30px]'/>,
        path: `/admin/dashboard/transactions/${user?.username}`,
      },
      {
        title: "All Withdrawals",
        icon: <GrTransaction className='md:mr-2 text-[15px] md:text-[30px]'/>,
        path: `/admin/dashboard/withdrawals/${user?.username}`,
      },
      {
        title: "Account Settings",
        icon: <GrSettingsOption className='md:mr-2 text-[15px] md:text-[30px]'/>,
        path: `/admin/dashboard/account-settings/${user?.username}`,
      },
      // {
      //   title: "Support Messages",
      //   icon: <BiMessageRoundedDetail className='md:mr-2 text-[15px] md:text-[30px]'/>,
      //   path: `/admin/dashboard/support-messages/${user?.username}`,
      // },
      {
        title: "Referral Challenge",
        icon: <IoTrophyOutline className='md:mr-2 text-[15px] md:text-[30px]'/>,
        path: `/admin/dashboard/ref-challenge/${user?.username}`,
      },
    ]
  

  return ( 
    <div className=''>
{/* Desktop Sidbar menu */}
        <div className={`hidden fixed top-0  left-0 w-[230px] h-screen shrink-0 border border-right border-gray-200 overflow-auto md:flex md:flex-col`} style={{width: isOpen ? "230px" : "60px"}}>
          <div className='top_section flex justify-between items-center w-full py-6 px-3 text-[20px]  bg-tertiary_bg'>
                  <h3 className='text-[18px]' style={{display: isOpen ? "block" : "none"}} onClick={() => navigate('/')} ><FaHome  className='border border-btn rounded-full text-btn p-2 cursor-pointer' size={35}/></h3>

                  <div className='' style={{marginLeft: isOpen ? "100px" : "0px"}}>
                  <FaHome  onClick={() => navigate('/')} className='flex border border-btn rounded-full text-btn p-2 cursor-pointer md:hidden' size={35}/>
                  <BiMenuAltRight className='hidden text-btn cursor-pointer md:flex' onClick={toggleSidebar} />
                  </div>
          </div>

          {/* {sidebarAccountType} */}
         
          {user?.accountType === "User" && (
             <>
              {menu.map((item, index) => { 
                return <SidebarItems key={index} item={item} isOpen={isOpen} />
             })}
            </>
          )}

          {user?.accountType === "Admin" || user?.accountType === "Super Admin" && (
              <>
              {adminMenu.map((item, index) => { 
                return <SidebarItems key={index} item={item} isOpen={isOpen} />
             })}
             </>
          )}
          
        </div>
     
      <main className={`w-full transition-all duration-500 ${isOpen ? 'md:pl-[230px]' : 'md:pl-[60px]'}`}>
        {children}
      </main>

{/* Mobile footer menu */}
      <div className='flex sticky bottom-0 w-full md:hidden bg-white p-3 h-fit shrink-0 border border-top border-gray-200 overflow-auto justify-center mt-[1rem]'>
        <div className='flex gap-3'>
        {user?.accountType === "User" && (
             <>
              {menu.slice(0, -3).map((item, index) => { 
                  return <SidebarItems key={index} item={item} isOpen={isOpen} />
             })}
            </>
          )}
          </div>

          {user?.accountType === "Admin" && (
            <div className='flex gap-0'>
              <>
              {adminMenu.slice(0, -3).map((item, index) => { 
                  return <SidebarItems className='' key={index} item={item} isOpen={isOpen} />
             })}
             </>
            </div>
          )}
        </div>
      </div>
  )
}

export default SidebarLeft
