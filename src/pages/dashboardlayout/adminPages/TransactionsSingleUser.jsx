import React from 'react'
import DataTable from 'react-data-table-component';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectTransactions, selectIsError, selectIsLoading, handleGetTransactions } from '../../../redux/slices/transactionSlice';
import { selectUsers, handleGetAllUser } from '../../../redux/slices/userSlice';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const TransactionsSingleUser = () => {
    const {userId} = useParams()
  const navigate = useNavigate()
  const users = useSelector(selectUsers)
  const dispatch = useDispatch()
  const transactions = useSelector(selectTransactions)
  const isLoading = useSelector(selectIsLoading)
  const isError = useSelector(selectIsError)
  const [userTransactions, setUserTransactions] = useState()

  useEffect(() => {
    const userTransactionsList = transactions?.filter(trx => (trx.userId?._id || trx.userId) === userId)
    setUserTransactions(userTransactionsList) 
  }, [transactions, userId])

  const columns = [
    {
      name: 'Trx Id', 
      selector: row => row.trxId,
    },
    {
      name: 'User',
      cell: (row) => {
        const tUserId = row.userId?._id || row.userId
        const user = users?.find(user => user._id === tUserId)
              return (
                
                  <div className='font-bold text-[13px]'>{user?.fullname || user?.username || row.userId?.fullname}</div>
                
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
    if (users && users.length === 0) {
      dispatch(handleGetAllUser({ page: 1, limit: 1000 }))
    }
  }, [dispatch, users?.length])

  useEffect(() => {
    dispatch(handleGetTransactions({ page: 1, limit: 10000 }))

    if (isError) {
      toast.error("failed to fetch transactions")
    }

  }, [isError, dispatch])


  return (
        <div className='w-full mx-auto mt-[2rem]'>
        <DataTable 
        columns={columns} 
        data={userTransactions}
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

export default TransactionsSingleUser