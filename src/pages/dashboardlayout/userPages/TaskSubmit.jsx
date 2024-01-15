import React from 'react'
import { useState } from 'react'
import TaskPerform from './TaskPerform'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { handleSubmitTask, selectTasks, selectIsLoading, selectIsError, selectIsSuccess, handleGetUserTasks, handleGetTasks } from '../../../redux/slices/taskSlice'
import { selectUser, selectUserId } from '../../../redux/slices/authSlice'
import { useEffect } from 'react'
import { icons} from '../../../components/data/socialIcon'
import io from 'socket.io-client'
import { BACKEND_URL } from '../../../../utils/globalConfig'
import Loader from '../../../components/loader/Loader'
import { submitTask } from '../../../services/taskServices'


const socket = io.connect(`${BACKEND_URL}`)



const TaskSubmit = () => {
    const dispatch = useDispatch()
    // const isLoading = useSelector(selectIsLoading)
    // const isSuccess = useSelector(selectIsSuccess)
    const isError = useSelector(selectIsError)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate
    const user = useSelector(selectUser)
    const { taskId } = useParams()
    const tasks = useSelector(selectTasks)
    const [task, setTask] = useState()
    const [imageArray, setimageArray] = useState()
    const [selectedImages, setSelectedImages] = useState([])
    const [userSocialName, setUserSocialName] = useState("")
    const [taskSubmitted, setTaskSubmitted] = useState(false)


    //const { userSocialName } = taskSubmitData

    const getTask = async() => {
      await dispatch(handleGetUserTasks())
    }
    
    useEffect(() => {
      getTask()
  }, [dispatch])
    

    useEffect(() => {
      setTask(tasks?.find(obj => obj._id === taskId))
    }, [])

    //Handle Input
    const handleInputChange = (e) => {
        setUserSocialName(e.target.value);
      } 


     // Upload and preview multiple screenshots
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setimageArray(files)


    //Create an array of files previews
    const filePreviews = Array.from(files).map((file) => 
    URL.createObjectURL(file));

    setSelectedImages(filePreviews);
  }

  //Remove uploaded images
  const handleImageRemove = (imagePreview) => {
    //filter out the selected image and update the state
    const updatedImages = selectedImages.filter((preview) => preview !== imagePreview);

    setSelectedImages(updatedImages);

    //Revoke the object URL to release memory
    URL.revokeObjectURL(imagePreview);
    toast.success("Image discarded successfully")
  };

  //Append and prepare form data for transport
  const formData = new FormData();

  for (let i = 0; i < imageArray?.length; i++ ) {
    formData?.append('images', imageArray[i]);
  };

  formData.append('taskId', taskId);
  formData.append('userSocialName', userSocialName); 



    const handleOnSubmit = async (e) => {
      e.preventDefault()

      if (!imageArray) {
        toast.error("Please upload a screenshot to prove you performed the Task")
        return
      }    

      //await dispatch(handleSubmitTask(formData)) 

      setIsLoading(true)
      const response = await submitTask(formData)

      setIsLoading(false)

      if (response === "Task submitted successfully, wait for Admin's Approval") {

        setIsLoading(false)
        setTaskSubmitted(true)
        toast.success('Task submitted, wait for admins response')
        
      //Emit socket io event to the backend
          const emitData = {
            userId: user?.id,
            action: `@${user?.username} just performed a task on ${task?.platform}`
        }

        //Emit Socket event to update activity feed
       socket.emit('sendActivity', emitData) 

       navigate('/dashboard/tasks')
       return
       
      }  
      
      if (!response) {
        setIsLoading(false)
        setTaskSubmitted(false)
        toast.error('Error submitting task')
        return
      }

      }


  return (
    <div className='w-full h-fit'>
      {isLoading && <Loader />}
        <TaskPerform 
            taskId = {taskId}
            // newTask= {task}
            isLoading = {isLoading}
            icons={icons}
            taskSubmitted={taskSubmitted}
            userSocialName= {userSocialName}
            selectedImages={selectedImages}
            handleOnSubmit={handleOnSubmit} 
            handleInputChange={handleInputChange} 
            handleImageChange={handleImageChange} 
            handleImageRemove={handleImageRemove}
        />
    </div>
  )
}

export default TaskSubmit