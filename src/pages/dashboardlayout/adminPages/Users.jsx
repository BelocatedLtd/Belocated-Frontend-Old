import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import toast from 'react-hot-toast';
import { AiFillDelete } from 'react-icons/ai'
import { MdArrowDownward, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DataSearch from '../../../components/adminComponents/DataSearch'
import Loader from '../../../components/loader/Loader'
import {
	handleGetAllActivities,
	selectActivities,
} from '../../../redux/slices/feedSlice'
import { selectTasks } from '../../../redux/slices/taskSlice'
import { selectIsLoading } from '../../../redux/slices/userSlice'
import { trashAllUserActivities } from '../../../services/feedService'
import { getAllUser } from '../../../services/userServices'

const Users = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const tasks = useSelector(selectTasks)
	const activities = useSelector(selectActivities)
	const isLoading = useSelector(selectIsLoading)
	const sortIcon = <MdArrowDownward />
	const [activityIsLoading, setactivityIsLoading] = useState(false)

	const [currentPage, setCurrentPage] = useState(1)
	const [totalRows, setTotalRows] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const [users, setUsers] = useState([])

	useEffect(() => {
		dispatch(handleGetAllActivities())
	}, [])

	const trashAllActivities = async () => {
		if (activities.length < 500) {
			toast.error('Lets allow it get to atleast 500 activities in the feed')
			return
		}

		setactivityIsLoading(true)
		const response = trashAllUserActivities()
			.catch((error) => {
				setactivityIsLoading(false)
				toast.error("Failed to trash users' activities")
				console.log(error)
			})
			.then((res) => {
				setactivityIsLoading(false)
				console.log(res)
			})

		toast.promise(response, {
			loading: 'Emptying activity feed...',
			success: <b>Activity feed emptied successfully</b>,
			error: <b>Failed to emptying activity feed</b>,
		})
	}

	const handleFilter = (e) => {
		e.preventDefault()
		const newData = fetchUsers(currentPage, rowsPerPage, e?.target?.value)
	}

	const columns = [
		{
			name: 'Fullname',
			selector: (row) => row.fullname,
		},
		{
			name: 'Username',
			selector: (row) => row.username,
			sortable: true,
		},
		{
			name: 'Email',
			selector: (row) => row.email,
		},
		{
			name: 'Phone',
			selector: (row) => row.phone,
			sortable: true,
		},
		{
			name: 'State',
			selector: (row) => row.location,
			sortable: true,
		},
		{
			name: 'Gender',
			selector: (row) => row.gender,
			sortable: true,
		},
		{
			name: 'Ads Created',
			selector: (row) => row.adsCreated,
			sortable: true,
		},
		{
			name: 'Task On Going',
			selector: (row) => row.taskOngoing,
			sortable: true,
		},
		{
			name: 'Tasks Completed',
			selector: (row) => row.taskCompleted,
			sortable: true,
		},
		{
			name: 'Referred Users',
			selector: (row) => row.referrals?.length,
			sortable: true,
		},
		{
			name: 'Actions',
			button: true,
			cell: (row) => (
				<button
					className='bg-[#18141E] text-gray-100 px-3 py-2 rounded-2xl hover:bg-btn hover:bg-secondary'
					onClick={(e) => handleButtonClick(e, row._id)}>
					View User
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

	const handleButtonClick = (e, userId) => {
		e.preventDefault()
		navigate(`/admin/dashboard/user/${userId}`)
	}

	const handlePageChange = (page) => {
		setCurrentPage(page)
		fetchUsers(page, rowsPerPage)
	}

	const handleChangeRowsPerPage = (rowsPerPage) => {
		setRowsPerPage(rowsPerPage)
		fetchUsers(currentPage, rowsPerPage)
	}

	const fetchUsers = async (page, limit, search) => {
		const response = await getAllUser(page, limit, search)

		if (response) {
			setTotalRows(response.totalUsers)
			setUsers(response.users)
		}
	}

	useEffect(() => {
		fetchUsers(currentPage, rowsPerPage)
	}, [])

	return (
		<div className='w-full mx-auto mt-[2rem]'>
			{activityIsLoading && <Loader />}
			<div className='flex items-center justify-between mb-[2rem]'>
				<div className='flex items-center'>
					<MdOutlineKeyboardArrowLeft
						size={30}
						onClick={() => navigate(-1)}
						className='mr-1'
					/>
					<p className='font-semibold text-xl text-gray-700'>Users</p>
				</div>

				<div className='flex items-center gap-2'>
					<label>User Activities:</label>
					<p>{activities.length}</p>
					<AiFillDelete
						className='text-secondary hover:text-tertiary'
						onClick={trashAllActivities}
					/>
				</div>
			</div>
			<DataSearch placeholder='Search User...' handleFilter={handleFilter} />
			{users.length > 0 && (
				<DataTable
					columns={columns}
					data={users}
					progressPending={isLoading}
					pagination
					selectableRows
					paginationServer
					fixedHeader
					customStyles={customStyles}
					sortIcon={sortIcon}
					handleButtonClick={handleButtonClick}
					paginationTotalRows={totalRows}
					onChangePage={handlePageChange}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			)}
		</div>
	)
}

export default Users
