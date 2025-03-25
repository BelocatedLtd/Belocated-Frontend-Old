import React from 'react'
import close from '../../assets/close.svg'
import  ReactDOM  from 'react-dom'
import { MdCancel } from 'react-icons/md'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CheckmarkIcon, toast } from 'react-hot-toast'
import Loader from '../loader/Loader'
import { selectUser } from '../../redux/slices/authSlice'
import { handleManageUser } from '../../services/authServices'


const ManageUserModal = ({manageUser, user}) => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const adminUser = useSelector(selectUser)

    const initialState = {
      userId: '',
      status: ''
  }

  const [userConfirm, setUserConfirm] = useState(initialState)

  const {userId, status} = userConfirm

    const {_id} = user

    const handleInputChange = (e) => {
      const {name, value } = e.target;
      setUserConfirm({ ...userConfirm, [name]: value })
    }

    const formData = {
      userId: _id,
      status: status
    }

    

    const confirm = async(e) => {
        e.preventDefault()
    
        if (formData.status === "null") {
          toast.error("You have to select between suspend or ban user")
          return
        }
        

        setIsLoading(true)
        const response = await handleManageUser(formData)
        setIsLoading(false)

        if (!response) {
            toast.error("Failed to change user account status")
        }

        if (response) {
            toast.success("User Account Status Changed")
           // navigate(`/admin/dashboard/users/${adminUser.username}`)
           manageUser();
           
        }
    }


    return ReactDOM.createPortal(
        <div className='wrapper'>
          {isLoading && <Loader />}
            <div className='relative modal w-[350px] h-[300px] bg-primary md:w-[400px]'>
              <img src={close} alt="close" onClick={manageUser} size={40} className='absolute top-[-1rem] right-[-1rem] text-tertiary' />
              <div className='w-full h-full modal__header__text flex flex-col items-center justify-center'>
                <h3 className='text-2xl text-gray-800 font-bold px-6 mb-4 text-center'>
                Manage {user.username}</h3>
                <form onSubmit={confirm} className='flex flex-col items-center gap-2'>
                    <select name="status" id="" className='py-3 px-6 mb-3 border border-gray-500' onChange={handleInputChange}>
                      <option value="null" className='bg-gray-900 text-primary'>Manage User</option>
                      <option value="Active" className='bg-gray-900 text-primary'>Re-activate User</option>
                      <option value="Suspended" className='bg-gray-900 text-primary'>Suspend User</option>
                      <option value="Banned" className='bg-gray-900 text-primary'>Ban User</option>
                      <option value="Delete" className='bg-gray-900 text-primary'>Delete User</option>
                    </select>
                    <button onClick={confirm} className='py-2 px-4 mt-3 text-[15px] bg-tertiary text-primary rounded-full'>Submit</button>
                </form>
              </div>
            </div>
        </div>,
        document.getElementById("backdrop")
      )
}

export default ManageUserModal
