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
  const navigate = useNavigate()
  const tasks = useSelector(selectTasks)

  const [isLoading, setIsLoading] = useState(false)
  const [ad, setAd] = useState()
  const [adverter, setAdverter] = useState()
  const [delBtn, setDelBtn] = useState(false)
  const [isFree, setIsFree] = useState(ad?.isFree)
  const [slides, setSlides] = useState([])

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
      console.log(ad)
    }
    getData()
  }, [id])

  const handleFreetaskCheck = async (e) => {
    e.preventDefault()
    setIsFree(!isFree)
    setIsLoading(true)

    const response = await setAdvertFree(ad?._id)
    setIsLoading(false)

    if (response) {
      toast.success('Advert type changed')
      navigate(-1)
    } else {
      toast.error('Error switching advert type')
    }
  }

  const renderMedia = (url) => {
    if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg')) {
      return <img src={url} alt='Image' className='w-full h-auto rounded' />
    } else if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg')) {
      return (
        <video width='320' height='240' controls className='w-full'>
          <source src={url} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      )
    }
    return 'Unsupported media type'
  }

  const handleDelete = (e) => {
    e.preventDefault()
    setDelBtn(!delBtn)
  }

  return (
    <div className='w-full h-fit p-6'>
      {isLoading && <Loader />}
      {delBtn && <DeleteAdvertModal handleDelete={handleDelete} data={ad} />}

      {/* Header */}
      <div className='flex items-center gap-3 mb-6'>
        <MdOutlineKeyboardArrowLeft size={30} onClick={() => navigate(-1)} />
        <div>
          <h1 className='text-xl font-semibold'>Go back to Adverts</h1>
          <p className='text-sm text-gray-500'>
            Here you can see the advert details clearly and perform all sorts of actions.
          </p>
        </div>
      </div>

      {/* Card Container */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Advertiser Card */}
        <div className='bg-white shadow-lg rounded-lg p-6'>
          <h2 className='text-2xl font-bold text-center mb-4'>Advertiser</h2>
          <div className='flex flex-col items-center'>
            <FaUser size={100} className='text-gray-500 mb-4' />
            <h3 className='text-lg font-semibold'>
              {adverter?.fullname || adverter?.username}
            </h3>
            <p className='text-gray-600 mb-2'>@{adverter?.username}</p>
            <button
              onClick={() => navigate(`/admin/dashboard/user/${adverter?._id}`)}
              className='bg-blue-500 text-white px-4 py-2 rounded mt-2'>
              View Advertiser
            </button>
          </div>
        </div>

        {/* Advert Details Card */}
        <div className='bg-white shadow-lg rounded-lg p-6'>
          <h2 className='text-2xl font-bold mb-4'>Advert Details</h2>
          <div className='space-y-4'>
            <p><strong>Platform:</strong> {ad?.platform}</p>
            <p><strong>Service:</strong> {ad?.service}</p>
            <p>
              <strong>Tasks left: <small
											onClick={() =>
												navigate(
													`/admin/dashboard/advert/tasks/${adverter?._id}`,
												)
											}
											className='text-secondary text-[13px]'>
											View Tasks
										</small></strong> {ad?.tasks} ({ad?.earnPerTask} ₦/task)
              
            </p>
            <p><strong>Ad Units Submitted:</strong> {ad?.desiredROI}</p>
            <p><strong>Total Amount:</strong> ₦{ad?.adAmount}</p>
            <p>
									<label htmlFor='' className='font-bold'>
										Ad Status:
									</label>
									<p
										className={`
                    ${ad?.status === 'Pending' && 'pending'}
                    ${ad?.status === 'Running' && 'running'}
                    ${ad?.status === 'Allocating' && 'allocating'}
                    ${ad?.status === 'Completed' && 'completed'}
                    ${ad?.status === 'Rejected' && 'rejected'}
                    `}>
										{ad?.status}
									</p>
								</p>
            <p><strong>Target State:</strong> {ad?.state}</p>
            <p><strong>Target LGA:</strong> {ad?.lga}</p>
            <p><strong>Gender:</strong> {ad?.gender}</p>
            <a href={ad?.socialPageLink} target='_blank' rel='noopener noreferrer' className='text-blue-600'>
              {ad?.socialPageLink}
            </a>
          </div>
        </div>

        {/* Media Card */}
        <div className='bg-white shadow-lg rounded-lg p-6'>
          <h2 className='text-2xl font-bold mb-4'>Media</h2>
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index}>{renderMedia(slide?.secure_url)}</div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Controls */}
      <div className='flex gap-4 mt-6'>
        <button onClick={handleFreetaskCheck} className='bg-gray-700 text-white px-4 py-2 rounded'>
          {isFree ? 'Set as Paid Task' : 'Set as Free Task'}
          {isLoading && <LoaderIcon className='ml-2' />}
        </button>
        <button onClick={handleDelete} className='bg-red-500 text-white px-4 py-2 rounded'>
          Delete
        </button>
      </div>
    </div>
  )
}

export default AdvertSingle
