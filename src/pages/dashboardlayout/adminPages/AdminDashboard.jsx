import React from 'react'
import { FaUserCog, FaUsers } from 'react-icons/fa'
import Adverts from './Adverts'
import { handleGetALLUserAdverts, selectAdverts, selectAllAdverts } from '../../../redux/slices/advertSlice';
import { handleGetAllUser, selectUsers } from '../../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetUserTransactions, selectTransactions } from '../../../redux/slices/transactionSlice';
import { handleGetUserTasks, selectTasks } from '../../../redux/slices/taskSlice';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { SET_USER, SET_USERNAME, selectUser } from '../../../redux/slices/authSlice';
import { getUser } from '../../../services/authServices';
import { useEffect } from 'react';
import { useState } from 'react';
import Users from './Users';
import Tasks from './Tasks';
import Transactions from './Transactions';
import { LoaderIcon } from 'react-hot-toast';
import Widgets from '../../../components/adminComponents/Widgets';
import Chart from '../../../components/adminComponents/Chart';
import FeaturedChart from '../../../components/adminComponents/FeaturedChart';
import List from './List';
//import ListItems from './ListItems';
import ActivityFeed from '../../../components/ActivityFeed';



const AdminDashboard = () => {
    const dispatch = useDispatch()
    const adverts = useSelector(selectAllAdverts)
    //const isLoading = useSelector(selectIsLoading)
    const user = useSelector(selectUser)
    const users = useSelector(selectUsers)
    const transactions = useSelector(selectTransactions)
    const tasks = useSelector(selectTasks)
    const [tableSwitch, setTableSwitch] = useState('users')
    useRedirectLoggedOutUser('/')

    useEffect(() => {
        async function getUserData() {
            await dispatch(handleGetAllUser())
            await dispatch(handleGetALLUserAdverts())
            await dispatch(handleGetUserTransactions())
            await dispatch(handleGetUserTasks())
          if (!user.email) {
          const data = await getUser()
          await dispatch(SET_USER(data))
        await dispatch(SET_USERNAME(data.username))
          }
        }
      getUserData()
    }, [dispatch, user])

    

    

  return (
    <div className='w-full h-fit flex flex-col'>
      

      <div className='widgets flex flex-wrap p-[20px] gap-[20px]'>
        <Widgets type="users" totalUsers={users}/>
        <Widgets type="adverts" totalAdverts={adverts} />
        <Widgets type="transactions" totalTrx={transactions}/>
        <Widgets type="tasks" totalTasks={tasks}/>
      </div>

      {/* <div className='charts flex w-full px-[20px] py-[5px] gap-[20px]'>
        <FeaturedChart />
        <ActivityFeed />
      </div> */}

      <div className='listContainer shadow-lg m-[20px]'>
        <div className="listTitle font-semibold text-gray-600 m-[15px]">
          Latest Adverts
        </div>
        {/* <List /> */}

        <Adverts adverts={adverts}/>
      </div>
    </div>
  )
}

export default AdminDashboard