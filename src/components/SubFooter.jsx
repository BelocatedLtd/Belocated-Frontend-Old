import React from 'react'
import { AiOutlineHolder } from 'react-icons/ai'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdOutlineEmail, MdLocationPin } from 'react-icons/md'
import { RxDoubleArrowRight } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import facebook from '../assets/facebook.svg'
import twitter from '../assets/twitter.svg'
import instagram from '../assets/instagram.svg'
import whatsapp from '../assets/whatsapp.svg'
import logo from '../assets/belocated-logo.png'
import { FaTelegram } from 'react-icons/fa'


const SubFooter = () => {
    const navigate = useNavigate()

  return (
    <section className='md:flex'>
        <div className='container flex flex-col mx-auto pt-[3rem] pb-[3rem] border-t border-gray-300 md:flex-row'>
            
            <div className='w-full p-6 text-gray-600 md:flex md:flex-col'>
                <div className='flex items-center gap-2 mb-3 w-[150px] md:w-[170px]'>
                    <img src={logo} alt="logo" className='w-full h-full object-cover'/>
                    <AiOutlineHolder className='rotate-90 text-2xl text-tertiary mt-1'/>
                </div> 
                <div className='text-lg' key="category.id">
                    <p className='flex items-center gap-1'>Belocated is an enterprising publicity and media service provider across industries</p>
                </div>
            </div>

            <div className='w-full p-6 text-gray-600'>
                <div className='flex items-center gap-2 mb-6'>
                    <h1 className='text-2xl text-secondary'>Important Links</h1>
                    <AiOutlineHolder className='rotate-90 text-2xl text-tertiary mt-1'/>
                </div> 
                        <ul className='text-lg flex flex-col gap-2'>
                            <li>How it Works</li>
                            <li>Legal</li>
                            <li>Terms of Service</li>
                            <li>Privacy Policy</li>
                        </ul>
            </div>


            <div className='w-full p-6 text-gray-600'>
                <div className='flex items-center gap-2 mb-6'>
                    <h1 className='text-2xl text-secondary'>Information</h1>
                    <AiOutlineHolder className='rotate-90 text-2xl text-tertiary mt-1'/>
                </div> 
                        <ul className='text-lg flex flex-col gap-2'>
                            <li>About Us</li>
                            <li>Services</li>
                            <li>Help & FAQs</li>
                            <li>Top Partners</li>
                        </ul>
            </div>

            <div className='w-full p-6 text-gray-600'>
                <div className='flex items-center gap-2 mb-6'>
                    <h1 className='text-2xl text-secondary'>Contact Details</h1>
                    <AiOutlineHolder className='rotate-90 text-2xl text-tertiary mt-1'/>
                </div> 
                        <ul className='text-lg flex flex-col gap-3'>
                            <li className='flex items-center gap-2'><BsFillTelephoneFill className='text-tertiary border border-tertiary rounded-full p-1 text-2xl'/> +234 703 193 5276</li>
                            <li className='flex items-center gap-2'><MdOutlineEmail  className='text-tertiary border border-tertiary rounded-full p-1 text-2xl'/>cs@belocated.ng</li>
                        </ul>

                        <div className="flex items-center gap-2 mt-[-2.5rem]  w-[150px] h-[150px]">
                            <Link to={'https://www.facebook.com/belocatedng'} target="_blank" rel="noopener noreferrer">
                                <img src={facebook} alt="facebook" className='w-full h-full hover:bg-red-100 rounded-full'/>
                            </Link>

                            <Link to={'https://twitter.com/belocatedng'} target="_blank" rel="noopener noreferrer">
                                <img src={twitter} alt="twitter" className='w-full h-full hover:bg-red-100 rounded-full'/>
                            </Link>

                            <Link to={'https://instagram.com/belocatedng'} target="_blank" rel="noopener noreferrer">
                                <img src={instagram} alt="instagram" className='w-full h-full hover:bg-red-100 rounded-full'/>
                            </Link>

                            <Link to={'https://www.whatsapp.com/channel/0029Va7JRtyEVccRNhgObL3E'} target="_blank" rel="noopener noreferrer">
                                <img src={whatsapp} alt="whatsapp" className='w-full h-full hover:bg-red-100 rounded-full'/> 
                            </Link>

                            <Link to={'https://t.me/belocated'} target="_blank" rel="noopener noreferrer">
                                <FaTelegram size={40} className='w-full h-full hover:bg-red-100 rounded-full text-secondary'/> 
                            </Link>
                        </div>
            </div>

        </div>
    </section>
  )
}

export default SubFooter