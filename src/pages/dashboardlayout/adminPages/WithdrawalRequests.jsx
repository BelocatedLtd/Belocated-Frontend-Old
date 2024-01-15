import React from 'react'
import DataTable from 'react-data-table-component';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleGetAllUser, selectUsers } from '../../../redux/slices/userSlice';
import { toast } from 'react-hot-toast';
import { handleGetWithdrawals, selectIsError, selectIsLoading, selectIsSuccess, selectWithdrawals } from '../../../redux/slices/walletSlice';
import WithdrawalModal from '../../../components/adminComponents/WithdrawalModal';
import { useState } from 'react';

const WithdrawalRequests = () => {
  const navigate = useNavigate()
  const users = useSelector(selectUsers)
  const dispatch = useDispatch()
  const withdrawalList = useSelector(selectWithdrawals)
  const isLoading = useSelector(selectIsLoading)
  const isSuccess = useSelector(selectIsSuccess)
  const isError = useSelector(selectIsError)
  const [toggleModal, setToggleModal] = useState(false)
  const [wdDataItem, setWdData] = useState()
  const [wdUser, setWdUser] = useState()

  useEffect(() => {
    dispatch(handleGetAllUser())
    dispatch(handleGetWithdrawals())

    if (isError) {
      toast.error("failed to fetch withdrawal requests")
    }

}, [isError, dispatch])

  const columns = [
    {
      name: 'User',
      cell: (row) => {
        const user = users?.find(user => user._id === row?.userId)
        setWdUser(user)
              return (
                
                  <div className='font-bold text-[13px]'>{user?.fullname ? user?.fullname : user?.username}</div>
                
              )
        }
    },
    {
      name: 'Withdrawal Method',
      selector: row => row.withdrawMethod,
    },
    {
      name: 'Amount',
      cell: (row) => {
              return (
                  <div className='font-bold text-[13px]'>₦{row.withdrawAmount}</div>
              )
        },
      sortable: true
    },
    {
      name: 'Status',
      selector: row => row?.status, 
      sortable: true
    },
    {
        name: 'Actions',
        button: true,
        cell: (row) => {
            const userWithdrawalRequest = withdrawalList?.find(wdrequest => wdrequest?._id === row?._id) || {}
            setWdData(userWithdrawalRequest)
            return (
                <button className='bg-[#18141E] text-gray-100 px-6 py-2 rounded-2xl hover:bg-btn hover:bg-secondary' onClick={(e) => handleButtonClick(e, row?._id)}>Pay</button>
            )
        }
      },
  ];

  const handleButtonClick = (e, withdrawalRequestId) => {
    e.preventDefault();

    navigate(`/admin/dashboard/withdrawals/confirm/${withdrawalRequestId}`, { state:{ withdrawalList } })
    
  }

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#18141E',
        color: '#f4f4f4',
        fontSize: '15px'
      }
    },
  }


  



  return (
        <div className='w-full mx-auto mt-[2rem]'>
        {/* {toggleModal && <WithdrawalModal wdData={wdData} handleButtonClick={handleButtonClick} toggleModal={toggleModal} setToggleModal={setToggleModal}/>} */}
        <DataTable 
        columns={columns} 
        data={withdrawalList}
        progressPending={isLoading}
        pagination
        selectableRows
        fixedHeader
        customStyles={customStyles}
        handleButtonClick={handleButtonClick}
        />
        </div>
  )
}

export default WithdrawalRequests