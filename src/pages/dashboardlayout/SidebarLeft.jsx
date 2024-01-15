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
        icon: <FaHome className='mr-2'/>,
        path:  `/dashboard/${user?.username}`,
      },
      {
        title: "My Campaigns",
        icon: <img src={adCampaigns} alt="ad campaigns" className='mr-2 w-[30px] h-[30px]'/>,
        path: "/dashboard/campaign-stats",
      },
      {
        title: "My Ongoing Tasks",
        icon: <FaTasks size={30} className='mr-2 text-gray-800'/>,
        path: `/dashboard/tasks`,
      },
      {
        title: "Transactions",
        icon: <img src={transactions} alt="ad campaigns" className='mr-2 w-[30px] h-[30px]'/>,
        path: "/dashboard/transactions",
      },
      {
        title: "Profile",
        icon: <img src={userprofile} alt="ad campaigns" className='mr-2 w-[30px] h-[30px]'/>,
        path: '/dashboard/profile',
      },
      {
        title: "Update Profile",
        icon: <GrSettingsOption className='mr-2'/>,
        path: `/dashboard/update-profile/`,
      },
      {
        title: "Contact Support",
        icon: <img src={customersupport} alt="ad campaigns" className='mr-2 w-[30px] h-[30px]'/>,
        path: "/dashboard/contact-support",
      },
    ]

    const adminMenu = [
      {
        title: "Dashboard",
        icon: <FaHome className='mr-2'/>,
        path:  `/admin/dashboard/${user?.username}`,
      },
      {
        title: "All Users",
        icon: <FaUsers className='mr-2'/>,
        path: `/admin/dashboard/users/${user?.username}`,
      },
      {
        title: "All Adverts",
        icon: <FaAdversal className='mr-2'/>,
        path: `/admin/dashboard/adverts/${user?.username}`,
      },
      {
        title: "All Tasks",
        icon: <FaTasks className='mr-2'/>,
        path: `/admin/dashboard/tasks/${user?.username}`,
      },
      {
        title: "All Transactions",
        icon: <GrTransaction className='mr-2'/>,
        path: `/admin/dashboard/transactions/${user?.username}`,
      },
      {
        title: "All Withdrawals",
        icon: <GrTransaction className='mr-2'/>,
        path: `/admin/dashboard/withdrawals/${user?.username}`,
      },
      {
        title: "Account Settings",
        icon: <GrSettingsOption className='mr-2'/>,
        path: `/admin/dashboard/account-settings/${user?.username}`,
      },
      {
        title: "Support Messages",
        icon: <BiMessageRoundedDetail className='mr-2'/>,
        path: `/admin/dashboard/support-messages/${user?.username}`,
      },
    ]
  

  return ( 
    <div className=''>
        <div className={`fixed top-0  left-0 w-[230px] h-screen shrink-0 border border-right border-gray-200 overflow-auto`} style={{width: isOpen ? "230px" : "60px"}}>
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

          {user?.accountType === "Admin" && (
              <>
              {adminMenu.map((item, index) => { 
                return <SidebarItems key={index} item={item} isOpen={isOpen} />
             })}
             </>
          )}
          
        </div>
     
      <main className='w-full ' style={{ paddingLeft: isOpen ? "230px" : "60px", transition: "all .5s" }}>
        {children}
      </main>
    </div>
  )
}

export default SidebarLeft