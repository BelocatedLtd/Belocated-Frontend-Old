import React, { useEffect } from 'react'
import whatsapp from '../../../assets/animated icons/whatsapp.gif'
import facebook from '../../../assets/animated icons/facebook.gif'
import tiktok from '../../../assets/animated icons/tiktok.gif'
import instagram from '../../../assets/animated icons/instagram.gif'
import twitter from '../../../assets/animated icons/twitter.gif'
import youtube from '../../../assets/animated icons/youtube.svg'
import linkedin from '../../../assets/animated icons/linkedin.gif'
import appstore from '../../../assets/animated icons/appstore.svg'
import playstore from '../../../assets/animated icons/playstore.svg'
import audiomack from '../../../assets/animated icons/audiomack.svg'
import boomplay from '../../../assets/animated icons/boomplay.svg'
import spotify from '../../../assets/animated icons/spotify.svg'
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { LoaderIcon, toast } from 'react-hot-toast'
import { selectUser, selectUsername } from '../../../redux/slices/authSlice'
import socialPlatforms from '../../../components/data/assets'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { createNewTask, handleGetUserTasks, selectIsError, selectIsLoading, selectIsSuccess, selectTasks } from '../../../redux/slices/taskSlice'
import {formatDate} from '../../../../utils/formatDate'
import Loader from '../../../components/loader/Loader'

