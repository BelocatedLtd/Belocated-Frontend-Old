import React, { useEffect, useState } from 'react'
import { LoaderIcon, toast } from 'react-hot-toast'
import { FaUser } from 'react-icons/fa'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import DeleteAdvertModal from '../../../components/adminComponents/DeleteAdvertModal'
import Loader from '../../../components/loader/Loader'
import { selectTasks } from '../../../redux/slices/taskSlice'
import { getSingleAdvertById } from '../../../services/advertService'

const AdvertSingle = () => {
  const { id } = useParams()
  const tasks = useSelector(selectTasks)
  const [isLoading, setIsLoading] = useState(false)
  const [ad, setAd] = useState()
  const [adverter, setAdverter] = useState()
  const [delBtn, setDelBtn] = useState(false)
  const [isFree, setIsFree] = useState(ad?.isFree)
  const [slides, setSlides] = useState([])
  const navigate = useNavigate()

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  useEffect(() => {
    async function getData() {
      const resp = await getSingleAdvertById(id)
      setAd(resp)
      setSlides(resp?.mediaURL)
      setAdverter(resp.userId)
    }
    getData()
  }, [id])

  const handleFreetaskCheck = async (e) => {
    e.preventDefault()
    setIsFree(!isFree)
    setIsLoading(true)
    const response = await setAdvertFree(ad?._id)
    setIsLoading(false)
    response ? toast.success('Advert type changed') : toast.error('Error switching advert type')
    navigate(-1)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    setDelBtn(!delBtn)
  }

  const renderMedia = (url) => {
    if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg')) {
      return <img src={url} alt='Image' className='rounded-lg' />
    } else if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg')) {
      return (
        <video width='320' height='240' controls className='rounded-lg'>
          <source src={url} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      )
    } else {
      return 'Unsupported media type'
    }
  }

  return (
    <div className='container mx-auto p-6'>
      {isLoading && <Loader />}
      {delBtn && <DeleteAdvertModal handleDelete={handleDelete} data={ad} />}

      <div className='flex items-center gap-3 mb-4'>
        <MdOutlineKeyboardArrowLeft size={30} onClick={() => navigate(-1)} />
        <div className='flex flex-col'>
          <p className='font-semibold text-xl text-gray-700'>Go back to Adverts</p>
          <small className='text-gray-500'>View details and perform actions on the advert</small>
        </div>
      </div>

      {/* Advertiser Card */}
      <div className='card bg-white shadow-lg p-6 mb-6 rounded-lg'>
        <h2 className='text-xl font-bold mb-4'>Advertiser</h2>
        <div className='flex gap-6 items-center'>
          <FaUser size={100} className='text-gray-800 border p-4 rounded-full' />
          <div>
            <h3 className='text-2xl'>{adverter?.fullname || adverter?.username}</h3>
            <small className='text-gray-500'>@{adverter?.username}</small>
            <button
              onClick={() => navigate(`/admin/dashboard/user/${adverter?._id}`)}
              className='mt-2 px-4 py-2 bg-secondary text-white rounded-lg'>
              View Advertiser
            </button>
          </div>
        </div>
      </div>

      {/* Advert Details Card */}
      <div className='card bg-white shadow-lg p-6 mb-6 rounded-lg'>
        <h2 className='text-xl font-bold mb-4'>Advert Details</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <div className='mb-3'>
              <label className='font-bold'>Platform:</label>
              <p>{ad?.platform}</p>
            </div>
            <div className='mb-3'>
              <label className='font-bold'>Service:</label>
              <p>{ad?.service}</p>
            </div>
            <div className='mb-3'>
              <label className='font-bold'>Tasks left:</label>
              <p>{ad?.tasks} tasks at ₦{ad?.earnPerTask}/task</p>
            </div>
          </div>

          <div>
            <div className='mb-3'>
              <label className='font-bold'>Ad Units Remaining:</label>
              <p>{ad?.desiredROI} units at ₦{ad?.costPerTask}/unit</p>
            </div>
            <div className='mb-3'>
              <label className='font-bold'>Total Amount:</label>
              <p>₦{ad?.adAmount}</p>
            </div>
            <div className='mb-3'>
              <label className='font-bold'>Ad Status:</label>
              <p className={`status-${ad?.status?.toLowerCase()}`}>{ad?.status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Media Card */}
      <div className='card bg-white shadow-lg p-6 mb-6 rounded-lg'>
        <h2 className='text-xl font-bold mb-4'>Media</h2>
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index}>{renderMedia(slide?.secure_url)}</div>
          ))}
        </Slider>
      </div>

      {/* Advert Controls Card */}
      <div className='card bg-white shadow-lg p-6 rounded-lg'>
        <h2 className='text-xl font-bold mb-4'>Controls</h2>
        <p>{isFree ? 'This advert is set to run as a free task' : 'This advert is set to run as a paid task'}</p>
        <button
          onClick={handleFreetaskCheck}
          className='mt-2 px-4 py-2 bg-gray-700 text-white rounded-lg'>
          {isLoading ? <LoaderIcon /> : 'Change'}
        </button>
        <button onClick={handleDelete} className='mt-2 px-4 py-2 bg-red-500 text-white rounded-lg'>
          Delete
        </button>
      </div>
    </div>
  )
}

export default AdvertSingle
