import React, { useEffect, useState } from 'react'
import { BsDatabaseFillGear } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { GrMoney } from 'react-icons/gr'
import { HiUsers } from 'react-icons/hi'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SET_LOGOUT, SET_USER, selectUser } from '../../redux/slices/authSlice'
import { getUser } from '../../services/authServices'
import { getAllSubmiitedTask } from '../../services/taskServices'


const Widgets = ({ type, totalUsers, totalAdverts, totalTrx, totalTasks }) => {
	const [percentage, setPercentage] = useState(20)
	const user = useSelector(selectUser)
	const dispatch = useDispatch()
		const [task, setTask] = useState(null)

	
async function getTaskData() {
			const data = await getAllSubmiitedTask()

			if (!data || data === undefined) {
				toast.error('Unable to retrieve all tasks, session will be terminated')
				await dispatch(SET_LOGOUT())
				navigate('/')
				return
			}
                 setTask(data);
			
		}
		getTaskData()
	}, [])



	useEffect(() => {
		async function getUserData() {
			const data = await getUser()

			if (!data || data === undefined) {
				toast.error('Unable to retrieve user data, session will be terminated')
				await dispatch(SET_LOGOUT())
				navigate('/')
				return
			}

			await dispatch(SET_USER(data))
		}
		getUserData()
	}, [])

	let data

	switch (type) {
		case 'users':
			data = {
				title: 'USERS',
				count: totalUsers,
				link: 'See All Users',
				url: `/admin/dashboard/users/${user?.username}`,
				icon: (
					<FaUserAlt
						className='icon text-[30px] p-[5px] rounded-[5px] self-end'
						style={{ color: 'crimson', backgroundColor: 'rgba(255, 0, 0, 0.2' }}
					/>
				),
			}
			//setPercentage(totalUsers.length)
			break

		case 'adverts':
			data = {
				title: 'ADVERTS',
				count: totalAdverts,
				link: 'See All Adverts',
				url: `/admin/dashboard/adverts/${user?.username}`,
				icon: (
					<HiUsers
						className='icon text-[30px] p-[5px] rounded-[5px] self-end'
						style={{ color: 'green', backgroundColor: 'rgba(0, 128, 0, 0.2' }}
					/>
				),
			}
			//setPercentage(totalAdverts.length)
			break

		case 'transactions':
			data = {
				title: 'TRANSACTIONS',
				count: totalTrx,
				link: 'See All Transactions',
				url: `/admin/dashboard/transactions/${user?.username}`,
				icon: (
					<GrMoney
						className='icon text-[30px] p-[5px] rounded-[5px] self-end'
						style={{
							color: 'goldenrod',
							backgroundColor: 'rgba(218, 165, 32, 0.2',
						}}
					/>
				),
			}
			//setPercentage(totalTrx.length)
			break

		case 'tasks':
			data = {
				title: 'SUBMITTED TASKS',
				count: task,
				link: 'See All Tasks',
				url: `/admin/dashboard/tasks/${user?.username}`,
				icon: (
					<BsDatabaseFillGear
						className='icon text-[30px] p-[5px] rounded-[5px] self-end'
						style={{
							color: 'purple',
							backgroundColor: 'rgba(128, 0, 128, 0.2',
						}}
					/>
				),
			}
			//setPercentage(totalTasks.length)
			break
		default:
			break
	}

	return (
		<div className='widget flex flex-1 justify-between p-[10px] shadow-lg rounded-[10px] h-[150px]'>
			<div className='left flex flex-col justify-between'>
				<span className='title font-bold text[14px] text-gray-400'>
					{data?.title}
				</span>
				<span className='counter text-[28px] font-light'>{data?.count}</span>
				<span className='link text-[12px] border-b border-gray-200 w-fit hover:text-red-600'>
					<Link to={data?.url}>{data?.link}</Link>
				</span>
			</div>
			<div className='right flex flex-col justify-between'>
				<div
					className={`percentage flex items-center text-[14px] ${
						percentage > 20 && 'text-green-500'
					} ${percentage <= 20 && 'text-red-500'}`}>
					{percentage > 20 && <IoIosArrowUp />}
					{percentage <= 20 && <IoIosArrowDown />}
					{percentage}
				</div>
				{data?.icon}
			</div>
		</div>
	)
}

export default Widgets
