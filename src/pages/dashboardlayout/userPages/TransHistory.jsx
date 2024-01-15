import React from 'react'
import { handleGetUserTransactions, selectIsError, selectIsLoading, selectTransactions } from '../../../redux/slices/transactionSlice'
import { useDispatch, useSelector } from 'react-redux'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { useEffect } from 'react'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import Loader from '../../../components/loader/Loader'
import { toast } from 'react-hot-toast'
import TransactionList from '../../../components/dashboard/TransactionList'
import { selectUser } from '../../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'

const TransHistory = () => {
  const transactions = useSelector(selectTransactions)
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const isLoading = useSelector(selectIsLoading)
  const isError = useSelector(selectIsError)
  const dispatch = useDispatch()
  useRedirectLoggedOutUser('/login')

  useEffect(() => {
    const getTransactions = async() => {
      await dispatch(handleGetUserTransactions(user?.token))
    }
    getTransactions()

    if (isError) {
      toast.error("Failed to retrieve adverts, please reload page")
      navigate(-1)
    }
  }, [dispatch])
  
  return (
    <div className='w-full h-fit'>
      {isLoading && <Loader />}
      <div className='flex items-center justify-between gap-3 border-b border-gray-200 pb-6'>
                <div className='flex items-center'>
                  <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))} className='mr-1'/>
                      <div className='flex flex-col'>
                          <p className='font-semibold text-xl text-gray-700'>My Transactions</p>
                          <small className='font-medium text-gray-500'>Click <span className='text-secondary'>here</span> to see and monitor your adverts</small>
                      </div>
                </div>
                  <small className='bg-secondary rounded-full p-4 text-primary'>{transactions.length}</small>
                  <button className='flex items-center gap-1 bg-secondary text-primary rounded-full px-5 py-2 mr-5 text-[12px] md:text-[15px]'><BsFillPlusCircleFill />Transactions</button>
      </div>

      
      <div>
        <TransactionList />
      </div>
    </div>
  )
}

export default TransHistory