const TaskEarn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const username = useSelector(selectUsername)
    const isError = useSelector(selectIsError)
    const isSuccess = useSelector(selectIsSuccess)
    const isLoading = useSelector(selectIsLoading)
    const [icon, setIcon] = useState(null)
    const [newTask, setNewTask] = useState()
    const tasks = useSelector(selectTasks)
    const {platformName} = useParams();
    const location = useLocation();
    const { filteredServiceAdvert, asset, taskTitle, taskVerification } = location.state || {};
    const [finalFilteredTasks, setFinalFilteredTasks] = useState([])

    const getAllTasks = async() => {
        await dispatch(handleGetUserTasks())
    }

    useEffect(() => {
        if (user.email === "") {
          navigate(`/dashboard/${username}`)
        }

        getAllTasks()
        
  }, [dispatch, user.email])


    useEffect(() => {
        if (platformName === "tiktok") {
            setIcon(tiktok)
        }
        if (platformName === "facebook") {
            setIcon(facebook)
        }
        if (platformName === "twitter") {
            setIcon(twitter)
        }
        if (platformName === "instagram") {
            setIcon(instagram)
        }
        if (platformName === "linkedin") {
            setIcon(linkedin)
        }
        if (platformName === "whatsapp") {
            setIcon(whatsapp)
        }
        if (platformName === "youtube") {
            setIcon(youtube)
        }
        if (platformName === "appstore") {
            setIcon(appstore)
        }
        if (platformName === "playstore") {
            setIcon(playstore)
        }
        if (platformName === "audiomack") {
            setIcon(audiomack)
        }
        if (platformName === "spotify") {
            setIcon(spotify)
        }
        if (platformName === "boomplay") {
            setIcon(boomplay)
        }

        //Filter all ads to get the ones this user is qualified to perform
        const filteredTasks = filteredServiceAdvert?.filter(advert => {
            const locationMatch = advert.state === user.location || advert.state === 'All'; 
            const communityMatch = advert.lga === user.community || advert.lga === 'All';
            const genderMatch = advert.gender === user.gender || advert.gender === 'All'; 
            
            return locationMatch && communityMatch && genderMatch;
        })

        //Setting the filtered ads to a state called finalFilteredTasks
       setFinalFilteredTasks(filteredTasks)
    }, [])

    

    //Check if user has already opted in to perform a task, any task he/she is already performing will be marked submit task and new unperformed tasks marked perform task.
    const checkTaskExistence = (advert_Id) => {
       const existingTask = tasks?.find((task) => 
            task.taskPerformerId === user.id && task.advertId === advert_Id)
            if (existingTask) {
               return ( <button onClick={() => goToTaskPage(existingTask._id)} className='flex justify-center gap-1 text-primary text-[12px] md:text-[15px] py-2 px-5 rounded-2xl bg-secondary'>View Task</button>);
            } else {
                return ( <button onClick={() => handleSelect(advert_Id)} className='flex justify-center gap-1 text-primary py-2 px-5 rounded-2xl bg-tertiary text-[12px] md:text-[15px]'>Perform Task</button>);
            } 
    }


    const goToTaskPage = (existingTaskId) => {
        navigate(`/dashboard/submittask/${existingTaskId}`)
    }

    
    

    //Handling click even on the button to perform task, this button should not create a new task if the user had already created a task for this ad
    const handleSelect = async(advert_Id) => {
        // Extracting the information for this Advert that will be converted to task for this user and also checking if Advert is still in existence amd paid for
        const taskToPerform = finalFilteredTasks?.find(advert => advert._id === advert_Id);

        // Happens if advert meets all criteria to be performed as task
            if (taskToPerform) {
                    // Creating task data 
                    const taskData = {
                        advertId: taskToPerform._id,
                        advertiserId: taskToPerform.userId,
                        taskPerformerId: user?.id,
                        title: taskTitle,
                        platform: taskToPerform.platform,
                        service: taskToPerform.service,
                        desiredROI: taskToPerform.desiredROI,
                        toEarn: taskToPerform.earnPerTask,
                        gender: taskToPerform.gender,
                        state: taskToPerform.state,
                        lga: taskToPerform.lga,
                        caption: taskToPerform.caption,
                        taskVerification,
                        socialPageLink: taskToPerform.socialPageLink,
                        adMedia: taskToPerform.mediaURL
                    }

                    
                        const response = await dispatch(createNewTask(taskData))
                        setNewTask(response.payload)

                        if (isError) {
                            toast.error('Error Creating a Task from this advert')
                            return
                        }

                        if (isSuccess) {
                            toast.success('Successfully created a Task from this advert')
                            navigate(`/dashboard/submittask/${response?.payload?._id}`)
                        }
                        
                       
                }
    
                if (!taskToPerform) {
                    toast.error ("Sorry, cannot find advert, so task cannot be created")
                }
    } 

    //console.log(finalFilteredTasks)
         
        
    


  return (
    <div className='w-full h-fit'>
        {isLoading && <Loader />}
        <div>
            <div className='flex items-center gap-3 border-b border-gray-200 pb-6'>
                    <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))}/>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-xl text-gray-700'>Perform Social Tasks on {platformName} and Earn Money</p>
                        <small className='font-medium text-gray-500'>Click <span onClick={() => (navigate(`/dashboard/tasks/${user?.id}`))} className='text-secondary'>here</span> to see and monitor your Tasks</small>
                    </div>
            </div>

            <div className='flex items-center gap-3 border-b border-gray-200'>
                <p className='font-normal text-[14px] text-gray-700 p-6'>You can earn consistently by posting adverts of various businesses and top brands on your social media accounts and performing simple social media tasks. There are <span className='text-tertiary font-bold'>({finalFilteredTasks.length})</span> tasks you are qualified to perform on {platformName}. To get started, simply click on any of the earning options shown below:</p>
            </div>
        </div>

        <div className='w-full mt-5 md:px-8 md:mt-8'>
         {finalFilteredTasks?.map((task, index) => (
            <div key={index} className='w-full flex flex-col md:flex-row items-center justify-between bg-gray-50 p-6 mb-[2rem] shadow-lg'>
                <div className='w-[70%] flex flex-col gap-2 items-center md:flex-row'>
                    <img src={icon} alt={platformName} className='hidden md:flex'/>
                    <div className='flex flex-col'>
                        {/* Ad details to perform as Task */}
                        <div className='flex flex-col gap-[0.9rem]'>
                            <small className='mb-[0.4rem] text-[9px] '>{formatDate(task?.createdAt)}</small>
                            <h4 className='text-gray-600 text-[15px] md:text-[18px] font-bold my-[-5px] p-0'>{taskTitle}</h4>
                            <small className='text-gray-600 text-[9px] mb-[1rem]'><span className='font-bold'>To Earn:</span> ₦{task?.earnPerTask}</small>
                        </div>

                        {/* Demographics and platform and create task button */}
                        <div className='flex flex-col w-full gap-3 md:flex-row'>
                            <div className='flex w-full items-center gap-[2rem]'>
                            <ul className='flex gap-3 text-[12px] font-light'>
                                <li><span className='font-bold'>State:</span> {task.state}</li> 
                                <li><span className='font-bold'>LGA:</span> {task.lga}</li>
                                <li><span className='font-bold'>Status:</span> {tasks?.find((task) => 
            task.taskPerformerId === user.id && task.advertId === task._id)?.status}</li>
            {/* <li>Free:{task.isFree ? ("Free") : ("Paid")}</li> */}
            {task.socialPageLink
 ? (<li><span className='font-bold'>Link:</span> <a href={task.socialPageLink} className='text-blue-600'>{task.socialPageLink}</a></li>) : ("")}
                            </ul>
                            <img src={icon} alt={platformName} className='flex w-[20px] h-[20px] md:hidden'/>
                            </div>

                            <div className='md:hidden w-fit flex md:mt-0 md:w-full md:justify-end'>
                                {checkTaskExistence(task._id)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <div className='hidden w-[30%] md:flex md:justify-end'>
                        {checkTaskExistence(task._id)}
                </div>
            </div>
        ))}
        </div>
        

        
    </div>
  )
}

export default TaskEarn