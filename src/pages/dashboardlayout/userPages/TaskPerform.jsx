import React from 'react'
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
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import { useEffect } from 'react'
import { selectUser, selectUserId } from '../../../redux/slices/authSlice'
import { CheckmarkIcon, LoaderIcon, toast } from 'react-hot-toast'
import {formatDate} from '../../../../utils/formatDate'
import { useRef } from 'react'
import copy from '../../../assets/copy.png'
import { GiCancel } from 'react-icons/gi'
import { handleGetUserTasks, selectTasks } from '../../../redux/slices/taskSlice'
import ImageGallery from '../../../components/ImageGallery'
import Loader from '../../../components/loader/Loader'
import axios from 'axios'
import {saveAs} from 'file-saver'
import { BsGlobe } from 'react-icons/bs'
import { BiArrowToLeft } from 'react-icons/bi'


const TaskPerform = ({taskId, userSocialName, selectedImages, taskSubmitted, handleOnSubmit, handleInputChange, handleImageChange, handleImageRemove, isLoading, icons}) => {
  const linkRef = useRef(null)
  const adCaptionRef = useRef(null)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const userId = useSelector(selectUserId)
  //const [icon, setIcon] = useState('')
  const [newTask, setNewTask] = useState()
  const tasks = useSelector(selectTasks)
  const navigate = useNavigate()
  const [hideUsernameDisplayField, setHideUsernameDisplayField] = useState(false)
  const [hideLinkInputFields, setHideLinkInputFields] = useState(false)
  const [createdAtDate, setCreatedAtDate] = useState()
  const [icon, setIcon] = useState()
  const [adMedia, setAdMedia] = useState()
  const [isDownloading, setIsDownloading] = useState(false)

  const getTask = async() => {
    await dispatch(handleGetUserTasks())
  }
  

  useEffect(() => {
    getTask()
}, [dispatch])

useEffect(() => {
  const selecectTask = tasks?.find(obj => obj._id === taskId)

  setNewTask(selecectTask)

  const selectedPlatformIcon = icons?.find((icon) => icon.platform === newTask?.platform)
  setIcon(selectedPlatformIcon?.icon)

  setAdMedia(selecectTask?.adMedia)
}, [])




//Filter for different services and platforms
useEffect(() => {

    //Link field Hidden
    if (
    newTask?.service === "Instagram Story View" || 
    newTask?.service === "Follow" ||
    newTask?.service === "Like/Favourite" ||
    newTask?.service === "Stream" ||
    newTask?.service === "Facebook Friend" || 
    newTask?.service === "Page Likes" ||
    newTask?.service === "Page Followers" ||
    newTask?.service === "Post Likes" ||
    newTask?.service === "Video Views" ||
    newTask?.service === "Join Twitter Space" ||
    newTask?.service === "TikTok Favourites" ||
    newTask?.service === "Subscribers" ||
    newTask?.service === "LinkedIn Connect"
    ) {
      setHideLinkInputFields(false) 
    }

    //Link field Hidden for whatsapp
    if (newTask?.platform === "whatsapp" && newTask?.service === "Post Your Content") {
      setHideLinkInputFields(true) 
    }

    //Hide username
    if (
      newTask?.service === "Download App" ||
      newTask?.service === "Video Views" ||
      newTask?.service === "Download App and Review" ||
      newTask?.service === "Download App Review and Register" ||
      newTask?.platform === "whatsapp"
    ) {
      setHideUsernameDisplayField(true)
    }
  }, [newTask?.platform, newTask?.service])

  const handleAdCaptionCopy = (e) => {
    adCaptionRef.current.select();
    document.execCommand('copy')
    toast.success('Ad caption copied to clipboard')
  }

  const handleDownload = async(mediaUrl, mediaName) => {
    

    try {
      setIsDownloading(true)
      toast.success('Downloading media file...')
      const response = await fetch(mediaUrl);
      const blob = await response.blob();
      saveAs(blob, 'ad_image.jpg');
     
      setIsDownloading(false)
     toast.success("Ad image downloaded successfully!")
      
    } catch (error) {
      setIsDownloading(false)
      console.error('Error occured during download:', error)
    }
  }
 

  return (
    <div className='w-full h-fit'>
      {/* {isDownloading && <Loader />} */}
      <div className='flex items-center justify-between gap-3 border-b border-gray-200 pb-6'>
                <div className='flex items-center'>
                  <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))} className='mr-1'/>
                      <div className='flex flex-col'>
                          <p className='font-semibold text-xl text-gray-700'></p>
                          <small className='font-medium text-gray-500'>Click <span onClick={() => (navigate(`/dashboard/tasks`))} className='text-secondary'>here</span> to see all your Tasks</small>
                      </div>
                </div>          
      </div>

      <div className='w-full mt-5 md:px-8 md:mt-8'>
            <div className='flex items-center justify-between bg-gray-50 p-6 mb-[2rem] shadow-lg'>
                <div className='flex w-full md:w-[70%] gap-2 items-center'>
                    <img src={icons?.find((icon) => icon.platform === newTask?.platform)?.icon} alt={newTask?.platform} className='hidden md:flex'/>
                    <div className='flex flex-col gap-3'>
                    {/* {setCreatedAtDate(formatDate(newTask?.createdAt))} */}
                        {/* <small>{createdAtDate}</small> */}
                        <p className='text-gray-500 text-[15px]'>{newTask?.title}</p>
                        <div className='flex flex-col gap-2'>
                          <div className='flex items-center gap-2'>
                            <div className='text-gray-600 text-[9px] flex gap-1 items-center mt-2'>
                              <label htmlFor="pricing" className='font-bold'>To Earn:</label>
                              <p>₦{newTask?.toEarn}/task</p> 
                            </div>
                            <img src={icons?.find((icon) => icon.platform === newTask?.platform)?.icon} alt={newTask?.platform} className='md:hidden w-[25px] h-[25px]'/>
                          </div>

                          {/* Status badge */}
                          <div className='md:hidden md:flex-col md:w-[30%] gap-1 text-gray-100 py-2 rounded-2xl'>
                            <label htmlFor="status" className='font-bold text-[12px] text-gray-600'>Status:</label>
                            <p className={`w-full text-[12px] flex  justify-center items-center py-2 px-3 gap-2 
                            ${newTask?.status === "Approved" ? ('bg-secondary') : ('bg-red-700') } rounded-2xl`}>{newTask?.status}<span>{newTask?.status === "Approved" && <CheckmarkIcon />}</span>
                            </p>
                          </div>
                        </div>
                    </div>
                </div>

                {/* Status badge */}
                <div className='hidden md:flex md:flex-col md:w-[30%] items-center gap-1 text-gray-100 py-2 px-4 rounded-2xl'>
                  <label htmlFor="status" className='font-bold text-[12px] text-gray-600'>Status:</label>
                  <p className={`w-full text-[12px] flex text-center justify-center items-center py-2 px-3 gap-2 ${newTask?.status === "Approved" ? ('bg-secondary') : ('bg-red-700') } rounded-2xl`}>{newTask?.status}<span>{newTask?.status === "Approved" && <CheckmarkIcon />}</span></p>
                </div>
            </div>

            {/* Message from Admin */}
            {newTask?.message ? (
              <div className='w-full md-w-500px text-center mb-[2rem]'>
                <label  className='text-gray-500 font-bold text-center mb-[1rem]'>Message from Admin:</label>
                <p className='text-gray-600 font-normal'>
                  {newTask?.message}
                </p>
              </div>
            ): ""}

              {/* Ad Caption */}
              {newTask?.caption ? (
                <div className='w-fit flex flex-col md-w-500px text-center items-center mx-auto mb-[2rem]'>
                <label  className='text-gray-500 font-bold text-center mb-[1rem]'>Message from Advertiser:</label>
                  <div className='flex flex-col items-center gap-1'>
                    <p><span className='text-tertiary'>NOTE:</span> Kindly include the caption below in your post on your WhatsApp Status</p>

                    <div className='flex gap-1 items-center justify-center w-full'>
                    <textarea ref={adCaptionRef} value={newTask?.caption} readOnly className='border border-gray-200 p-3 w-full md:w-[400px] h-fit'></textarea>
                    <img src={copy} alt="click to copy ref link" className='w-[30px] h-[30px]' onClick={handleAdCaptionCopy}/>
                    </div>
                    
                  </div>
                </div>
              ) : ""}
              

              {/* Ad Image */}
              {adMedia?.length > 0 ? (
                <div className='w-fit flex flex-col text-center items-center mx-auto md-w-500px mb-[2rem]'>
                <label  className='text-gray-500 font-bold text-center mb-[1rem]'>Download Media:</label>
                <p><span className='text-tertiary'>NOTE:</span> Download the media below and post on your WhatsApp status</p>
                {adMedia?.map((image, index) => (
                  <div key={index} className='my-[2rem]'>
                  <img src={image?.secure_url} alt={`Image ${index}`} />

                  <button onClick={() => handleDownload(image?.secure_url, image?.public_id)} className='bg-green-700 text-gray-50 px-5 py-2 rounded-2xl mt-[1rem] hover:bg-tertiary'>
                    {!isDownloading && ('Download')}
                    {isDownloading && ('Downloading...')}
                  </button>
                  </div>
                ))}
                </div>
              ) : ""}
              
            

            {/* Verification Instructions */}
              <div className='w-full md-w-500px text-center mb-[2rem]'>
              <h1 className='text-gray-500 font-bold text-center mb-[1rem]'>Verification Instructions</h1>
              <p><span className='text-tertiary'>NOTE:</span> Immediately you perform the task, take a screenshot of the task performed on {newTask?.platform}</p>
                <div className='mt-2'>
                  <p>{newTask?.taskVerification}</p>
                </div>
            </div>
            

            {/* Task link */}
            {hideLinkInputFields ? "" : (
            <div className='flex flex-col gap-2'>
              <label htmlFor="task link" className='text-gray-500 font-bold text-center '>Task Link</label>
              <div className='w-full md:w-[500px] flex items-center justify-center mx-auto'>
                <input type="link" value={newTask?.socialPageLink} readOnly ref={linkRef} className='w-full h-[20px] px-6 py-5 text-gray-800 bg-gray-200 rounded-r rounded-2xl'/>

                <Link to={newTask?.socialPageLink} target="_blank" rel="noopener noreferrer" className='w-[4rem] h-[20px] px-5 py-5 bg-secondary text-primary text-[9px]'>Visit</Link>
              </div>
              <small className='w-full md:w-[500px] mx-auto text-gray-400 text-[12px] text-center'>Remember, the task you were given is {newTask?.service} on {newTask?.platform}, use the link or username to perform this task</small>
            </div>)}

            <div className='flex flex-col items-center gap-3 mt-[4rem]'>
              {/* Submition Form */}
              <form onSubmit={handleOnSubmit} className='flex flex-col'>

                {/* Upload ScreenSHot */}
                {newTask?.status === "Approved" || newTask?.status === "Submitted" ? "" : (
                  <div className='w-full h-full flex flex-col pt-[1rem] items-center border-gray-200'>
                  <label htmlFor="upload proof of work" className='text-gray-500 font-bold text-center mb-[1rem]'>Upload Proof of work</label>
                      <div className='w-full h-fit flex flex-wrap items-center justify-center gap-2 p-5'>
                      {selectedImages?.map((item, index) => (   
                        <div key={index} className='relative w-[200px] h-[200px]'>
                          <img  src={item} alt="preview" className='w-full h-full object-cover'/>
                          <GiCancel  size={20} className='absolute text-tertiary top-0 right-0 pr-1 pt-1' onClick={(e) => handleImageRemove(item)}/>
                        </div> 
                          
                      ))}
                      </div>

                        {/* File Upload Input Tag  */}
                      <input type="file"  name="images"  placeholder='Upload Screenshots' multiple  onChange={handleImageChange} className='w-full p-3 shadow-inner rounded-2xl bg-gray-50 md:w-[300px]' />
                  </div>)
                }
                

                {/* Social Account Link */}
                {hideUsernameDisplayField ? "" : (
                  <div className='w-full md:w-[500px] flex flex-col items-center mt-[2rem] mx-auto'>
                  <label htmlFor="social media username" className='text-gray-500 font-bold text-center mb-[1rem]'>Fill in your {newTask?.platform} Username</label>
                  <input type="text" name="userSocialName" value={userSocialName} placeholder='Enter your social media username' onChange={handleInputChange} className='py-2 px-6 text-gray-800 bg-gray-200 rounded-2xl'/>
                </div>
                )}
                
                 
                  {newTask?.status === "Approved" || newTask?.status === "Submitted" || taskSubmitted ? "" : (
                    <button type='submit' className='flex items-center justify-center gap-2 w-full md:w-[300px] bg-secondary text-gray-100 py-3 px-6 mt-5 rounded-full mx-auto hover:bg-tertiary'>
                      {!isLoading && "Submit"}
                      {isLoading && "Submitting..."}
                    </button>
                  )}
                
              </form>
              {taskSubmitted ? (<button onClick={() => navigate(`/dashboard/tasks`)} className='text-green-700 text-[14px] px-6 py-2 flex items-center gap-1'><span><BiArrowToLeft /></span>Go to your task list page</button>) : ""}
            </div>
        </div>
    </div>
  )
}

export default TaskPerform