import React from 'react'
import DataTable from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { handleGetAllUser, selectUsers } from '../../../redux/slices/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowDownward, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { handleGetTasks, selectIsError, selectIsLoading, selectTasks } from '../../../redux/slices/taskSlice';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useState } from 'react';


const TasksSingleUser = () => {
    const {userId} = useParams()
  const users = useSelector(selectUsers)
  const tasks = useSelector(selectTasks)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const isError = useSelector(selectIsError)
  const sortIcon = <MdArrowDownward />;
  const [userTasks, setUserTasks] = useState()

  useEffect(() => {
    dispatch(handleGetTasks())
  
    if (isError) {
      toast.error("failed to fetch tasks")
    }
  
  }, [isError, dispatch])

  useEffect(() => {
    const userTasksList = tasks?.filter(task => task.taskPerformerId === userId)
    setUserTasks(userTasksList) 
  }, [tasks])

  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true
    },
    {
      name: 'Task Performer',
      selector: (row) => {
      const taskPerformer = users?.find(user => user._id === row.taskPerformerId)
            return (
                <div className='font-bold text-[13px]'>{taskPerformer?.fullname}</div>
              
            )
      }
    },
    {
      name: 'Advertiser',
      selector: (row) => {
      const advertiser = users?.find(user => user._id === row.advertiserId)
            return (
                <div className='font-bold text-[13px]'>{advertiser?.fullname}</div>
              
            )
      }
    },
    {
      name: 'Platform',
      selector: row => row.platform,
      sortable: true
    },
    {
      name: 'Service',
      selector: row => row.service,
  
    },
    {
      name: 'Units',
      selector: row => row.desiredROI, 
      sortable: true
    },
    {
      name: 'To Earn',
      cell: (row) => (
        <p>₦{row.toEarn}</p>
        ),
      sortable: true
    },
    {
      name: 'Status',
      sortable: true,
      cell: (row) => (
        <p className={`px-6 py-1 rounded-[5px] 
            ${row.status === "Pending Approval" && 'pending'}
            ${row.status === "Awaiting Submission" && 'running'}
            ${row.status === "Submitted" && 'allocating'}
            ${row.status === "Approved" && 'completed'}
            ${row.status === "Rejected" && 'rejected'}
            `}
         >
            {row.status}
        </p>
      )
    },
    {
      name: 'Actions',
      button: true,
      cell: (row) => (
        <button className={'px-6 py-2 bg-gray-800 text-primary rounded-[5px]'}
          onClick={(e) => handleButtonClick(e, row._id)}>
            View
        </button>
      )
    },
  ];
  
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#18141E',
        color: '#f4f4f4',
        fontSize: '15px'
      }
    },
  }
  
  const handleButtonClick = (e, taskId) => {
    e.preventDefault();
    navigate(`/admin/dashboard/task/${taskId}`)
  }
  

  return (
    <div className='w-full mx-auto mt-[2rem]'>
        <div className='flex items-center gap-3 border-b border-gray-200 pb-6'>
            <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))}/>
            <div className='flex flex-col'>
                <p className='font-semibold text-xl text-gray-700'>Go back to User</p>
                <small className='font-medium text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, placeat.</small>
            </div>
        </div>

        <DataTable 
        columns={columns} 
        data={userTasks}
        progressPending={isLoading}
        pagination
        selectableRows
        fixedHeader
        customStyles={customStyles}
        sortIcon={sortIcon}
        handleButtonClick={handleButtonClick}
        />
    </div>
  )
}

export default TasksSingleUser