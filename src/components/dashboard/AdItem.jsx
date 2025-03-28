import React from 'react'
import close from '../../assets/close.svg'
import facebook from '../../assets/social icons/facebook.svg'
import tiktok from '../../assets/social icons/tiktok.svg'
import { useState } from 'react'
import { useEffect } from 'react'
import { formatDate } from '../../../utils/formatDate'
import { icons} from '../../components/data/socialIcon'
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import toast, { CheckmarkIcon, LoaderIcon } from 'react-hot-toast'
import { handleApproveTask, selectIsError, selectIsLoading, selectIsSuccess, selectTasks } from '../../redux/slices/taskSlice'
import { useDispatch, useSelector } from 'react-redux'
import TaskProofModal from '../ui/TaskProofModal'
//import Loader from '../../components/loader/Loader'
import Loader from '../../components/loader/Loader'

const AdItem = ({date, title, adperPostAmt, roi, adBudget, adService, status, item, url, users, user }) => {
    const [payBtn, setPayBtn] = useState('Pay Now')
    const [toggleTaskPerformers, settoggleTaskPerformers] = useState(false)
    const [adTaskPerformers, setAdTaskPerformers] = useState()
    const [adTaskPerformerTasks, setAdTaskPerformerTasks] = useState()
    const [taskSubmitters, setTaskSubmitters] = useState()
    const [tasksUserAd, setTasksUserAd] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const tasks = useSelector(selectTasks)
    const isError = useSelector(selectIsError)
    const isSuccess = useSelector(selectIsSuccess)
    const isLoading = useSelector(selectIsLoading)
    const [toggleTaskProofModal, setToggleTaskProofModal] = useState(false)
    const [taskProof, setTaskProof] = useState()

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


    useEffect(() => {
        // Filter the task list and bring out all the tasks with their advertiserId as the user and task advertId is the same with the advertId being rendered.
        const taskListUserAd = tasks?.filter(t => 
            t.advertiserId === user.id && 
            t.advertId === item._id &&
            (t.status === 'Approved' || t.status === 'Submitted' || t.status === 'Pending Approval')
        );
        setTasksUserAd(taskListUserAd)
      }, []);

      //console.log(tasksUserAd) 

    const handleToggleTaskPerformers = (e) => {
        e.preventDefault()

        if (taskSubmitters > 1) {
            toast.error("No Task Submitted")
            return
        }

        //console.log(item)
        settoggleTaskPerformers(!toggleTaskPerformers)
    }


    function openPopup(e, tp) {
        e.preventDefault()

        setTaskProof(tp)
        // if (!tp) {
        //     toast.error("Sorry, proof of task not available")
        //     return
        // }

        setToggleTaskProofModal(!toggleTaskProofModal)
    }


// Handle task for me.
    const handleTaskApproval = async(e, clickedTask) => {
        e.preventDefault()

        console.log(clickedTask)

        if (clickedTask.status === "Approved") {
        toast.success("Task has already being approved")
        return
        }

        const approveTaskData = {
        taskId: clickedTask?._id, 
        status: "Approved",
        message: "The advertiser approved this task",
    }
 
        //If Advertiser Approves
            if (!clickedTask?._id) {
                toast.error('Task information missing')
                return
            }
        
            await dispatch(handleApproveTask(approveTaskData))
            
            if (isError) {
                toast.error("Error Approving Task")
            }
    
            if (isSuccess) {
                toast.success("Task Approved")
            }
        }
    
    

  return (
    <div className='relative shadow-lg flex md:w-[95%] h-fit mt-5 mb-[2rem] bg-[#fcfcfc] p-[1.5rem] rounded-2xl rounded-tr-none md:p-[3rem]'>
        {isLoading && <Loader />}
        {toggleTaskProofModal && <TaskProofModal toggleTaskProof={openPopup} task={taskProof} />}
        {/* Close icon to delete ad campaign */}
        {status == 'pending' && 
        <img src={close}  alt="close" size={20} className='absolute top-[-0.4rem] right-[-0.4rem] text-tertiary w-[28px] h-[28px]' />}

        {/* Social media icon  right */}
        <div className='hidden w-[40px] h-[40px] md:flex md:mr-1'>
        <img src={icons?.find((icon) => icon.platform === item.platform)?.icon} alt="" className='w-full h-full object-cover'/>
        </div>

        {/* ad details left */}
        <div className='w-full md:w-[92%] flex flex-3 flex-col'>

        {/* ad details first layer */}
        <div className='flex flex-col mb-[1.5rem] border-b border-gray-100 pb-4'>
            <small className='text-gray-400 font-semibold text-[9px]'>{formatDate(date)}</small>
            <h1 className='font-bold text-sm md:text-lg text-gray-800'>{title}</h1>
            <small className='text-[9px] text-gray-400 font-semibold'>Pricing: ₦{adperPostAmt} per advert post</small>
        </div>

        <div className='flex flex-col md:flex-row gap-2 justify-between'>
            <div className='flex flex-col'>
            <div className='flex flex-col'>
                <label className='font-extrabold text-[12px] text-gray-700 md:text-[14px] md:font-bold'>Ad Unit Remaining:</label>
                <small className='text-gray-500 font-bold'>{roi}</small> 
            </div>

            <div className='flex flex-col mt-[1rem]'>
                <label className='font-extrabold text-[12px] text-gray-700 md:text-[14px] md:font-bold'>Amount Paid:</label>
                <small className='text-gray-500 font-bold'>₦{adBudget}</small> 
            </div>
            
            <div className='flex flex-col mt-[1rem]'>
            <label className='font-extrabold text-[12px] text-gray-700 md:text-[14px] md:font-bold'>Link</label>
            {url ? ( <small className='text-gray-500 font-bold'><a href={url} className='text-blue-600'>{url.slice(0, 20)}...</a></small>) : ("N/A")}
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
                    <p className='text-[12px]'>{tasksUserAd?.filter(t => t.status === "Approved").length}</p>
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
                {/* Task Performer Button */}
                <button onClick={handleToggleTaskPerformers} className='flex gap-1 items-center justify-center bg-secondary px-3 py-1 mt-1 text-primary rounded-2xl hover:bg-tertiary'>View and Monitor Results <span>{tasksUserAd?.length}</span></button>
            </div>

            </div>
            
        </div>
        
        {toggleTaskPerformers && (
            <div className='flex flex-col gap-3'>
                    {tasksUserAd?.map(tp => (
                        <div className='w-full border-b border-gray-200 py-[1rem]' key={tp._id}>  
                            <div className='task performer details mb-[1rem] flex flex-col gap-1'>
                                <small className='text-gray-400 font-semibold'>@{users?.find(u => u._id === tp?.taskPerformerId)?.username}</small>
                                <h3 className='font-bold text-gray-600'>{users?.find(u => u._id === tp?.taskPerformerId)?.fullname}</h3>
                                <span className='text-gray-400 font-semibold text-[9px]'>
                                    {formatDate(tp?.createdAt)}
                                </span>
                            </div>
                            

                            <div className='flex flex-col gap-3 md:items-center justify-between mb-[1rem] md:flex-row'>
                                <div className='first columns flex flex-col'>
                                    <label className='font-bold'>Social Media</label>
                                    <a href={tp?.socialPageLink} className='text-blue-600 hover:text-red-600 cursor-pointer'>
  {tp.socialPageLink.slice(0, 20)}...
    </a>
                                </div>

                                <div className='second columns flex flex-col'>
                                    <label className='font-bold'>Proof</label>
                                    {tp?.proofOfWorkMediaURL?.[0]?.secure_url ? (
  <a onClick={(e) => openPopup(e, tp)} className='text-blue-600 hover:text-red-600 cursor-pointer'>
  Click to view
    </a>
) : "N/A"}

                                </div>

                                <div className='third columns'>
                                    <label className='font-bold'>Status</label>
                                    <p className='flex items-center gap-1'><span><CheckmarkIcon /></span>{tp?.status}</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-2'>
                                <button onClick={(e) => handleTaskApproval(e, tp)} className={`
                                ${tp?.status === "Approved" ? ("bg-green-600") : ("bg-yellow-600")} 
                                flex items-center gap-2 rounded-2xl px-3 py-2 text-primary hover:bg-orange-400`} >
                                    {tp?.status === "Approved" ? ("Approved") : ("Approve")}
                                    <span>{isLoading && <LoaderIcon />}</span>
                                </button>
                            </div>

                        </div>
                    ))}
            </div>
        )}
        </div>
    </div>
  )
}

export default AdItem