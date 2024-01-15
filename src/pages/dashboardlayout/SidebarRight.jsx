import React from 'react'
import facebook from '../../assets/social icons/facebook.svg'
import twitter from '../../assets/social icons/twitter.png'
import tiktok from '../../assets/social icons/tiktok.svg'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import ActivityFeed from '../../components/ActivityFeed'

const SidebarRight = () => {
  return (
    <div className='hidden right-0 w-[400px] h-[71vh] border-l border-gray-200 md:flex md:flex-col'>
        <ActivityFeed />
    </div>
  )
}

export default SidebarRight