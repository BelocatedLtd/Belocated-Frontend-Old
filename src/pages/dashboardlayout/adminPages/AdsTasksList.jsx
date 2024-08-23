import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { toast } from 'react-hot-toast'
import { MdArrowDownward, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
	handleGetTasks,
	selectIsError,
	selectIsLoading,
	selectTasks,
} from '../../../redux/slices/taskSlice'
import { selectUsers } from '../../../redux/slices/userSlice'

const AdsTasksList = () => {
	const { id } = useParams()
	console.log('🚀 ~ AdsTasksList ~ id:', id)
	const tasks = useSelector(selectTasks)
	const users = useSelector(selectUsers)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isLoading = useSelector(selectIsLoading)
	const isError = useSelector(selectIsError)
	const sortIcon = <MdArrowDownward />
	const [taskAdList, seTaskAdList] = useState()
	const [sortedTasks, setSortedTasks] = useState()
	const [selectedStatus, setSelectedStatus] = useState('All')

	useEffect(() => {
		const adsTaskList = tasks?.filter((task) => task.advertId === id)
		seTaskAdList(adsTaskList)
	}, [tasks])

	useEffect(() => {
		console.log(selectedStatus)
		//const filteredTasks = tasks?.filter(task => task?.status !== 'Awaiting Submission')

		// Filter tasks based on selected status
		const filteredTasks =
			selectedStatus === 'All'
				? tasks
				: taskAdList.filter((task) => task.status === selectedStatus)

		setSortedTasks(filteredTasks)
	}, [tasks, selectedStatus])

	const columns = [
		{
			name: 'Title',
			selector: (row) => row.title,
			sortable: true,
		},
		{
			name: 'Task Performer',
			selector: (row) => {
				const taskPerformer = users?.find(
					(user) => user._id === row.taskPerformerId,
				)
				return (
					<div className='font-bold text-[13px]'>{taskPerformer?.fullname}</div>
				)
			},
		},
		{
			name: 'Advertiser',
			selector: (row) => {
				const advertiser = users?.find((user) => user._id === row.advertiserId)
				return (
					<div className='font-bold text-[13px]'>{advertiser?.fullname}</div>
				)
			},
		},
		{
			name: 'Platform',
			selector: (row) => row.platform,
			sortable: true,
		},
		{
			name: 'Service',
			selector: (row) => row.service,
		},
		{
			name: 'To Earn',
			cell: (row) => <p>₦{row.toEarn}</p>,
			sortable: true,
		},
		{
			name: 'Status',
			sortable: true,
			cell: (row) => (
				<p
					className={`px-6 py-1 rounded-[5px] 
            ${row.status === 'Pending Approval' && 'pending'}
            ${row.status === 'Awaiting Submission' && 'running'}
            ${row.status === 'Submitted' && 'allocating'}
            ${row.status === 'Approved' && 'completed'}
            ${row.status === 'Rejected' && 'rejected'}
            `}>
					{row.status}
				</p>
			),
		},
		{
			name: 'Actions',
			button: true,
			cell: (row) => (
				<button
					className={'px-6 py-2 bg-gray-800 text-primary rounded-[5px]'}
					onClick={(e) => handleButtonClick(e, row._id)}>
					View
				</button>
			),
		},
	]

	const customStyles = {
		headCells: {
			style: {
				backgroundColor: '#18141E',
				color: '#f4f4f4',
				fontSize: '15px',
			},
		},
	}

	const handleButtonClick = (e, taskId) => {
		e.preventDefault()
		navigate(`/admin/dashboard/task/${taskId}`)
	}

	useEffect(() => {
		dispatch(handleGetTasks())

		if (isError) {
			toast.error('failed to fetch tasks')
		}
	}, [isError, dispatch])

	return (
		<div className='w-full mx-auto mt-[2rem]'>
			<div className='flex items-center justify-between mb-[2rem] py-5'>
				<div className='flex items-center'>
					<MdOutlineKeyboardArrowLeft
						size={30}
						onClick={() => navigate(-1)}
						className='mr-1'
					/>
					<p className='font-semibold text-xl text-gray-700'>User Tasks</p>
				</div>

				<div>
					<select
						name=''
						id=''
						value={selectedStatus}
						onChange={(e) => setSelectedStatus(e.target.value)}
						className='py-3 p-3 border border-gray-400 rounded-xl '>
						<option value='All'>All</option>
						<option value='Approved'>Approved</option>
						<option value='Submitted'>Submitted</option>
						<option value='Awaiting Submission'>Awaiting Submission</option>
						<option value='Rejected'>Rejected</option>
					</select>
				</div>
			</div>

			<DataTable
				columns={columns}
				data={sortedTasks}
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

export default AdsTasksList
