import React from 'react'
import { icons} from '../../../components/data/socialIcon'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/loader/Loader'
import { handleGetUserTasks, selectIsError, selectIsLoading, selectIsSuccess, selectTasks } from '../../../redux/slices/taskSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import {formatDate} from '../../../../utils/formatDate'
import { toast } from 'react-hot-toast'
import { selectUser } from '../../../redux/slices/authSlice'
import moment from 'moment'

const TaskList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoading = useSelector(selectIsLoading)
    const isSuccess = useSelector(selectIsSuccess)
    const isError = useSelector(selectIsError)
    const user = useSelector(selectUser)
    const [icon, setIcon] = useState('')
    const [platform, setPlatform] = useState("")
    const tasks = useSelector(selectTasks)
    const [sortedTasks, setSortedTasks] = useState()
   
    const getUserTasks = async() => {
        await dispatch(handleGetUserTasks())
    }

    useEffect(() => {
        getUserTasks()
        //console.log(tasks)
    }, [dispatch]) 


    useEffect(() => {
        const sortedTaskList = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setSortedTasks(sortedTaskList)
    }, [dispatch]) 


    const handleSelect = async(e) => {
        e.preventDefault()
        toast.success('Task has been completed, approved and cleared')
    }

    const checkTaskStatus = (task_Id, taskStatus) => {
             if (taskStatus === 'Awaiting Submission') {
                return ( <button onClick={() => navigate(`/dashboard/submittask/${task_Id}`)} className='flex justify-center gap-1 text-primary text-[9px] md:text-[15px] py-2 px-5 rounded-2xl bg-secondary'>Submit</button>);
             } 

            if (taskStatus === 'Submitted') {
                return ( <button onClick={() => navigate(`/dashboard/submittask/${task_Id}`)} className='flex justify-center gap-1 text-primary py-2 px-5 rounded-2xl bg-yellow-600 text-[9px] md:text-[15px]'>Pending Approval</button>);
            } 

            if (taskStatus === 'Rejected') {
                return ( <button onClick={() => navigate(`/dashboard/submittask/${task_Id}`)} className='flex justify-center gap-1 text-primary py-2 px-5 rounded-2xl bg-tertiary text-[9px] md:text-[15px]'>Rejected</button>);
            } 

            if (taskStatus === 'Approved') {
                return ( <button onClick={handleSelect} className='flex justify-center gap-1 text-primary py-2 px-5 rounded-2xl bg-secondary text-[9px] md:text-[15px]'>Approved</button>);
            } 

            if (taskStatus === 'Partial Approval') {
                return ( <button onClick={() => navigate(`/dashboard/submittask/${task_Id}`)} className='flex justify-center gap-1 text-primary py-2 px-5 rounded-2xl bg-secondary text-[9px] md:text-[15px]'>Partial Approval</button>);
            } 
     }
 

  return (
    <div className='w-full h-fit'>
    {isLoading && <Loader />}
        <div>
            <div className='flex items-center gap-3 border-b border-gray-200 pb-6'>
                    <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))}/>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-xl text-gray-700'>Your Ongoing Tasks</p>
                        <small className='font-medium text-gray-500'>Click each task to see details and monitor</small>
                    </div>
            </div>

            <div className='md:px-8 mt-3 md:mt-8'>
         {sortedTasks?.map((task, index) => (
            <div key={index} className='flex items-center justify-between bg-gray-50 p-6 mb-[2rem] shadow-lg'>
                <div className='flex gap-2 items-center'>
                <img src={icons?.find((icon) => icon.platform === task.platform)?.icon} alt={task.platform} className='hidden md:flex'/>
                    <div className=''>
                        <small>{formatDate(task.createdAt)}</small>
                        <h1 className='text-[15px] md:text-[18px] font-bold md:my-[-5px] p-0'>{task?.title}</h1>
                        <small className='text-gray-400 text-[9px]'>To Earn: ₦{task?.toEarn}/task</small>

                        {/* <p className='text-gray-500 text-[15px]'>{task.caption}</p> */}

                        <div className='flex items-center gap-2'>
                        <ul className='flex gap-3 text-[13px]'>
                            <li>State: {task.state}</li>
                            <li>LGA: {task.lga}</li>
                            {task.socialPageLink
 ? (<li>Link: <a href={task.socialPageLink} className='text-blue-600'>{task.socialPageLink}</a></li>) : ("")}

                            
                        </ul>
                        <img src={icons?.find((icon) => icon.platform === task.platform)?.icon} alt={task?.platform} className='flex md:hidden w-[20px] h-[20px]'/>

                        <div className='flex md:hidden'>
                            {checkTaskStatus(task?._id, task.status)}
                        </div>
                    </div>
                    </div>
                </div>
                   
                <div className='hidden md:flex'>
                    {checkTaskStatus(task?._id, task.status)}
                </div>
            </div>
        ))}
        </div>
        </div>
    </div>
  )
}

export default TaskList