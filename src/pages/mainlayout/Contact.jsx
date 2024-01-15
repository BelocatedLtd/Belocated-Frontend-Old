import React from 'react'
import contactus from '../../assets/contactus.png'
import { FaFacebook, FaLinkedin, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { BiPhoneCall } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { AiFillInstagram } from 'react-icons/ai'

const Contact = () => {

  return (
    <div className='w-full h-fit'>
      <div className='container h-full flex flex-col items-center justify-center mx-auto mt-[5rem] md:mt-[3rem]   md:flex-row'>
        <div className='left w-full h-full flex flex-col'>
          <div className='w-[80%] h-fit mx-auto'>
          {/* Phone and Email */}
          <ul className='flex flex-wrap items-center gap-[2rem]'>
            <li className='flex items-center gap-2 bg-transparent hover:bg-gray-200 p-4'>
              <BiPhoneCall className='text-blue-50 text-[40px] bg-blue-600 p-2 rounded-full'/>
              <div>
                <p>+234 703 193 5276</p>
              </div>
            </li>
            <li className='flex items-center gap-2 bg-transparent hover:bg-gray-200 p-4'>
              <MdEmail className='text-red-50 text-[40px] bg-red-600 p-2 rounded-full'/>
              <div>
                <p>cs@belocated.ng</p>
              </div>
            </li>
          </ul>

          {/* Facebook and Instagram */}
          <ul className='flex flex-wrap items-center gap-[2rem]'>
            <li className='bg-transparent hover:bg-gray-200 p-4'>
              <Link to={'https://www.facebook.com/belocatedng'} target="_blank" rel="noopener noreferrer" className='flex items-center gap-2'>
                <BsFacebook className='text-blue-50 text-[40px] bg-blue-500 p-2 rounded-full'/>
                <div>
                  <p>Chat on facebook</p>
                </div>
              </Link>
            </li>
            <li className='bg-transparent hover:bg-gray-200 p-4'>
            <Link to={'https://instagram.com/belocatedng'} target="_blank" rel="noopener noreferrer" className='flex items-center gap-2'>
              <AiFillInstagram className='text-red-500 text-[40px] bg-gray-100 p-2 rounded-full'/>
              <div>
                <p>Chat on Instagram</p>
              </div>
              </Link>
            </li>
          </ul>

          {/* Twitter and LinkedIn */}
          <ul className='flex flex-wrap items-center gap-[2rem]'>
            <li className='bg-transparent hover:bg-gray-200 p-4'>
              <Link to={'https://twitter.com/belocatedng'} target="_blank" rel="noopener noreferrer" className='flex items-center gap-2'>
                <FaTwitter className='text-blue-50 text-[40px] bg-blue-500 p-2 rounded-full'/>
                <div>
                  <p>Connect on Twitter</p>
                </div>
              </Link>
            </li>
            <li className='bg-transparent hover:bg-gray-200 p-4'>
            <Link to={'https://linkedin.com/company/belocated'} target="_blank" rel="noopener noreferrer" className='flex items-center gap-2'>
              <FaLinkedin className='text-red-50 text-[40px] bg-secondary p-2 rounded-full'/>
              <div>
                <p>Connect on LinkedIn</p>
              </div>
              </Link>
            </li>
          </ul>

          {/* WhatsApp and telegram */}
          <ul className='flex flex-wrap items-center gap-[2rem]'>
            <li className='flex items-center gap-2 bg-transparent hover:bg-gray-200 p-4'>
              <Link to={'https://wa.me/2347031935276'} target="_blank" rel="noopener noreferrer" className='flex items-center gap-2'>
                <FaWhatsapp className='text-green-50 text-[40px] bg-green-500 p-2 rounded-full'/>
                <div>
                  <p>Chat on WhatsApp</p>
                </div>
              </Link>
            </li>
            <li className='flex items-center gap-2 bg-transparent hover:bg-gray-200 p-4'>
              <Link to={'https://t.me/belocated'} target="_blank" rel="noopener noreferrer" className='flex items-center gap-2'>
                <FaTelegram className='text-red-50 text-[40px] bg-secondary p-2 rounded-full'/>
                <div>
                  <p>Join Telegram Channel</p>
                </div>
              </Link>
            </li>
          </ul>
          </div>
        </div>

        <div className='right w-fit h-fit md:w-full md:h-full flex justify-center items-center'>
          <div className='w-full h-full md:w-[450px] md:h-[450px]'>
          <img src={contactus} alt="contact us" className='w-full h-full object-cover'/>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default Contact