import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectIsLoading } from '../../../redux/slices/transactionSlice'
import { selectUsers } from '../../../redux/slices/userSlice'
import { getAllTransactions } from '../../../services/transactionService'

const Transactions = () => {
	const navigate = useNavigate()
	const users = useSelector(selectUsers)
	const isLoading = useSelector(selectIsLoading)

	const [currentPage, setCurrentPage] = useState(1)
	const [totalRows, setTotalRows] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const [transactions, setTransactions] = useState([])

	const columns = [
		{
			name: 'Trx Id',
			selector: (row) => row.trxId,
		},
		{
			name: 'User',
			cell: (row) => {
				const user = users?.find((user) => user._id === row?.userId)
				return (
					<div className='font-bold text-[13px]'>
						{user?.fullname ? user?.fullname : user?.username}
					</div>
				)
			},
		},
		{
			name: 'Transaction Type',
			selector: (row) => row.trxType,
		},
		{
			name: 'Amount',
			cell: (row) => {
				return <div className='font-bold text-[13px]'>₦{row.chargedAmount}</div>
			},
			sortable: true,
		},
		{
			name: 'Date',
			selector: (row) => row.date,
		},
		{
			name: 'Status',
			selector: (row) => row.status,
			sortable: true,
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

	const fetchTransactions = async (page, limit) => {
		const response = await getAllTransactions(page, limit)

		if (response) {
			setTotalRows(response.totalTransactions)
			setTransactions(response.transactions)
		}
	}

	const handlePageChange = (page) => {
		setCurrentPage(page)
		fetchTransactions(page, rowsPerPage)
	}

	const handleChangeRowsPerPage = (rowsPerPage) => {
		setRowsPerPage(rowsPerPage)
		fetchTransactions(currentPage, rowsPerPage)
	}

	useEffect(() => {
		fetchTransactions(currentPage, rowsPerPage)
	}, [])

	return (
		<div className='w-full mx-auto mt-[2rem]'>
			<div className='flex items-center justify-between mb-[2rem]'>
				<div className='flex items-center'>
					<MdOutlineKeyboardArrowLeft
						size={30}
						onClick={() => navigate(-1)}
						className='mr-1'
					/>
					<p className='font-semibold text-xl text-gray-700'>Transactions</p>
				</div>
			</div>
			<DataTable
				columns={columns}
				data={transactions}
				progressPending={isLoading}
				pagination
				selectableRows
				paginationServer
				fixedHeader
				customStyles={customStyles}
				paginationTotalRows={totalRows}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handleChangeRowsPerPage}
				//handleButtonClick={handleButtonClick}
			/>
		</div>
	)
}

export default Transactions
