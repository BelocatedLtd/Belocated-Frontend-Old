import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { selectUsers } from '../../../redux/slices/userSlice'
import { useState } from 'react'
import Loader from '../../../components/loader/Loader'
import { FaUser } from 'react-icons/fa'
import { selectAllAdverts } from '../../../redux/slices/advertSlice'
import { selectTasks } from '../../../redux/slices/taskSlice'
import { MdKeyboardDoubleArrowRight, MdOutlineCancel, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import { selectTransactions } from '../../../redux/slices/transactionSlice'
import DeleteModal from '../../../components/adminComponents/DeleteModal'
import { getSingleUserWallet, getUserWallet } from '../../../services/walletServices'
import { CheckmarkIcon } from 'react-hot-toast'

const UserSingle = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(selectUsers)
  const adverts = useSelector(selectAllAdverts)
  const tasksList = useSelector(selectTasks)
  const transactionsList = useSelector(selectTransactions)
  const [userAds, setUserAds] = useState()
  const [user, setUser] = useState()
  const [tasks, setTasks] = useState()
  const [trxs, setTrxs] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [delBtn, setDelBtn] = useState(false)
  const [userWallet, setUserWallet] = useState()

  const getWallet = async() => {
    const wallet = await  getSingleUserWallet(id)
    setUserWallet(wallet)
  }

  useEffect(() => {
   const userDetails = users?.find(user => user?._id === id) 
   const userAdList = adverts?.filter(ads => ads?.userId === id)
   const userTasks = tasksList?.filter(task => task?.taskPerformerId === id)
   const userTrx = transactionsList?.filter(trx => trx?.userId === id)
   getWallet()
   setUser(userDetails)
   setUserAds(userAdList )
   setTasks(userTasks)
   setTrxs(userTrx)
  }, [])

  const handleDelete = (e) => {
    e.preventDefault()
    setDelBtn(!delBtn)
  }
  

  return (
    <div className='w-full h-fit'>
      {delBtn && <DeleteModal handleDelete={handleDelete} user={user}/>}
      {isLoading && <Loader />}
      <div className='flex items-center gap-3 border-b border-gray-200 pb-6'>
          <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))}/>
          <div className='flex flex-col'>
              <p className='font-semibold text-xl text-gray-700'>Go back to Users</p>
              <small className='font-medium text-gray-500'>Here you can see the user details and perform all sorts of actions on it.</small>
          </div>
      </div>
      <div className='box flex flex-col border-b border-gray-100 p-3 pb-6 ml-5'>
        <div className='flex flex-col items-center gap-3 mt-3 md:flex-row'>
          <FaUser size={300} className='text-gray-800 border border-gray-100 p-[2rem] rounded-full'/>
          {/* User Details Hero Section */}
            <div className='flex flex-col text-center gap-1 md:text-left'>
              <h3 className='text-[3rem]'>{user?.fullname ? user?.fullname : user?.username}</h3>
              <small className='text-gray-600 mt-[-0.7rem] mb-[1rem] font-semibold'>@{user?.username}</small>

              <div className='flex items-center justify-center gap-2 text-center md:text-left md:justify-start'>
                <label htmlFor="">Wallet Balance:</label>
                <p>₦{userWallet?.value}</p>
              </div>
              
              <div onClick={() => navigate(`/admin/dashboard/adverts/user/${user._id}`)} className='flex items-center justify-center gap-2 cursor-pointer hover:text-secondary md:justify-start'>
                <label htmlFor="">Ads Created:</label>
                <p>{userAds?.length}</p>
                <MdOutlineKeyboardDoubleArrowRight size={12} className='text-secondary'/>
              </div>

              <div onClick={() => navigate(`/admin/dashboard/tasks/user/${user._id}`)} className='flex items-center justify-center gap-2 cursor-pointer hover:text-secondary md:justify-start'>
                <label htmlFor="">Tasks:</label>
                <p>{tasks?.length}</p>
                <MdOutlineKeyboardDoubleArrowRight size={12} className='text-secondary'/>
              </div>

              <div onClick={() => navigate(`/admin/dashboard/transactions/user/${user._id}`)} className='flex items-center justify-center gap-2 cursor-pointer hover:text-secondary md:justify-start'>
                <label htmlFor="">Transactions:</label>
                <p>{trxs?.length}</p>
                <MdOutlineKeyboardDoubleArrowRight size={12} className='text-secondary'/>
              </div>

              {/* No. of users referred */}
              <div onClick={() => navigate(`/admin/dashboard/transactions/user/${user._id}`)} className='flex items-center justify-center gap-2 cursor-pointer hover:text-secondary md:justify-start'>
                <label htmlFor="">Referred:</label>
                <p>{user?.referrals?.length}</p>
                <MdOutlineKeyboardDoubleArrowRight size={12} className='text-secondary'/>
              </div>
            </div>
        </div>

        {/* User Details & Bank Account */}
        <div className='container shadow-xl py-[3rem] px-[2rem] mt-[2rem]'>
        {/* User Details */}
        <div className='flex flex-col gap-[3rem] md:flex-row'>
          <div className='right__main flex flex-col   p-6 md:flex-row md:border-r border-gray-100'>
            <div className='box flex flex-col p-3 pb-6'>
              <label htmlFor="adverter" className='text-secondary text-[25px] font-bold'>User Details</label>

              <div className='user__details__container flex flex-col gap-1 md:gap-[4rem] md:flex-row'>
                <div className='left flex flex-col gap-1 md:gap-[4rem] mt-3'>
                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Email:</label>
                    <p>{user?.email}</p>
                  </div>

                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Phone:</label>
                    <p className=''>{user?.phone}</p>
                  </div>

                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Email Verification:</label>
                    <div className='flex gap-1 items-center'>
                      <p className={`${user?.isEmailVerified ? 'text-green-800' : 'text-red-700'}`}>{user?.isEmailVerified ? "Verified" : "Unverified"}</p>
                      {user?.isEmailVerified ? <CheckmarkIcon /> : <MdOutlineCancel className='text-tertiary'/>}
                    </div>
                  </div>

                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Phone Verification:</label>
                    <div className='flex gap-1 items-center'>
                      <p className={`${user?.isPhoneVerified ? 'text-green-800' : 'text-red-700'}`}>{user?.isPhoneVerified ? "Verified" : "Unverified"}</p>
                      {user?.isPhoneVerified ? <CheckmarkIcon /> : <MdOutlineCancel className='text-tertiary'/>}
                    </div>
                  </div>

                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>State:</label>
                    <p>{user?.location}</p>
                  </div>
                </div>

                <div className='right flex flex-col gap-1 md:gap-[4rem] mt-3'>
                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Gender:</label>
                    <div className='flex gap-1 items-baseline'>
                      <p>{user?.gender}</p>
                    </div>
                    
                  </div>

                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Religion:</label>
                    <p>{user?.religion}</p>
                  </div>

                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Account Type:</label>
                    <div className='flex gap-1 items-baseline'>
                      <p>{user?.accountType}</p>
                    </div>
                  </div>

                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Weekly Free Tasks:</label>
                      <p>{user?.freeTaskCount}</p>
                  </div>

                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>LGA:</label>
                    <p>{user?.community}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='left__main flex-col p-6 md:flex'>
          <label htmlFor="adverter" className='text-secondary text-[25px] font-bold'>Bank Details</label>
          <div className='left flex flex-col gap-1 md:gap-[2rem] mt-3'>
                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Bank Name:</label>
                    <p>{user?.bankName}</p>
                  </div>

                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Bank Account Holder:</label>
                    <p className=''>{user?.accountHolderName}</p>
                  </div>

                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Bank Account Number:</label>
                    <p className=''>{user?.bankAccountNumber}</p>
                  </div>
                </div>
          </div>
        </div>
        
        
        {/* Advert Controls */}
        <div className='mt-[1rem]'>
          <div className='flex gap-2'>
            <button onClick={handleDelete} className='py-2 px-5 bg-tertiary text-primary'>Delete User</button>
            <button className='py-2 px-5 bg-secondary text-primary'>Message Advertiser</button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default UserSingle