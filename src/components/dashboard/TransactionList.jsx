import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom'
import { handleGetUserTransactions } from '../../redux/slices/transactionSlice'
import { selectTransactions } from '../../redux/slices/transactionSlice';
import { selectIsLoading } from '../../redux/slices/transactionSlice';
import { selectIsError } from '../../redux/slices/transactionSlice';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { selectUser } from '../../redux/slices/authSlice';

const TransactionList = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    //const {transactions, isLoading, isError, message} = useSelector((state) => state.transactions)
    const transactions = useSelector(selectTransactions)
    const isLoading = useSelector(selectIsLoading)
    const isError = useSelector(selectIsError)
    const [perPage, setPerPage] = useState(10)
    const navigate = useNavigate()

    const columns = [
        {
          name: 'S/N', 
          selector: row => row.trxId,
        },
        {
          name: 'Transaction Type',
          selector: row => row.trxType,
        },
        {
          name: 'Amount',
          selector: row => row.chargedAmount,
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
    
    //   const handleButtonClick = (e, artisanId) => {
    //     e.preventDefault();
    //     navigate(`/dashboard/artisan/${artisanId}`)
    //   }
    
       useEffect(() => {
        dispatch(handleGetUserTransactions(user?.token))
    
      if (isError) {
        toast.error("failed to fetch transactions")
      }
    }, [isError, dispatch])


    return (
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
  )
}

export default TransactionList