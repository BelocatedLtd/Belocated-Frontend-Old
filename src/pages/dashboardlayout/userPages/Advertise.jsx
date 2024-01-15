import React from 'react'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { socialMenu } from '../../../components/data/SocialData'
import { useState } from 'react'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { getUser } from '../../../services/authServices'
import { SET_USER, selectUser } from '../../../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import socialPlatforms from '../../../components/data/assets'
import { toast } from 'react-hot-toast'

const Advertise = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [platformName, setPlatformName] = useState("")
    const [toggleServices, setToggleServices] = useState(false)
    const [selectedPlatformObject, setSelectedPlatformObject] = useState()
    useRedirectLoggedOutUser('/login')

     useEffect(() => {
        if (!user?.location || !user?.community || !user?.gender) {
        toast.error("Please, complete your profile before you can perform tasks")
        navigate('/dashboard/update-profile')
    }
     }, [])

    const handleSelect = (e, platform) => {
        e.preventDefault(e)

        setPlatformName(platform)

        //Function to toggle to services list open and close
        setToggleServices(!toggleServices)
        //navigate(`/dashboard/adbuy/${param}`)

        //Extracts all the object containing services relevant to the platform the user picked
        const servicesList = socialPlatforms?.find(object => object?.assetplatform === platform)
        setSelectedPlatformObject(servicesList)
    }

    const handleSelectService = (e, service, adTitle) => {
        e.preventDefault(e)

        navigate(`/dashboard/adbuy/${platformName}`, { state:{ selectedPlatformObject, service, adTitle } });

}
    
  return (
    <div className='w-full h-fit'>
        <div className='justify-between mx-auto mr-5'>
            <div className='flex items-center gap-3 border-b border-gray-200 pb-6'>
                <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))}/>
                <div className='flex flex-col'>
                    <p className='font-semibold text-xl text-gray-700'>Create a Task Campaign to Advertise</p>
                    <small className='font-medium text-gray-500'>Click <span className='text-secondary'>here</span> to see and monitor your adverts</small>
                </div>
            </div>

            <div className='flex items-center gap-3 border-b border-gray-200'>
                <p className='font-normal text-[14px] text-gray-700 p-6'>Get people with atleast 1000 active followers to repost your adverts and perform certain social tasks for you on their social media accounts. Select the type of task you want people to perform below:</p>
            </div>

            <div className='flex flex-col gap-[3rem] items-center justify-center mt-[1rem] px-3 py-5'>
                {socialMenu.map((menu, index) => (
                <div  key={index} className='w-fit md:w-full shadow-lg p-5'>
                <div className='flex flex-col md:flex-row items-center gap-5'>
                    <div className='flex flex-col'>
                        <div className='hidden md:flex items-center justify-center w-[100px] h-[100px] bg-gray-50 rounded-t-xl rounded-b-2xl'>
                            <img src={menu.icon} alt="" className='object-cover rounded-full p-2'/>
                        </div>
                        <button onClick={(e) => handleSelect(e, menu.value)} className='hidden md:flex px-5 py-3 border border-gray-200 mt-5'>Select</button>
                    </div>
                    
                    <div className='w-full'>
                        <div className='flex flex-col md:flex-row md:justify-between md:items-center md:border-b md:border-gray-100'>
                            <div className='flex flex-col w-full md:w-[70%]'>
                                <h3 className='font-bold text-[20px] text'>{menu.title}</h3>
                                <p className='border-b border-gray-100 pb-3 text-[14px] text-gray-500 font-semibold'><span className='font-extrabold'>Pricing:</span> Starts at ₦{menu.price}/Task Performed</p>
                            </div>
                        </div>
                        <p className='font-normal text-[14px] text-gray-700 mt-3'>{menu?.descAd}</p>

                        {/* Select button and logo for mobile */}
                        <div className='w-full flex items-center gap-2'>
                            <button onClick={(e) => handleSelect(e, menu.value)} className='flex md:hidden px-5 py-3 border border-gray-200 mt-5'>Select</button>

                            <div className='flex md:hidden items-center justify-end w-[50px] h-[50px] rounded-t-xl rounded-b-2xl'>
                            <img src={menu?.icon} alt="" className='object-cover rounded-full mt-5'/>
                            </div>
                        </div>  
                    </div>
                </div>
                

                    {selectedPlatformObject?.assetplatform === menu.value && toggleServices ? (
                    <div className='w-full h-fit'>
                    {selectedPlatformObject?.assets?.map( (service, index) => 
                        <ul key={index} className='flex items-center gap-3'>
                            <li className='flex items-center gap-3 border-b border-gray-50 py-3 '>
                            <div onClick={e => handleSelectService(e, service?.asset, service.SC)} className='flex items-center gap-3 cursor-pointer'>
                                <p>{service.SC}</p>
                                <span className='bg-gray-50 rounded-full p-3'>₦{service.CostToOrder}</span>
                            </div>
                            

                            </li>
                        </ul>
                    )}
                    </div>
                ) : ""
                }
                </div>
                ))}
            </div>

        </div>
    </div>
  )
}

export default Advertise