import React from 'react'
import DataTable from 'react-data-table-component';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectTransactions, selectIsError, selectIsLoading, handleGetTransactions } from '../../../redux/slices/transactionSlice';
import { selectUsers } from '../../../redux/slices/userSlice';
import { toast } from 'react-hot-toast';
import { selectUser } from '../../../redux/slices/authSlice';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';

const Transactions = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const users = useSelector(selectUsers)
  const dispatch = useDispatch()
  const transactions = useSelector(selectTransactions)
  const isLoading = useSelector(selectIsLoading)
  const isError = useSelector(selectIsError)

  const columns = [
    {
      name: 'Trx Id', 
      selector: row => row.trxId,
    },
    {
      name: 'User',
      cell: (row) => {
        const user = users?.find(user => user._id === row?.userId)
              return (
                
                  <div className='font-bold text-[13px]'>{user?.fullname ? user?.fullname : user?.username}</div>
                
              )
        }
    },
    {
      name: 'Transaction Type',
      selector: row => row.trxType,
    },
    {
      name: 'Amount',
      cell: (row) => {
              return (
                  <div className='font-bold text-[13px]'>₦{row.chargedAmount}</div>
              )
        },
      sortable: true
    },
    {
      name: 'Date',
      selector: row => row.date,
  
    },
    {
      name: 'Status',
      selector: row => row.status, 
      sortable: true
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

  const handleButtonClick = (e, userId) => {
    e.preventDefault();
   // navigate(`/admin/dashboard/user/${userId}`)
  }

   useEffect(() => {
    dispatch(handleGetTransactions(user?.token))

    if (isError) {
      toast.error("failed to fetch users")
    }

}, [isError, dispatch])


  return (
        <div className='w-full mx-auto mt-[2rem]'>
          <div className='flex items-center justify-between mb-[2rem]'>
                <div className='flex items-center'>
                <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))} className='mr-1'/>
                    <p className='font-semibold text-xl text-gray-700'>Transactions</p>
                </div>
          </div>
        <DataTable 
        columns={columns} 
        data={transactions}
        progressPending={isLoading}
        pagination
        selectableRows
        fixedHeader
        customStyles={customStyles}
        //handleButtonClick={handleButtonClick}
        />
        </div>
  )
}

export default Transactions