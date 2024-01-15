
import React from 'react'
import { FaGrinHearts, FaHome, FaStar, FaUsers } from 'react-icons/fa'
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai'
import { MdCreateNewFolder, MdOutlineWorkHistory } from 'react-icons/md'
import { GrSettingsOption } from 'react-icons/gr'
import { BiMenuAltRight } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/slices/authSlice'
import { selectUsername } from '../../redux/slices/authSlice'


const SidebarData = () => {
  const username = useSelector(selectUsername)

  const menu = [
    {
      title: "Dashboard",
      icon: <FaHome className='mr-2'/>,
      path: `/dashboard/${username}`,
    },
    {
      title: "My Campaigns",
      icon: <MdCreateNewFolder className='mr-2'/>,
      path: "/dashboard/campaign-stats",
    },
    {
      title: "Transactions",
      icon: <MdCreateNewFolder className='mr-2'/>,
      path: "/dashboard/transactions",
    },
    {
      title: "Profile",
      icon: <MdCreateNewFolder className='mr-2'/>,
      path: `/dashboard/profile/${username}`,
    },
    {
      title: "Update Profile",
      icon: <GrSettingsOption className='mr-2'/>,
      path: `/dashboard/update-profile/${username}`,
    },
    {
      title: "Account Settings",
      icon: <FaStar className='mr-2'/>,
      path: `/dashboard/account-settings/${username}`,
    },
    {
      title: "Contact Support",
      icon: <GrSettingsOption className='mr-2'/>,
      path: "/dashboard/contact-support",
    },
    {
      title: "Logout",
      icon: <AiOutlineLogout className='mr-2'/>,
      path: "/logout",
    },
  ]

  return (
    menu
  )
}


  export default SidebarData
  
