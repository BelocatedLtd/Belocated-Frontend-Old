import React from 'react'
import close from '../../assets/close.svg'
import  ReactDOM  from 'react-dom'
import { MdCancel } from 'react-icons/md'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CheckmarkIcon, toast } from 'react-hot-toast'
import { handleApproveTask, handleRejectTask, selectIsError, selectIsSuccess } from '../../redux/slices/taskSlice'
import Loader from '../loader/Loader'
import { useEffect } from 'react'
//import socket from '../../services/socket'
import io from 'socket.io-client'
import { handleGetAllActivities } from '../../redux/slices/feedSlice'
import { BACKEND_URL } from '../../../utils/globalConfig'


const socket = io.connect(`${BACKEND_URL}`)

const TaskModal = ({handleModal, task, taskPerformer}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isError = useSelector(selectIsError)
    const isSuccess = useSelector(selectIsSuccess)
    const [isLoading, setIsLoading] = useState(false)
    const [rejectMessage, setRejectMessage] = useState(false)

    const initialState = {
        taskStatus: '',
        message: ''
    }

    const [taskConfirm, setTaskConfirm] = useState(initialState)

    const {taskStatus, message} = taskConfirm
    

    const handleInputChange = (e) => {
        const {name, value } = e.target;
        setTaskConfirm({ ...taskConfirm, [name]: value })
      }

    useEffect(() => {
        if (taskStatus === "Rejected") {
            setRejectMessage(true)
        }

        if (taskStatus === "Approved") {
            setRejectMessage(false)
        }

        if (taskStatus === "Partial Approval") {
            setRejectMessage(true)
        }
    }, [taskStatus])


    const approveTaskData = {
        taskId: task?._id, 
        status: taskStatus,
        message: message,
    }

    const rejectTaskData = {
        taskId: task?._id, 
        status: taskStatus,
        message: message,
    }


    const confirm = async(e) => {
        e.preventDefault()
       
       
        //Admin Rejects Tasks
        if (taskStatus === "Rejected") {

            if (!approveTaskData?.taskId) {
                toast.error('Task information missing')
                return
            }

            if (!message) {
                toast.error("You have to let the user know why their Task was rejected")
                return
            }

            setIsLoading(true)
           await dispatch(handleRejectTask(rejectTaskData))
           setIsLoading(false)


            if (isError) {
                toast.error("Error Rejecting Task")
                setIsLoading(false)
            }
    
            if (isSuccess) {
                toast.error("Task Rejected")
                setIsLoading(false)
                navigate(-1)
                setIsLoading(false)
        }
        }

        //If Admin Approves
        if (taskStatus === "Approved" || taskStatus === "Partial Approval") {

            if (!approveTaskData?.taskId) {
                toast.error('Task information missing')
                return
            }
        
            setIsLoading(true)
            const response = await dispatch(handleApproveTask(approveTaskData))
            
            setIsLoading(false)
            if (!response.payload) {
                toast.error("Error Approving Task")
                setIsLoading(false)
            }
    
            if (response.payload) {
                toast.success("Task Approved")
                setIsLoading(false)
    
                const emitData = {
                    userId: task.taskPerformerId,
                    action: `@${taskPerformer?.username} from ${taskPerformer?.location} just earned ₦${task?.toEarn} from a task completed`
                }
    
                
    
                //Emit Socket event to update activity feed
                socket.emit('sendActivity', emitData)  
                
                navigate(-1)
                handleModal()
                setIsLoading(false)
            }
            setIsLoading(false)
        }
           
        setIsLoading(false)
    }

    return ReactDOM.createPortal(
        <div className='wrapper'>
          {isLoading && <Loader />}
            <div className='relative modal w-[85%] h-[400px] bg-primary md:w-[400px]'>
              <img src={close} alt="close" onClick={handleModal} size={40} className='absolute top-[-1rem] right-[-1rem] text-tertiary' />
              <div className='w-full h-full modal__header__text flex flex-col items-center justify-center'>
                <h3 className='text-2xl text-gray-800 font-bold px-6 mb-4 text-center'>Confirm or reject task</h3>
                <form onSubmit={confirm} className='flex flex-col'>
                    <select name="taskStatus" className='py-3 px-6 mb-3 border border-gray-500' onChange={handleInputChange} >
                        <option value="" className='bg-gray-900 text-primary'>Change Task Status</option>
                        <option value="Approved" className='bg-gray-900 text-primary'>Approve</option>
                        <option value="Partial Approval" className='bg-gray-900 text-primary'>Partial Approval</option>
                        <option value="Rejected" className='bg-gray-900 text-primary'>Reject</option>
                    </select>

                    {rejectMessage ? (
                        <div className='w-full h-fit flex flex-col mb-2'>
                        <label htmlFor="message">Leave a message</label>
                        <input type="text" name="message" className='border border-gray-500 py-3 px-6' onChange={handleInputChange} />
                        </div>
                    ) : ""}

                    <div className='flex items-center justify-center gap-2 '>
                    <button className='py-2 px-4 text-[15px] bg-tertiary text-primary rounded-full'>Confirm</button>
                    <button onClick={(e) => handleModal(e)} className='py-2 px-4 text-[15px] bg-secondary text-primary rounded-full'>Cancel</button>
                </div>
                </form>
                
              </div>
            </div>
        </div>,
        document.getElementById("backdrop")
      )
}

export default TaskModal