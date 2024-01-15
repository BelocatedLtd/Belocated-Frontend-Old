import React from 'react'
import errorPage from '../../assets/errorpage.png'
import { useDispatch, useSelector } from 'react-redux'
import { handleGetUserTasks } from '../../redux/slices/taskSlice'
import { handleGetUserTransactions } from '../../redux/slices/transactionSlice'
import { handleGetUserAdverts } from '../../redux/slices/advertSlice'
import { getUser } from '../../services/authServices'
import { SET_USER, SET_USERNAME, selectUser } from '../../redux/slices/authSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



const Error404Page = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const navigate = useNavigate()

    const getDetails = async() => {
        if (user?.email === "") {
            const data = await getUser()
            await dispatch(SET_USER(data))
            dispatch(SET_USERNAME(data.username))
        }
        await dispatch(handleGetUserTasks())
        await dispatch(handleGetUserTransactions())
        await dispatch(handleGetUserAdverts())
    }

    useEffect(() => {
        getDetails()
    }, [dispatch])
    

  return (
    <div className='w-full h-[70vh]'>
        <div className='container items-center justify-center mx-auto'>
            <div className='flex flex-col items-center justify-center border-gray-100'>
                <img src={errorPage} alt="errorpage img" className='border-b border-gray-300 w-[400px] h-[400px]'/>
                <p className='font-bold text-2xl text-gray-700 mt-[2rem]'>Oops!, seems you've hit a Snag.</p>
                <div className='flex items-center gap-2 mt-[1rem]'>
                    <button onClick={() => navigate(-1)} className='bg-tertiary text-primary w-[150px] py-4 px-8'>Go Back</button>
                    <button onClick={() => navigate('/')} className='bg-secondary text-primary w-[150px] py-4 px-8'>Home Page </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Error404Page