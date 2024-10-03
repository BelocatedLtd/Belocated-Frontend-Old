import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { MdArrowDownward, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectIsLoading, selectTasks } from '../../../redux/slices/taskSlice'
import { selectUsers } from '../../../redux/slices/userSlice'
import { getTasksByAdvertId } from '../../../services/taskServices'

const AdsTasksList = () => {
	const { id } = useParams()
	const tasks = useSelector(selectTasks)
	const users = useSelector(selectUsers)
	const navigate = useNavigate()
	const isLoading = useSelector(selectIsLoading)
	const sortIcon = <MdArrowDownward />
	const [taskAdList, seTaskAdList] = useState()
	const [selectedStatus, setSelectedStatus] = useState('All')

	const [currentPage, setCurrentPage] = useState(1)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [totalRows, setTotalRows] = useState(0)

	const fetchTasksByAdvertId = async () => {
		const resp = await getTasksByAdvertId({
			advertId: id,
			page: currentPage,
			limit: rowsPerPage,
			status: selectedStatus,
		})
		seTaskAdList(resp.tasks)
		setTotalRows(resp.totalTasks)
	}

	useEffect(() => {
		fetchTasksByAdvertId()
	}, [selectedStatus, currentPage, rowsPerPage])

	const handlePageChange = (page) => {
		setCurrentPage(page)
	}

	const handleChangeRowsPerPage = (limit) => {
		setRowsPerPage(limit)
	}

	const columns = [
		{
			name: 'Title',
			selector: (row) => row.title,
			sortable: true,
		},
		{
			name: 'Task Performer',
			selector: (row) => {
				return (
					<div className='font-bold text-[13px]'>
						{row?.taskPerformerId?.fullname}
					</div>
				)
			},
		},
		{
			name: 'Advertiser',
			selector: (row) => {
				return (
					<div className='font-bold text-[13px]'>
						{row?.advertiserId?.fullname}
					</div>
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
				data={taskAdList}
				progressPending={isLoading}
				pagination
				paginationServer
				paginationTotalRows={totalRows}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handleChangeRowsPerPage}
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
