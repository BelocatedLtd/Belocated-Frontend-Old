import React, { useEffect, useState } from 'react'

import { CheckmarkIcon } from 'react-hot-toast'
import { FaUser } from 'react-icons/fa'
import {
	MdOutlineCancel,
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md'
import { useNavigate, useParams,useLocation } from 'react-router-dom'
import { toIntlCurrency } from '../../../../utils/currency'
import ManageUserModal from '../../../components/adminComponents/ManageUserModal'
import Loader from '../../../components/loader/Loader'
import { getSingleUserDetails } from '../../../services/walletServices'

const UserSingle = () => {
	const { id } = useParams()
	const navigate = useNavigate();
	const location = useLocation();
	const [isLoading, setIsLoading] = useState(false)
	const [manageUserBtn, setManageUserBtn] = useState(false)

	const [wallet, setWallet] = useState()

	const [userData, setUserData] = useState()
	const [userAds, setUserAds] = useState()
	const [tasks, setTasks] = useState()
	const [trxs, setTrxs] = useState()
	const page = location.state?.page || 1;   // Default to page 1 if no state found
const limit = location.state?.limit || 10;

	const getUserDetails = async () => {
		const details = await getSingleUserDetails(id)
		setUserData(details?.user)
		setWallet(details?.wallet)
		setUserAds(details?.userAdList)
		setTasks(details?.userTasks)
		setTrxs(details?.userTrx)
	}

	useEffect(() => {
		getUserDetails()
	}, [])

	const manageUser = (e) => {
		e.preventDefault()
		setManageUserBtn(!manageUserBtn)
	}

	return (
		<div className='w-full h-fit'>
			{manageUserBtn && (
				<ManageUserModal manageUser={manageUser} user={userData} />
			)}
			{isLoading && <Loader />}
			<div className='flex items-center gap-3 border-b border-gray-200 pb-6'>
				<MdOutlineKeyboardArrowLeft size={30} onClick={() => navigate(`/admin/dashboard/users`, { state: { page, limit } })} />
				<div className='flex flex-col'>
					<p className='font-semibold text-xl text-gray-700'>
						Go back to Users
					</p>
					<small className='font-medium text-gray-500'>
						Here you can see the user details and perform all sorts of actions
						on it.
					</small>
				</div>
			</div>
			<div className='box flex flex-col border-b border-gray-100 p-3 pb-6 md:ml-5'>
				<div className='flex flex-col items-center gap-3 mt-3 md:flex-row'>
					<FaUser
						size={300}
						className='text-gray-800 border border-gray-100 p-[2rem] rounded-full'
					/>
					{/* User Details Hero Section */}
					<div className='flex flex-col text-center gap-1 md:text-left'>
						<h3 className='text-[3rem]'>
							{userData?.fullname || userData?.username}
						</h3>
						<small className='text-gray-600 mt-[-0.7rem] mb-[1rem] font-semibold'>
							@{userData?.username}
						</small>

						<div className='flex items-center justify-center gap-2 text-center md:text-left md:justify-start'>
							<label htmlFor=''>Wallet Balance:</label>
							<p>{toIntlCurrency(wallet?.value)}</p>
						</div>

						<div
							onClick={() =>
								navigate(`/admin/dashboard/adverts/user/${userData._id}`)
							}
							className='flex items-center justify-center gap-2 cursor-pointer hover:text-secondary md:justify-start'>
							<label htmlFor=''>Ads Created:</label>
							<p>{userAds?.length}</p>
							<MdOutlineKeyboardDoubleArrowRight
								size={12}
								className='text-secondary'
							/>
						</div>

						<div
							onClick={() =>
								navigate(`/admin/dashboard/tasks/user/${userData._id}`)
							}
							className='flex items-center justify-center gap-2 cursor-pointer hover:text-secondary md:justify-start'>
							<label htmlFor=''>Tasks:</label>
							<p>{tasks?.length}</p>
							<MdOutlineKeyboardDoubleArrowRight
								size={12}
								className='text-secondary'
							/>
						</div>

						<div
							onClick={() =>
								navigate(`/admin/dashboard/transactions/user/${userData._id}`)
							}
							className='flex items-center justify-center gap-2 cursor-pointer hover:text-secondary md:justify-start'>
							<label htmlFor=''>Transactions:</label>
							<p>{trxs?.length}</p>
							<MdOutlineKeyboardDoubleArrowRight
								size={12}
								className='text-secondary'
							/>
						</div>

						{/* No. of users referred */}
						<div
							onClick={() =>
								navigate(`/admin/dashboard/transactions/user/${userData._id}`)
							}
							className='flex items-center justify-center gap-2 cursor-pointer hover:text-secondary md:justify-start'>
							<label htmlFor=''>Referred:</label>
							<p>{userData?.referrals?.length}</p>
							<MdOutlineKeyboardDoubleArrowRight
								size={12}
								className='text-secondary'
							/>
						</div>

						{/* User Account Status */}
						<div className='flex items-center justify-center gap-2 cursor-pointer hover:text-secondary md:justify-start'>
							<label htmlFor=''>Account Status:</label>
							<p
								className={`${
									userData?.accountStatus === 'Active'
										? 'text-green-600'
										: userData?.accountStatus === 'Suspended'
										? 'text-yellow-600'
										: userData?.accountStatus === 'Banned'
										? 'text-red-600'
										: ''
								}`}>
								{userData?.accountStatus}
							</p>
						</div>
					</div>
				</div>

				{/* User Details & Bank Account */}
				<div className='container shadow-xl py-[3rem] px-[2rem] mt-[2rem]'>
					{/* User Details */}
					<div className='flex flex-col gap-[3rem] md:flex-row'>
						<div className='right__main flex flex-col   p-6 md:flex-row md:border-r border-gray-100'>
							<div className='box flex flex-col p-3 pb-6'>
								<label
									htmlFor='adverter'
									className='text-secondary text-[25px] font-bold'>
									User Details
								</label>

								<div className='user__details__container flex flex-col gap-1 md:gap-[4rem] md:flex-row'>
									<div className='left flex flex-col gap-1 md:gap-[4rem] mt-3'>
										<div className='flex flex-col border-b border-gray-50 py-3'>
											<label htmlFor='' className='font-bold'>
												Email:
											</label>
											<p>{userData?.email}</p>
										</div>

										<div className='flex flex-col border-b border-gray-50 py-3'>
											<label htmlFor='' className='font-bold'>
												Phone:
											</label>
											<p className=''>{userData?.phone}</p>
										</div>

										<div className='flex flex-col border-b border-gray-50 py-3'>
											<label htmlFor='' className='font-bold'>
												Email Verification:
											</label>
											<div className='flex gap-1 items-center'>
												<p
													className={`${
														userData?.isEmailVerified
															? 'text-green-800'
															: 'text-red-700'
													}`}>
													{userData?.isEmailVerified
														? 'Verified'
														: 'Unverified'}
												</p>
												{userData?.isEmailVerified ? (
													<CheckmarkIcon />
												) : (
													<MdOutlineCancel className='text-tertiary' />
												)}
											</div>
										</div>

										<div className='flex flex-col border-b border-gray-50 py-3'>
											<label htmlFor='' className='font-bold'>
												Phone Verification:
											</label>
											<div className='flex gap-1 items-center'>
												<p
													className={`${
														userData?.isPhoneVerified
															? 'text-green-800'
															: 'text-red-700'
													}`}>
													{userData?.isPhoneVerified
														? 'Verified'
														: 'Unverified'}
												</p>
												{userData?.isPhoneVerified ? (
													<CheckmarkIcon />
												) : (
													<MdOutlineCancel className='text-tertiary' />
												)}
											</div>
										</div>

										<div className='flex flex-col border-b border-gray-50 py-3'>
											<label htmlFor='' className='font-bold'>
												State:
											</label>
											<p>{userData?.location}</p>
										</div>
									</div>

									<div className='right flex flex-col gap-1 md:gap-[4rem] mt-3'>
										<div className='flex flex-col border-b border-gray-50 py-3'>
											<label htmlFor='' className='font-bold'>
												Gender:
											</label>
											<div className='flex gap-1 items-baseline'>
												<p>{userData?.gender}</p>
											</div>
										</div>

										<div className='flex flex-col border-b border-gray-50 py-3'>
											<label htmlFor='' className='font-bold'>
												Religion:
											</label>
											<p>{userData?.religion}</p>
										</div>

										<div className='flex flex-col border-b border-gray-50 py-3'>
											<label htmlFor='' className='font-bold'>
												Account Type:
											</label>
											<div className='flex gap-1 items-baseline'>
												<p>{userData?.accountType}</p>
											</div>
										</div>

										<div className='flex flex-col border-b border-gray-50 py-3'>
											<label htmlFor='' className='font-bold'>
												Weekly Free Tasks:
											</label>
											<p>{userData?.freeTaskCount}</p>
										</div>

										<div className='flex flex-col border-b border-gray-50 py-3'>
											<label htmlFor='' className='font-bold'>
												LGA:
											</label>
											<p>{userData?.community}</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='left__main flex-col p-6 md:flex'>
							<label
								htmlFor='adverter'
								className='text-secondary text-[25px] font-bold'>
								Bank Details
							</label>
							<div className='left flex flex-col gap-1 md:gap-[2rem] mt-3'>
								<div className='flex flex-col border-b border-gray-50 py-3'>
									<label htmlFor='' className='font-bold'>
										Bank Name:
									</label>
									<p>{userData?.bankName}</p>
								</div>

								<div className='flex flex-col border-b border-gray-50 py-3'>
									<label htmlFor='' className='font-bold'>
										Bank Account Holder:
									</label>
									<p className=''>{userData?.accountHolderName}</p>
								</div>

								<div className='flex flex-col border-b border-gray-50 py-3'>
									<label htmlFor='' className='font-bold'>
										Bank Account Number:
									</label>
									<p className=''>{userData?.bankAccountNumber}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Advert Controls */}
					<div className='mt-[1rem]'>
						<div className='flex gap-2'>
							<button
								onClick={manageUser}
								className='py-2 px-5 bg-tertiary text-primary'>
								Manage User
							</button>
							<button className='py-2 px-5 bg-secondary text-primary'>
								Message Advertiser
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserSingle
