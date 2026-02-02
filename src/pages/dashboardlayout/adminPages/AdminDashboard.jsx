import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import Widgets from '../../../components/adminComponents/Widgets'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import {
	SET_LOGOUT,
	SET_USER,
	selectUser,
} from '../../../redux/slices/authSlice'
import { getAdminDashboardData } from '../../../services/adminService'
import { getUser } from '../../../services/authServices'
import Adverts from './Adverts'

const AdminDashboard = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	useRedirectLoggedOutUser('/')
	const [dashboardData, setDashboardData] = useState()

	useEffect(() => {
		async function getUserData() {
			const data = await getAdminDashboardData()
			setDashboardData(data)
			//console.log('🚀 ~ getUserData ~ data:', data)
			if (!user) {
				const data = await getUser()

				if (!data || data === undefined) {
					toast.error(
						'Unable to retrieve user data, session will be terminated',
					)
					await dispatch(SET_LOGOUT())
					navigate('/')
					return
				}

				await dispatch(SET_USER(data))
			}
		}
		getUserData()
	}, [])

	// useEffect(() => {
	// 	const adList = adverts?.filter((ad) => ad.status == 'Running')
	// 	setAdsList(adList)

	// 	const taskList = tasks?.filter((task) => task.status == 'Submitted')
	// 	setTasksList(taskList)
	// }, [adverts, tasks])

	return (
		<div className='w-full h-fit flex flex-col'>
			<div className='widgets flex flex-wrap md:p-[20px] mb-[3rem] gap-[20px]'>
				<Widgets type='users' totalUsers={dashboardData?.totalUsers || 0} />
				<Widgets
					type='adverts'
					totalAdverts={dashboardData?.totalAdverts || 0}
				/>
				<Widgets
					type='transactions'
					totalTrx={dashboardData?.totalTransactions || 0}
				/>
				<Widgets type='tasks' totalTasks={dashboardData?.totalTasks || 0} />
			</div>

			{/* <div className='charts flex w-full px-[20px] py-[5px] gap-[20px]'>
        <FeaturedChart />
        <ActivityFeed />
      </div> */}

			<div className='listContainer shadow-lg md:m-[20px]'>
				<div className='listTitle font-semibold text-gray-600 m-[15px]'>
					Latest Adverts
				</div>

				<Adverts />
			</div>
		</div>
	)
}

export default AdminDashboard
