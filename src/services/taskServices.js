import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/globalConfig'
import axios from "axios"

import { getToken } from '../../utils/tokenHandler'


const getAuthHeaders = () => {
    const token = getToken()

    if (token) {
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }
}


// Create Task
export const createTask = async (taskData) => {
    const headers = getAuthHeaders();
    const response = await axios.post(`${BACKEND_URL}/api/tasks/create`, taskData, headers)
   return response.data   
}

// Get Task
export const getTask = async(taskId) => {
    const headers = getAuthHeaders();
    const response = await axios.get(`${BACKEND_URL}/api/tasks/task/${taskId}`, headers)
   return response.data      
}

// Get User Tasks
export const getUserTasks = async() => {
    const headers = getAuthHeaders();
    const response = await axios.get(`${BACKEND_URL}/api/tasks/task`, headers)
   return response.data      
}

// Get All Tasks
export const getTasks = async() => {
    const headers = getAuthHeaders();
    const response = await axios.get(`${BACKEND_URL}/api/tasks`, headers)
   return response.data      
}

// Submit task
export const submitTask = async (formData) => {
    const headers = getAuthHeaders();
    const response = await axios.post(`${BACKEND_URL}/api/tasks/submit`, formData, headers)
  return response.data   
}

// Approve task
export const approveTask = async (taskData) => {
    const headers = getAuthHeaders();
    const response = await axios.post(`${BACKEND_URL}/api/tasks/approve`, taskData, headers)
   return response.data   
}

// Reject task
export const rejectTask = async (taskData) => {
    const headers = getAuthHeaders();
    const response = await axios.post(`${BACKEND_URL}/api/tasks/reject`, taskData, headers)
    return response.data   
}

// Delete task
export const deleteTask = async (taskId) => {
    const headers = getAuthHeaders();
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/tasks/delete/${taskId}`, headers)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
         toast.error(message)
    }
}