import React from 'react'
import close from '../../assets/close.svg'
import facebook from '../../assets/social icons/facebook.svg'
import tiktok from '../../assets/social icons/tiktok.svg'
import { useState } from 'react'
import { useEffect } from 'react'
import { formatDate } from '../../../utils/formatDate'
import { icons} from '../../components/data/socialIcon'

const AdItem = ({date, title, adperPostAmt, roi, adBudget, adService, status, tasks, item, url }) => {
    const [payBtn, setPayBtn] = useState('Pay Now')

    useEffect(() => {
        if(status == 'Pending') {
            return setPayBtn('Pay Now')
            }
            if(status == 'Running' || status == 'Allocating') {
                return setPayBtn('Monitor Campaign')
            }
            if(status == 'Rejected') {
                return setPayBtn('Edit Campaign')
            }
    }, [status, payBtn])
    

  return (
    <div className='relative shadow-lg flex w-full md:w-[95%] h-fit mt-5 mb-[2rem] bg-[#fcfcfc] p-[2rem] rounded-2xl rounded-tr-none md:p-[3rem]'>
        {/* Close icon to delete ad campaign */}
        {status == 'pending' && 
        <img src={close}  alt="close" size={20} className='absolute top-[-0.4rem] right-[-0.4rem] text-tertiary w-[28px] h-[28px]' />}

        {/* Social media icon  right */}
        <div className='hidden w-[40px] h-[40px] md:flex md:mr-1'>
        <img src={icons?.find((icon) => icon.platform === item.platform)?.icon} alt="" className='w-full h-full object-cover'/>
        </div>

        {/* ad details left */}
        <div className='w-[92%] flex flex-3 flex-col'>

        {/* ad details first layer */}
        <div className='flex flex-col mb-[1.5rem] border-b border-gray-100 pb-4'>
            <small className='text-gray-400 font-semibold'>{formatDate(date)}</small>
            <h1 className='w-fit px-2 font-bold text-lg'>{title}</h1>
            <small className='text-gray-400 font-semibold'>Pricing: ₦{adperPostAmt} per advert post</small>
        </div>

        <div className='flex flex-col md:flex-row gap-2 justify-between'>
            <div className='flex flex-col'>
            <div className='flex flex-col'>
                <label className='font-extrabold text-[12px] text-gray-700 md:text-[14px] md:font-bold'>Ad Unit:</label>
                <small className='text-gray-500 font-bold'>{roi}</small> 
            </div>

            <div className='flex flex-col mt-[1rem]'>
                <label className='font-extrabold text-[12px] text-gray-700 md:text-[14px] md:font-bold'>Amount Paid:</label>
                <small className='text-gray-500 font-bold'>₦{adBudget}</small> 
            </div>
            
            <div className='flex flex-col mt-[1rem]'>
            <label className='font-extrabold text-[12px] text-gray-700 md:text-[14px] md:font-bold'>Link</label>
            {url ? ( <small className='text-gray-500 font-bold'><a href={url} className='text-blue-600'>{url}</a></small>) : ("N/A")}
            </div>
            </div>

            <div className='flex flex-col'>
            <div>
                <label className='font-extrabold text-[12px]  text-gray-700 mr-1 md:text-[14px] md:font-bold'>Ad Service:</label>
                <small className='text-gray-500 font-bold'>{adService}</small> 
            </div>
            

            <div className=''>
                <label className='font-extrabold text-[12px] text-gray-700 mr-1 md:text-[14px] md:font-bold'>Status:</label> 
                <small className='bg-yellow-600 text-primary px-3 py-1 rounded-full'>{status}</small> 
            </div>

            <div className='w-fit flex flex-col justify-start gap-2 text-[10px] py-2 mt-[1rem] md:text-[14px]'>
                <div className=''>
                    <label className='font-extrabold text-[12px] text-gray-700 mr-1 md:text-[14px] md:font-bold'>Tasks Completed:</label>
                    <p className='text-[12px]'>{tasks}</p>
                </div>
                <ul className='flex items-center gap-2'>
                    <li>
                        <label className='font-extrabold text-[12px] text-gray-700 mr-1 md:text-[14px] md:font-bold'>Gender:</label>
                        <p className='text-[12px]'>{item?.gender}</p>
                    </li>
                    <li>
                        <label className='font-extrabold text-[12px] text-gray-700 mr-1 md:text-[14px] md:font-bold'>State:</label>
                        <p className='text-[12px]'>{item?.state}</p>
                    </li>
                    <li>
                        <label className='font-extrabold text-[12px] text-gray-700 mr-1 md:text-[14px] md:font-bold'>LGA:</label>
                        <p className='text-[12px]'>{item?.lga}</p>
                    </li>
                    
                    <li>
                         {/* Social media icon  right */}
                        <div className='flex md:hidden w-[25px] h-[25px]'>
                            <img src={icons?.find((icon) => icon.platform === item.platform)?.icon} alt="" className='w-full h-full'/>
                        </div>
                    </li>
                </ul>
            </div>

            </div>
        </div>
        </div>
    </div>
  )
}

export default AdItem