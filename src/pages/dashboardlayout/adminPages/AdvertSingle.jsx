import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { selectAllAdverts, handleGetALLUserAdverts } from '../../../redux/slices/advertSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { selectUsers } from '../../../redux/slices/userSlice';
import { FaUser } from 'react-icons/fa';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import placeholder from '../../../assets/placeholder.jpg'
import DeleteAdvertModal from '../../../components/adminComponents/DeleteAdvertModal';
import { BsCheck } from 'react-icons/bs';
import { SwipeableDrawer } from '@mui/material';

const AdvertSingle = () => {
    const {id} = useParams()
    const adverts = useSelector(selectAllAdverts)
    const users = useSelector(selectUsers)
    const dispatch = useDispatch()
    const [ad, setAd] = useState()
    const navigate = useNavigate()
    const [adverter, setAdverter] = useState()
    const [delBtn, setDelBtn] = useState(false)
    const [isFree, setIsFree] = useState(ad?.isFree)

    useEffect(() => {
      const advert = adverts?.find(advert => advert?._id === id)
      const advertiser = users?.find(user => user._id === advert.userId)
      setAd(advert)
      setAdverter(advertiser)
    }, [])

    const handleFreetaskCheck = async(e, id) => {
      e.preventDefault()

      const response = await dispatch(handleToggleFreeAdvert(id))
    }

    const handleDelete = (e) => {
      e.preventDefault()
      setDelBtn(!delBtn)
    }

  return (
    <div className='w-full h-fit'>
      {delBtn && <DeleteAdvertModal handleDelete={handleDelete} data={ad}/>}
      <div className='flex items-center gap-3 border-b border-gray-200 pb-6'>
          <MdOutlineKeyboardArrowLeft size={30} onClick={() => (navigate(-1))}/>
          <div className='flex flex-col'>
              <p className='font-semibold text-xl text-gray-700'>Go back to Adverts</p>
              <small className='font-medium text-gray-500'>Here you can see the advert details clearly and perform all sorts of actions on it.</small>
          </div>
      </div>

      <div className='container shadow-xl py-[2rem] px-[2rem] mt-[2rem]'>
        {/* Advertiser Details */}
        <div className='box flex flex-col border-b border-gray-100 p-3 pb-6'>
        <label htmlFor="adverter" className='text-secondary text-[25px] font-bold'>Avertiser</label>
        <div className='flex flex-col items-center gap-3 mt-3 md:flex-row'>
          <FaUser size={300} className='text-gray-800 border border-gray-100 p-[2rem] rounded-full'/>
          <div className='flex flex-col text-center gap-1 md:text-left'>
            <h3 className='text-[3rem]'>{adverter?.fullname}</h3>
            <small className='text-gray-700 mt-[-0.7rem] mb-[1rem] font-semibold'>@{adverter?.username}</small>
            <button onClick={() => navigate(`/admin/dashboard/user/${adverter?._id}`)} className='px-4 py-2 bg-secondary text-primary hover:bg-gray-900 mt-2'>View Advertiser</button>
          </div>
          
        </div>
        </div>

        {/* Advert Details */}
        <div className='flex flex-col  md:flex-row'>
            <div className='box flex flex-col border-b border-gray-100 p-3 pb-6'>
              <label htmlFor="adverter" className='text-secondary text-[25px] font-bold'>Advert Details</label>
              <div className='user__details__container flex flex-col gap-1 md:gap-[4rem] md:flex-row'>
                <div className='left flex flex-col gap-1 md:gap-[4rem] mt-3'>
                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Platform:</label>
                    <p>{ad?.platform}</p>
                  </div>

                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Service:</label>
                    <p>{ad?.service}</p>
                  </div>

                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Ad Tasks:</label>
                    <div className='flex gap-1 items-baseline'>
                      <p>{ad?.tasks}</p>
                      <small className='text-[9px] text-gray-700 font-bold'>₦{ad?.earnPerTask}/task</small>
                    </div>
                  </div>

                </div>

                <div className='right flex flex-col gap-1 md:gap-[4rem] mt-3'>
                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Ad Units:</label>
                    <div className='flex gap-1 items-baseline'>
                      <p>{ad?.desiredROI}</p>
                      <small className='text-[9px] text-gray-700 font-bold'>₦{ad?.costPerTask}/unit</small>
                    </div>
                    
                  </div>

                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Total Amount:</label>
                    <p>₦{ad?.adAmount}</p>
                  </div>

                  <div className='flex flex-col border-b border-gray-50 py-3'>
                    <label htmlFor="" className='font-bold'>Ad Status:</label>
                    <p className={`
                    ${ad?.status === "Pending" && 'pending'}
                    ${ad?.status === "Running" && 'running'}
                    ${ad?.status === "Allocating" && 'allocating'}
                    ${ad?.status === "Completed" && 'completed'}
                    ${ad?.status === "Rejected" && 'rejected'}
                    `}>
                      {ad?.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>


            <div className='w-full h-full mx-auto mt-6 md:w-[400px] md:h-[400px]'>
              <img src={ad?.mediaURL ? ad?.mediaURL : placeholder} alt="" className='w-full h-full object-cover'/>
            </div>
        </div>
        
        {/* Advert Controls */}
        <div className='mt-[1rem]'>
          <form className='mb-[1rem] flex items-center gap-1'>
            <input type="checkbox" name="isWeeklyFree" value={isFree} id="" onChange={handleFreetaskCheck} />
            <label htmlFor="">
              {isFree && (<p>This advert is set to run as a free task</p>)}
              {!isFree && (<p>This advert is set to run as a paid task</p>)}
              </label>
            <SwipeableDrawer size={30} className='text-green-600'/>
          </form>
          
          <div className='flex gap-2'>
            <button onClick={handleDelete} className='py-2 px-5 bg-tertiary text-primary'>Delete</button>
            <button className='py-2 px-5 bg-secondary text-primary'>Message Advertiser</button>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default AdvertSingle