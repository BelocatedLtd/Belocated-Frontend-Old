import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { toast } from 'react-hot-toast'
import { MdArrowDownward, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleGetALLUserAdverts } from '../../../redux/slices/advertSlice'
import { selectIsError, selectIsLoading } from '../../../redux/slices/userSlice'

const Adverts = () => {
	const isLoading = useSelector(selectIsLoading)
	const isError = useSelector(selectIsError)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [currentPage, setCurrentPage] = useState(1)
	const [totalRows, setTotalRows] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10) // Adjust as needed
	const [adverts, setAdverts] = useState() // Adjust as needed

	const sortIcon = <MdArrowDownward />

	const columns = [
		{
			name: 'Advertiser',
			selector: (row) => {
				return (
					<div className='font-bold text-[13px]'>{row?.userId?.fullname}</div>
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
			name: 'Units',
			selector: (row) => row.desiredROI,
			sortable: true,
		},
		{
			name: 'Amount',
			selector: (row) => row.adAmount,
			sortable: true,
		},
		{
			name: 'Tasks',
			selector: (row) => row?.tasks,
			sortable: true,
		},
		{
			name: 'Ad Url',
			cell: (row) => (
				<div className='w-full'>
					<a
						href={row?.socialPageLink}
						target='_blank'
						className='text-blue-600'>
						{row?.socialPageLink}
					</a>
				</div>
			),
			selector: (row) => row?.tasks,
			sortable: true,
		},
		{
			name: 'Moderator',
			selector: (row) => row?.tasksModerator,
			sortable: true,
		},
		{
			name: 'Status',
			sortable: true,
			cell: (row) => (
				<p
					className={`px-6 py-1 rounded-[5px] 
          ${row.status === 'Pending' && 'pending'}
          ${row.status === 'Running' && 'running'}
          ${row.status === 'Allocating' && 'allocating'}
          ${row.status === 'Completed' && 'completed'}
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

	const fetchAdverts = async (page, rows) => {
		const response = await dispatch(
			handleGetALLUserAdverts({ page, limit: rows }),
		)
		if (response.payload) {
			setTotalRows(response.payload.totalAdverts)
			setAdverts(response.payload.adverts)
		}
	}

	const handlePageChange = (page) => {
		console.log('🚀 ~ handlePageChange ~ page:', page)
		setCurrentPage(page)
		fetchAdverts(page, rowsPerPage)
	}

	const handleChangeRowsPerPage = (rowsPerPage) => {
		console.log('🚀 ~ handlePageChange ~ rowsPerPage:', rowsPerPage)
		setRowsPerPage(rowsPerPage)
		fetchAdverts(currentPage, rowsPerPage)
	}

	useEffect(() => {
		fetchAdverts(currentPage)

		if (isError) {
			toast.error('Failed to fetch adverts')
		}
	}, [isError, dispatch, currentPage])

	const handleButtonClick = (e, advertId) => {
		e.preventDefault()
		navigate(`/admin/dashboard/advert/${advertId}`)
	}

	return (
		<div className='w-full mx-auto mt-[2rem]'>
			<div className='flex items-center justify-between mb-[2rem]'>
				<div className='flex items-center'>
					<MdOutlineKeyboardArrowLeft
						size={30}
						onClick={() => navigate(-1)}
						className='mr-1'
					/>
					<p className='font-semibold text-xl text-gray-700'>Adverts</p>
				</div>
			</div>

			<DataTable
				columns={columns}
				data={adverts}
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

export default Adverts
