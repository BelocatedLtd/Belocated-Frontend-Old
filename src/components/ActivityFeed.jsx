import React from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { useEffect } from 'react'
import { useState } from 'react'
import io from 'socket.io-client'
import { BACKEND_URL } from '../../utils/globalConfig'
import { NEW_ACTIVITY, handleGetActivity, handleGetAllActivities, selectActivities } from '../redux/slices/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import speaker from '../assets/animated icons/speaker.gif'
import { format, formatDistanceToNow } from 'date-fns'


const socket = io.connect(`${BACKEND_URL}`)

const ActivityFeed = () => {
    const [activities, setActivities] = useState([])
    const [newActivityData, setNewActivityData] = useState('')
    const newsFeed = useSelector(selectActivities)
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1);
    const [createdAtTimestamp, setCreatedAtTimestamp] = useState()

    const itemsPerPage = 4;

    const totalPage = Math.ceil(newsFeed.length / itemsPerPage)

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return newsFeed.slice(startIndex, endIndex);
    }

    useEffect(() => {
        //Listen for activity event from the backend
        socket.on("recievedActivity", (data) => {
            async() => {
                await dispatch(NEW_ACTIVITY(data))
            }
        })
    }, [socket])

    const getActivities = async() => {
        await dispatch(handleGetAllActivities())
     }

    useEffect(() => {
        getActivities()
    }, [dispatch])

    
    return (
        <div className='right-0 w-[400px] h-[71vh]  md:flex md:flex-col'>
            <div className='w-full border-b border-gray-200 px-5 pb-3 my-3'>
                <h1 className='text-xl font-semibold text-gray-600 px-4 border-red-400'>Recent Activities</h1>
                <p className='text-sm mt-2 text-gray-500 font-medium'>See what people are doing on Belocated</p>
            </div>
    

            <div className='flex flex-col w-full border-b border-gray-200 px-5 pb-3 gap-3 py-5'>
                <div className='flex flex-col gap-[0.8rem] text-gray-600 text-[14px]'>
                    {getCurrentPageData().map((item, index) => (
                        <div key={index} className='flex items-center gap-2 border-b border-gray-100 py-5'>
                                <div className=''>
                                    <img src={speaker} alt="announcement" className='bg-secondary rounded-full p-[1px]'/>
                                </div>
                                <div className="flex flex-col">
                                <small>{formatDistanceToNow(new Date(item?.createdAt))}</small>
                                <p className='text-gray-600 text-[14px]'>{item.action}</p>
                                </div>
                        </div>
                        
                    ))}
                </div>

                {/* {currentPage < totalPage && (
                    <div onClick={() => handlePageChange(currentPage + 1)} className='flex items-center justify-center  gap-2 p-6 '>
                        <p className='font-bold text-gray-500'>View More</p>
                        <MdOutlineKeyboardArrowDown  size={30} className='text-gray-500'/>
                    </div>
                )} */}
                
            </div>
        </div>
      )
}

export default ActivityFeed